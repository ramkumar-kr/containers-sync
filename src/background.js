var backup = function () {
  browser.contextualIdentities.query({}).then((containers) => {
    var identities = containers.map((container) => {
      return { name: container.name, color: container.color, icon: container.icon, colorCode: container.colorCode }
    });
    browser.storage.sync.set({ identities: identities });
  });
}

var restore = function () {
  browser.storage.sync.get().then((data) => {
    data.identities.map((identity) => {
      browser.contextualIdentities.query({name: identity.name}).then((result) => {
        if(result.length === 0){
          browser.contextualIdentities.create(identity);
        }
      })
    });
  })
}

var handleInstall = function (details) {
  if(details.reason == "install"){
    restore();
    backup();
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
    default:
      break;
  }
  return data;
}

// Run when installed
browser.runtime.onInstalled.addListener(handleInstall);

// Run when contextualIdentities are changed
browser.contextualIdentities.onCreated.addListener(backup);
browser.contextualIdentities.onRemoved.addListener(backup);
browser.contextualIdentities.onUpdated.addListener(backup);

// Handle a message sent for backup or restore from popup
browser.runtime.onMessage.addListener(handleUserAction);
