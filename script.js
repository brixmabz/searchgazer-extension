window.saveDataAcrossSessions = true;
let pastSecond = 0;
let testArr = [];

createCircle();

webgazer
  .setGazeListener((data, timestamp) => {
    if (data === null) return;

    let currentElement = document.elementFromPoint(data.x, data.y);

    if (currentElement === null) return;

    // console.log(currentElement);

    if (pastSecond !== parseInt(timestamp / 500)) {
      pastSecond = parseInt(timestamp / 500);
      let xTotal = 0;
      let yTotal = 0;
      testArr.forEach((loopData, index) => {
        xTotal += loopData.x;
        yTotal += loopData.y;
      });
      xTotal /= testArr.length;
      yTotal /= testArr.length;
      testArr = [];

      moveCircle(xTotal, yTotal);
    } else {
      testArr.push({
        x: data.x,
        y: data.y,
      });
    }
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

function createCircle() {
  let circle = document.createElement("div");
  circle.id = "gazer-circle";
  circle.style.width = "30px";
  circle.style.height = "30px";
  circle.style.backgroundColor = "blue";
  circle.style.borderRadius = "50%";
  circle.style.position = "absolute";
  circle.style.top = `-10%`;
  circle.style.left = `-10%`;
  circle.style.transform = "translate(-50%, -50%)";
  circle.style.transition = "all .5s ease";
  document.body.appendChild(circle);
}

function moveCircle(x, y) {
  let xPos = parseInt((x / window.innerWidth) * 100);
  let yPos = parseInt((y / window.innerHeight) * 100);
  let circle = document.getElementById("gazer-circle");
  if (circle) {
    circle.style.top = `${yPos}%`;
    circle.style.left = `${xPos}%`;
  }
}

function removeCircle() {
  let circle = document.getElementById("gazer-circle");
  if (circle) {
    document.body.removeChild(circle);
  }
}
