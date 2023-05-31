window.addEventListener("DOMContentLoaded", () => {
  let origin = "";

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      origin = (new URL(tabs[0].url)).origin;
      chrome.storage.local.get(["clicksData"], function(result) {
        let value = result.clicksData[origin] === undefined ? "0" : result.clicksData[origin]
        document.querySelector('.page-data-container span').innerHTML = value + " clicks"
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
});

