import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import * as path from 'path';
import * as uuid from 'uuid';

async function run() {
  try {
    let version = core.getInput('version');
    let toolsPath = _getToolCacheDirectory();

    core.info(`Downloading Advanced Installer release ${version}`);

    let downloadFile = path.join(_getTempDirectory(), uuid.v4(), 'advinst.msi');
    await io.mkdirP(path.dirname(downloadFile));

    let url = `https://www.advancedinstaller.com/downloads/${version}/advinst.msi`;

    let downloadPath = await tc.downloadTool(url, downloadFile);
    core.debug(`Downloaded installer from ${url}`);

    let targetPath = `${toolsPath}\\advinst`;
    let logFile = `${_getTempDirectory()}\\advinst_install.log`;

    let args = [
      '/a',
      downloadPath,
      `TARGETDIR=${targetPath}`,
      '/qn',
      '/l*v',
      logFile
    ]

    core.debug(`Running installer using msiexec.exe`);
    let exitCode = await exec.exec('msiexec.exe', args);
    if (exitCode != 0) {
      throw new Error(`Failed to install Advanced Installer. Exit code ${exitCode}.`);
    }

    core.debug(`Configuring paths with Advanced Installer`);
    core.exportVariable('ADVANCEDINSTALLER_ROOT', targetPath);
    core.addPath(targetPath);

    core.info(`Successfully installed Advanced Installer ${version}`);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

 function _getToolCacheDirectory(): string {
  const cacheDirectory = process.env['RUNNER_TOOL_CACHE'] || '';
  return cacheDirectory;
}

function _getTempDirectory(): string {
  const tempDirectory = process.env['RUNNER_TEMP'] || '';
  return tempDirectory;
}

run();
