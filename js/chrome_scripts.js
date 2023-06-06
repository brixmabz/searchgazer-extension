chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === "popup" && msg.subject == "calibrate") {
      showCalibration();
    } else if (msg.from === "popup" && msg.subject == "clearData") {
      webgazer.clearDataFromAllStorage();
    } else if (msg.from === "popup" && msg.subject == "overlayEnabledData") {
      chrome.runtime.sendMessage({ data: overlayEnabled, from: "tab", subject: "overlayEnabledData"})
    } else if (msg.from === "popup" && msg.subject == "toggleOverlayEnabled") {
      overlayEnabled = !overlayEnabled;
    }
  });

// Gaze Error Counter
$(document).on("keyup", function(e) {
  if ((e.key === "NumpadAdd" || e.keyCode === 107) || (e.key === "Equal" || e.keyCode === 187)) {
    chrome.storage.local.get(['errorData'], function(result) {
      if (result.errorData === undefined) {
        chrome.storage.local.set({ errorData: 1 })
      } else {
        chrome.storage.local.set({ errorData: result.errorData + 1 })
      }
    })
  }
})

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