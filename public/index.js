window.onload = function () {
    document.getElementById('file').onchange = function () {
        var filename = this.value.replace(/.*[\/\\]/, '')
        document.getElementById('filename').textContent = filename
    };
}


