const { spawn } = require('child_process');

function convert(options) {
    
    const child = spawn('convert', ['-density', '300', '-quality', '80', '-compress', 'jpeg', '-', '-'], {
        detached: false
    });
    child.stderr.pipe(process.stderr)
    return child
}

module.exports = convert
