chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if (msg.from === "tab" && msg.subject === "sendClicksData") {
    if (msg.data) {
      let el = document.getElementsByClassName('page-data-container')[0]
      el.innerHTML = `Session Click Count: ${msg.data}`
    }
  }
});

// Once the DOM is ready...
window.addEventListener("DOMContentLoaded", () => {
  console.log(new Date())
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "popup",
        subject: "getClicksData",
      });
    }
  );
  // ...query for the active tab...
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

