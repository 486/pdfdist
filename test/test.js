const fs = require('fs');
const convert = require('../server/convert')
const pdftk = require('../server/pdftk')

test()

function test() {
    const stdin = fs.createReadStream('test/test.pdf')
    const file = fs.createWriteStream('test/output.pdf')
    const convertProcess = convert()
    const pdftkProcess = pdftk()
    stdin.pipe(convertProcess.stdin)
    convertProcess.stdout.pipe(pdftkProcess.stdin)
    pdftkProcess.stdout.pipe(file)
}