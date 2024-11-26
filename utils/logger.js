const colors = require('colors');
const moment = require('moment');

/**
 * @param {String} content
 * @param {String} type
 */

const logger = (content, type = 'debug') => {
    const timestamp = `[${moment().format('DD-MM-YYYY HH:mm:ss')}]:`
    switch (type) {
        case 'info': return console.log(`${timestamp} ${content}`);
        case 'warn': return console.log(`${colors.yellow(timestamp)} ${colors.yellow(content)}`);
        case 'error': return console.log(`${colors.red(timestamp)} ${colors.red(content)}`);
        case 'debug': return console.log(`${colors.blue(timestamp)} ${colors.blue(content)}`);
        case 'success': return console.log(`${colors.green(timestamp)} ${colors.green(content)}`);

        default: throw new TypeError('O tipo de Logger deve ser warn, debug, log ou error.');
    }
};

module.exports = { logger };