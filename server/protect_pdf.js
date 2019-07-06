const convert = require('../server/convert')
const pdftk = require('../server/pdftk')

function protect(inputStream, options) {
    const convertProcess = convert()
    const pdftkProcess = pdftk()
    inputStream.pipe(convertProcess.stdin)
    convertProcess.stdout.pipe(pdftkProcess.stdin)
    return pdftkProcess.stdout
}

module.exports = protect