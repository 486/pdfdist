const { spawn } = require('child_process');


function ps() {
    const child = spawn('ps', ['-eo', 'pid,ppid,cmd,%mem,%cpu'], {
        detached: false
    });
    child.stderr.pipe(process.stderr)
    child.stdout.pipe(process.stdout)
}

module.exports = ps