chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if (msg.from === "tab" && msg.subject === "overlayEnabledData") {
    document.getElementById("overlay-enabler-btn").innerText = `Overlay: ${msg.data ? "ON" : "OFF"}`;
    document.getElementById("overlay-enabler-btn").className = msg.data ? "overlay-enabled" : "overlay-disabled";
  } else if (msg.from === "tab" && msg.subject === "setSpeedValue") {
    document.getElementById("speed-select").value = msg.data;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  let origin = "";

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {from: "popup", subject: "overlayEnabledData"});
      chrome.tabs.sendMessage(tabs[0].id, {from: "popup", subject: "setSpeedValue"});
      origin = (new URL(tabs[0].url)).origin;
      chrome.storage.local.get(["clicksData", "errorData"], function(result) {
        let clicksVal = result.clicksData[origin] === undefined ? "0" : result.clicksData[origin]
        let errorsVal = result.errorData[origin] === undefined ? "0" : result.errorData[origin]
        document.querySelector('.page-data-container span').innerHTML = clicksVal + " clicks"
        document.querySelector('.error-container span').innerHTML = errorsVal + " errors"
      })
    }
  );

  document
    .getElementById("reset-clicks")
    .addEventListener("click", function () {
      chrome.storage.local.get(["clicksData"], function(result) {
        chrome.storage.local.set({ clicksData: { ...result.clicksData, [origin]: 0 }})
        document.querySelector('.page-data-container span').innerHTML = "0 clicks"
      })
    });

  document
    .getElementById("reset-count")
    .addEventListener("click", function () {
      chrome.storage.local.set({ errorData: 0 })
      document.querySelector('.error-container span').innerHTML = "0 errors"
    });

  document
    .getElementById("calibrate-btn")
    .addEventListener("click", function () {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            from: "popup",
            subject: "calibrate",
          });
        }
      );
    });

  document
    .getElementById("clear-btn")
    .addEventListener("click", function () {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            from: "popup",
            subject: "clearData",
          });
        }
      );
    });

  document
    .getElementById("overlay-enabler-btn")
    .addEventListener("click", function () {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            from: "popup",
            subject: "toggleOverlayEnabled",
          });
          let className = document.getElementById("overlay-enabler-btn").className

          if (className === "overlay-enabled") {
            document.getElementById("overlay-enabler-btn").className = "overlay-disabled";
            document.getElementById("overlay-enabler-btn").innerText = "Overlay: OFF";
          } else {
            document.getElementById("overlay-enabler-btn").className = "overlay-enabled";
            document.getElementById("overlay-enabler-btn").innerText = "Overlay: ON";
          }
        }
      );
    });

  document
    .getElementById("speed-select")
    .addEventListener("change", function () {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            from: "popup",
            subject: "speedUpdate",
            data: this.value
          });
        }
      );
    });
});

