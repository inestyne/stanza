const fs = require('fs');
const log = require('../helpers/log');
const logTask = require('../helpers/log-task');
const DESIGN_FILE = 'design.zip';
const { exec, rm } = require('../helpers/shelljs');

module.exports = function unzipDesign() {
  // check if DESIGN_FILE exists
  try {
    const hasZipFile = fs.statSync(DESIGN_FILE).isFile();
    if (!hasZipFile) {
      log(`Error: Cannot stat ${DESIGN_FILE} file.`);
      return false;
    }
  } catch (e) {
    log(`Error: Cannot find ${DESIGN_FILE} file.`);
    return false;
  }

  logTask('Regenerate .design/ folder');

  // create necessary folders
  rm('-rf', '.design/');
  exec(`unzip ${DESIGN_FILE} -d .design/`);

  return true;
};
