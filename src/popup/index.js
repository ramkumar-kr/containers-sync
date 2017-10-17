var backup = function () {
  browser.runtime.sendMessage({ type: "backup" })
}

var restore = function () {
  browser.runtime.sendMessage({ type: "restore" })
}
var reset = function () {
  browser.runtime.sendMessage({ type: "reset" })
}


document.getElementById('backup').addEventListener("click", backup);
document.getElementById('restore').addEventListener("click", restore);
document.getElementById('reset').addEventListener("click", reset);
