// Once the DOM is ready...
window.addEventListener("DOMContentLoaded", () => {
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

