
var backup = function () {
  browser.contextualIdentities.query({}).then((containers) => {
    var identities = containers.map((container) => {
      return { name: container.name, color: container.color, icon: container.icon }
    });
    browser.storage.sync.set({ identities: identities });
  });
}

var restore = function () {
  browser.storage.sync.get().then((data) => {
    data.identities.map((identity) => {
      browser.contextualIdentities.create(identity);
    });
  })
}

var reset = function () {
  browser.contextualIdentities.query({}).then((containers) => {
    containers.map((container) => {
      browser.contextualIdentities.remove(container.cookieStoreId)
    });
  });
}

var handleInstall = function (details) {
  if(details.reason == "install"){
    restore();
  }
}

var handleUserAction = function (data) {
  switch (data.type) {
    case "backup":
      backup();
      break;
    case "restore":
      restore();
      break;
    case "reset":
      reset();
      break;
    default:
      break;
  }
}

// Run when installed
browser.runtime.onInstalled.addListener(handleInstall);

// Run when contextualIdentities are changed
browser.contextualIdentities.onCreated.addListener(backup);
browser.contextualIdentities.onRemoved.addListener(backup);
browser.contextualIdentities.onUpdated.addListener(backup);

// Handle a message sent for backup or restore from popup
browser.runtime.onMessage.addListener(handleUserAction);
