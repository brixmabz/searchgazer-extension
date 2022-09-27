window.saveDataAcrossSessions = true;

webgazer
  .setGazeListener((data, timestamp) => {
    if (data === null) return;

    let currentElement = document.elementFromPoint(data.x, data.y);

    if (currentElement === null) return;

    // console.log(currentElement);
  })
  .begin();

// chrome.storage.local.set({ key: value }, function () {
//   console.log("Value is set to " + value);
// });

// chrome.storage.local.get(["test_var", "webgazer_data"], function (result) {
//   console.log(JSON.parse(result.test_var));
// });

window.onbeforeunload = function () {
  webgazer.saveCurrentCalibrationData();
};
