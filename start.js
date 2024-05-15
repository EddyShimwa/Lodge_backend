const { execSync } = require('child_process');

execSync('npx prisma generate', { stdio: 'inherit' });

execSync('node ./dist/app.js', { stdio: 'inherit' });