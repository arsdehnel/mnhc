#!/usr/bin/env node

/**
 * Script to geocode trail addresses and generate SQL migration
 * Reads trails-data.json and outputs SQL UPDATE statements with coordinates
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple geocoding function using OpenStreetMap Nominatim (free, no API key required)
async function geocodeAddress(address) {
  try {
    const encodedAddress = encodeURIComponent(address);
    // const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodedAddress}&access_token=pk.eyJ1IjoiYXJzZGVobmVsIiwiYSI6ImNtOXFod2VpdTB1ZXQyam9na3ZzZ3hteHoifQ.x0f0jPFLKyevTXBB8GFJ7Q`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MN-Hiking-Club-Geocoder/1.0'
      }
    });
    
    if (!response.ok) {
      console.error(`HTTP error ${response.status} for address: ${address}`);
      return null;
    }
    
    const { features } = await response.json();
    
    if (features.length > 0) {
      if( features[ 0 ].geometry ) {
        return {
          latitude: parseFloat(features[ 0 ].geometry.coordinates[ 1 ]),
          longitude: parseFloat(features[ 0 ].geometry.coordinates[ 0 ])
        };
      }
    }
    
    console.warn(`No coordinates found for address: ${address}`);
    console.log( features[ 0 ] )
    process.exit();
    return null;
  } catch (error) {
    console.error(`Error geocoding address "${address}":`, error.message);
    return null;
  }
}

// Add delay to respect rate limits
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  try {
    // Read trails data
    const trailsDataPath = path.join(__dirname, '..', 'trails-data.json');
    const trailsData = JSON.parse(fs.readFileSync(trailsDataPath, 'utf8'));
    
    const trails = trailsData.data.Sheet1;
    const updates = [];
    
    console.log(`Processing ${trails.length} trails...`);
    
    for (let i = 0; i < trails.length; i++) {
      const trail = trails[i];
      const address = trail.data.Address;
      const name = trail.data['Location Name'];
      
      if (!address || !name) {
        console.warn(`Skipping trail with missing address or name:`, trail.data);
        continue;
      }
      
      console.log(`${i + 1}/${trails.length}: Geocoding ${name} - ${address}`);
      
      const coords = await geocodeAddress(address);
      
      if (coords) {
        updates.push({
          name,
          address,
          latitude: coords.latitude,
          longitude: coords.longitude
        });
        console.log(`  ✓ Found coordinates: ${coords.latitude}, ${coords.longitude}`);
      } else {
        console.log(`  ✗ No coordinates found`);
      }
      
      // Rate limiting - wait 1 second between requests
      if (i < trails.length - 1) {
        await delay(1000);
      }
    }
    
    // Generate SQL migration
    const migrationPath = path.join(__dirname, '..', 'migrations', '0006_update_trail_coordinates.sql');
    
    let sql = `-- Update trail coordinates from geocoded addresses\n`;
    sql += `-- Generated on ${new Date().toISOString()}\n\n`;
    
    for (const update of updates) {
      // Escape single quotes in address for SQL
      const escapedAddress = update.address.replace(/'/g, "''");
      
      sql += `UPDATE Trail SET \n`;
      sql += `  latitude = ${update.latitude}, \n`;
      sql += `  longitude = ${update.longitude} \n`;
      sql += `WHERE address = '${escapedAddress}';\n\n`;
    }
    
    // Write migration file
    fs.writeFileSync(migrationPath, sql);
    
    console.log(`\n✅ Migration generated: ${migrationPath}`);
    console.log(`Updated ${updates.length} out of ${trails.length} trails with coordinates`);
    
    // Summary
    console.log(`\nSummary:`);
    console.log(`- Total trails: ${trails.length}`);
    console.log(`- Successfully geocoded: ${updates.length}`);
    console.log(`- Failed geocoding: ${trails.length - updates.length}`);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();