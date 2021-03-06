var backup = function () {
  browser.storage.sync.get().then((data) => {
  browser.contextualIdentities.query({}).then((containers) => {
    var identities = containers.map((container) => {
      return { name: container.name, color: container.color, icon: container.icon, colorCode: container.colorCode }
    });
    if (data.regex == undefined) {
      data.regex = ".^" // Do not filter anything
    }
    identities = filter(identities,data.regex)
    browser.storage.sync.set({ identities: identities, regex: data.regex });
  });
  });
}

var restore = function () {
  browser.storage.sync.get().then((data) => {
    if(data.identities){
      if (data.regex == undefined) {
        data.regex = ".^" // Do not filter anything
      }
      data.identities = filter(data.identities, data.regex)
    }
    data.identities.map((identity) => {
      browser.contextualIdentities.query({name: identity.name}).then((result) => {
        if(result.length === 0){
          browser.contextualIdentities.create({name: identity.name, color: identity.color, icon: identity.icon});
        }
      })
    });
  })
}

var filter = function (identities, regex) {
  var identityGroups = {}
  identities.map((identity) => {
    var nameMatch = identity.name.match(new RegExp(regex))
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