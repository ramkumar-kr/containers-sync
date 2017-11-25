# Containers Sync

This is a webextension which would sync firefox containers across multiple devices.

[![Get-the-addon-button](https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_1.png)](https://addons.mozilla.org/en-US/firefox/addon/containers-sync/)

---

## Steps to build locally

* Install webpack (`npm install -g webpack`)
* Clone the repository (`git clone git@github.com:ramkumar-kr/containers-sync.git`)
* Run npm install in the containers-sync directory to install all dependencies (`npm install`)
* Run `webpack` to generate the `dist` directory

### Testing the extension
* Run `npm run watch` to start webpack to generate the dist directory
* Run `npm run firefox` to load the extension to firefox  with a temporary profile

### Building for production
* Run `npm run production`
* Upload the zip file in the web-ext-artiacts directory to the addon store

## FAQ

-  **What does this extension do?**

    It will synchronize the name, icon and colour of containers across devices

- **How frequently do you backup?**

  - As soon as you create/update/remove a container or multiple containers
  - Whenever the backup button is clicked in the popup


- **Can I backup/restore them manually?**

    Yes. You can use the popup to backup or restore manually

-  **I have set a preference to open a website in a particular container. Will that also be synced?**
    
    No. This data is not available to any extensions by the API.

- **Will this extension work with firefox for android?**

    No

- **Will this extension work in chrome/opera/edge etc.,?**

    No

- **I have some feedback...**

    You can create an issue in Github and we can discuss about it
