const esbuild = require('esbuild');
const fs = require('fs');

esbuild.build({
    entryPoints: ['./src/app.ts'],
    bundle: true,
    outfile: './dist/out.js',
}).catch(err => {
    console.error(err);
    process.exit(1);
});

fs.copyFile('./src/index.html', './dist/index.html', () => console.log);

