const { spawn } = require('child_process');
const crypto = require("crypto");

function pdftk(options) {
    
    const pw = crypto.randomBytes(20).toString('hex');
    const child = spawn('pdftk', ['-', 'update_info', 'server/default_metadata.txt', 'output', '-', 'owner_pw', pw, 'allow', 'printing'], {
        detached: false
    });
    child.stderr.pipe(process.stderr)
    return child
}

module.exports = pdftk
