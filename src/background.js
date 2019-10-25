var backup = function () {
  browser.contextualIdentities.query({}).then((containers) => {
    var identities = containers.map((container) => {
      return { name: container.name, color: container.color, icon: container.icon, colorCode: container.colorCode }
    });
    identities = filter(identities)
    browser.storage.sync.set({ identities: identities });
  });
}

var restore = function () {
  browser.storage.sync.get().then((data) => {
    if(data.identities){
      data.identities = filter(data.identities)
    }
    data.identities.map((identity) => {
      browser.contextualIdentities.query({name: identity.name}).then((result) => {
        if(result.length === 0){
          browser.contextualIdentities.create(identity);
        }
      })
    });
  })
}

var filter = function (identities) {
  var identityGroups = {}
  identities.map((identity) => {
    var nameMatch = identity.name.match(/^([a-zA-Z-_]+)\d$/)
    if(nameMatch){
      var stem = nameMatch[1]
      if(!(stem in identityGroups)){
        identityGroups[stem] = []
      }
      identityGroups[stem].push(identity.name)
    }
  })
  var filterList = Object.values(identityGroups).filter((group) => {
    return group.length > 1
  }).flat()
  var filtered = identities.filter((identity, idx, identities) => {
    return filterList.indexOf(identity.name) === -1
  })
  console.debug("Containers Sync Filter Report\n======\nIN: %o\nGROUPS:%o\nOUT: %o", identities, identityGroups, filtered)
  return filtered
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
