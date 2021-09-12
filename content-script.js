function documentIsReady(fn) {
  if (document.readyState != "loading") {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState != "loading") fn();
    });
  }
}

documentIsReady(function () {
  // CONFIGS
  // todo make these options values
  var paywallId = "paywall-background-color";
  var mediumHomepages = ["https://medium.com/", "https://medium.com"];

  // read options
  loggingEnabled = readOptions("loggingEnabled");
  console.log("logging on", loggingEnabled);

  // todo make as option value
  setTimeout(runCheck, 1500);

  function runCheck() {
    var pageUrl = getUrl();
    if (!isMediumHomepage(pageUrl) && isPageBehindPaywall()) {
      log("Medium paywall detected");
      openInIncognito(pageUrl);
    }
  }

  function readOptions(key) {
    chrome.storage.sync.get(key, function (response) {
      console.log(`${key} value:`, response);
      return response.value;
    });
  }

  function getUrl() {
    return window.location.href;
  }

  function isMediumHomepage(pageUrl) {
    return mediumHomepages.includes(pageUrl);
  }

  function isPageBehindPaywall() {
    var paywall = document.getElementById(paywallId);

    var paywallDetected = paywall ? true : false;

    log(`paywall detected:  ${paywallDetected}`);
    return paywallDetected;
  }

  function openInIncognito(pageUrl) {
    log(`Opening article in incognito: ${pageUrl}`);
    chrome.runtime.sendMessage({
      msg: "open_in_incognito",
      url: pageUrl,
    });
  }

  function log(msg) {
    console.log("Medium // Bypass | ", msg);
  }
});
