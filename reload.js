document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reloadBtn').addEventListener('click', function() {
        chrome.runtime.reload();
    });
});