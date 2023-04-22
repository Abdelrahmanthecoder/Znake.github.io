document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reloadBtn').addEventListener('click', function() {
        chrome.runtime.reload();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reloadBtn2').addEventListener('click', function() {
        chrome.runtime.reload();
    });
});
