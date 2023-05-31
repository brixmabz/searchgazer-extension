chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === "popup" && msg.subject == "calibrate") {
      showCalibration();
    } else if (msg.from === "popup" && msg.subject == "clearData") {
      webgazer.clearDataFromAllStorage();
    }
  });

function setClicksCount() {
  chrome.storage.local.get(['clicksData'], function (result) {
    let origin = window.location.origin;
    if(result.clicksData === undefined) {
      chrome.storage.local.set({ clicksData: {} })
    } else if (!result.clicksData[origin]) {
      chrome.storage.local.set({ clicksData: { ...result.clicksData, [origin]: 1} })
    } else {
      chrome.storage.local.set({ clicksData: { ...result.clicksData, [origin]: result.clicksData[origin] + 1 }})
    }
  })
}