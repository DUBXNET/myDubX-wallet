'use strict';
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const builder = require('electron-builder');
const config = require('./config');

function shouldBuildOs(os) {
  const { ELECTRON_OS } = process.env;

  if (ELECTRON_OS === 'JENKINS_LINUX') {
    return os === 'linux' || os === 'windows';
  } else if (ELECTRON_OS === 'JENKINS_MAC') {
    return os === 'mac';
  } else {
    return !process.env.ELECTRON_OS || process.env.ELECTRON_OS === os;
  }
}

async function build() {
  console.log('Beginning Electron build process...');
  const jsBuildDir = path.join(config.path.output, 'electron-js');
  const electronBuildsDir = path.join(config.path.output, 'electron-builds');
  const compression = 'store';

  console.log('Clearing out old builds...');
  rimraf.sync(electronBuildsDir);

  // Builder requires package.json be in the app directory, so copy it in
  fs.copyFileSync(
    path.join(config.path.root, 'package.json'),
    path.join(jsBuildDir, 'package.json')
  );

  console.log('Building...');
  try {
    await builder.build({
      mac: shouldBuildOs('mac') ? ['zip', 'dmg'] : undefined,
      win: shouldBuildOs('windows') ? ['nsis'] : undefined,
      linux: shouldBuildOs('linux') ? ['AppImage'] : undefined,
      x64: true,
      ia32: true,
      config: {
        appId: 'com.github.dubxnet.wallet',
        productName: 'DubXNet',
        directories: {
          app: jsBuildDir,
          output: electronBuildsDir
        },
        mac: {
          category: 'public.app-category.finance',
          icon: path.join(config.path.electron, 'icons/icon.icns'),
          compression
        },
        win: {
          icon: path.join(config.path.electron, 'icons/icon.ico'),
          compression
        },
        linux: {
          category: 'Finance',
          icon: path.join(config.path.electron, 'icons/icon.png'),
          compression
        },
        // IMPORTANT: Prevents from auto publishing to GitHub in CI environments
        publish: null,
        // IMPORTANT: Prevents extending configs in node_modules
        extends: null
      }
    });

    console.info(`Electron builds are finished! Available at ${electronBuildsDir}`);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}

build();
