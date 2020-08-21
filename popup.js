'use strict';

function localizeHtmlPage() {
  //Localize by replacing __MSG_***__ meta tags
  var objects = document.getElementsByTagName('html');
  for (var j = 0; j < objects.length; j++) {
    var obj = objects[j];

    var valStrH = obj.innerHTML.toString();
    var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1) {
      return v1 ? chrome.i18n.getMessage(v1) : "";
    });

    if(valNewH != valStrH) {
      obj.innerHTML = valNewH;
    }
  }
}

localizeHtmlPage();

// initiate clipboard.js
var clipboard = new ClipboardJS('span');

// open link in new tab
document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll("a:not([href^='#'])");
  for (var i = 0; i < links.length; i++) {
      (function () {
          var ln = links[i];
          var location = ln.href;
          ln.onclick = function () {
              chrome.tabs.create({active: true, url: location});
          };
      })();
  }
});

function getVersionNumber() {
  var manifestData = chrome.runtime.getManifest();

  document.getElementById("version_number").innerHTML = manifestData.version;
}

getVersionNumber();