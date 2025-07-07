import styles from './styles/global.css?url';

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>MN Hiking Club</title>
      <meta name="description" content="Track your hiking adventures across Minnesota's beautiful trails" />
      <meta name="theme-color" content="#4a7c59" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/png" href="/images/favicon.png" />
      <link rel="apple-touch-icon" href="/images/icon-192.png" />
      <link rel="modulepreload" href="/src/client.tsx" />
      <link rel="stylesheet" href={styles} />
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
