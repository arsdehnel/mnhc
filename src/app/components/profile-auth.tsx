import dayjs from 'dayjs';
import { link } from '@/app/shared/links';
import { User } from "@/db";

export default function ProfileAuth( { user }: { user: User } ) { 
    return (
        <p>
            <div>Hey { JSON.stringify( user ) }</div>
            <div>Member Since { dayjs( user.createdAt ).format( "MMMM YYYY" ) }</div>
            <section className="trail-view-section">
                <h4>Username</h4>
                <p>{ user.username }</p>
            </section>
            <div className="logout-link"><a href={ link("/logout") }>Log Out</a></div>
        </p>
    )
}