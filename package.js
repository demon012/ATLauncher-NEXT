require('babel-polyfill');

const fs = require('fs');
const rimraf = require('rimraf');
const archiver = require('archiver');
const packager = require('electron-packager');

const pkg = require('./package.json');

console.log('start pack...');

const archs = ['ia32', 'x64'];
const platforms = ['linux', 'win32', 'darwin'];

platforms.forEach(plat => {
    archs.forEach(arch => {
        pack(plat, arch, log(plat, arch));
    });
});

function pack(plat, arch, cb) {
    // there is no darwin ia32 electron
    if (plat === 'darwin' && arch === 'ia32') return;

    const options = {
        platform: plat,
        arch,
        prune: true,
        'app-version': pkg.version,
        'app-copyright': pkg.productCopyright,
        version: pkg.electronVersion,
        out: `./dist/`,
        dir: './app/',
        name: pkg.productName,
        asar: true,
        ignore: [
            '^/node_modules/.*',
            '^/icon\..*'
        ],
        icon: 'app/icon' + (() => {
            switch (plat) {
                case 'linux':
                    return '.png';
                case 'win32':
                    return '.ico';
                case 'darwin':
                    return '.icns';
            }
        })()
    };

    let osOptions = {};

    switch (plat) {
        case 'linux':
            break;
        case 'win32':
            osOptions['version-string'] = {
                CompanyName: 'ATLauncher',
                FileDescription: pkg.productName,
                ProductName: pkg.productName,
                InternalName: pkg.productName
            };
            break;
        case 'darwin':
            osOptions['app-bundle-id'] = 'com.atlauncher.next';
            osOptions['app-category-type'] = 'public.app-category.games';
            break;
    }

    if (!fs.existsSync('./dist')) {
        fs.mkdirSync('./dist');
    }

    packager(Object.assign({}, options, osOptions), (err) => {
        if (err) {
            return cb(err);
        }

        const outputZip = `./dist/${pkg.productName}-${pkg.version}-${plat}-${arch}.zip`;

        if (fs.existsSync(outputZip)) {
            fs.unlinkSync(outputZip);
        }

        let output = fs.createWriteStream(outputZip);

        output.on('open', () => {
            let archive = archiver('zip');
            const dirToZip = `./dist/${pkg.productName}-${plat}-${arch}`;

            output.on('close', () => {
                rimraf(dirToZip, cb);
            });

            archive.on('error', (err) => {
                rimraf(dirToZip, () => cb(err));
            });

            archive.pipe(output);
            archive.bulk([
                {
                    expand: true,
                    cwd: dirToZip,
                    src: ['**'],
                    dest: './'
                }
            ]);
            archive.finalize();
        });
    });
}

function log(plat, arch) {
    return (err) => {
        if (err) {
            return console.error(err);
        }

        console.log(`${plat}-${arch} finished!`);
    };
}