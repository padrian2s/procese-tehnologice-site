const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

// Create index.html with redirect to Romanian version
const indexHtml = `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/ro">
  <link rel="canonical" href="/ro">
  <title>TechFlow Solutions - Redirecting...</title>
  <meta name="robots" content="noindex">
</head>
<body>
  <p>Redirecting to <a href="/ro">Romanian version</a>...</p>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
console.log('Created index.html with redirect to /ro');
