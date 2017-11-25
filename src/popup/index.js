var backup = function () {
  browser.runtime.sendMessage({ type: "backup" })
}

var restore = function () {
  browser.runtime.sendMessage({ type: "restore" })
}


document.getElementById('backup').addEventListener("click", backup);
document.getElementById('restore').addEventListener("click", restore);
