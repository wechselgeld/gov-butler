const consola = require('consola');

const {
	glob,
} = require('glob');
const {
	promisify,
} = require('util');
const promisifiedGlob = promisify(glob);

/**
 *
 * @param {string} directoryName
 */
async function loadFiles(directoryName) {
	const files = await promisifiedGlob(`${process.cwd().replace(/\\/g, '/')}/${directoryName}/*.js`);
	files.forEach((file) => delete require.cache[require.resolve(file)]);
	files.forEach((file) => consola.info(`Loaded ${file.split('/')[file.split('/').length - 1]} out of ${file.split('/')[file.split('/').length - 2]}`));
	return files;
}

module.exports = {
	loadFiles,
};
