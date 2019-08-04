window.onload = function () {
    domI18n({
        languages: ['en', 'de']
    });
    document.getElementById('file').onchange = function () {
        var filename = this.value.replace(/.*[\/\\]/, '')
        document.getElementById('filename').textContent = filename
    };
}


