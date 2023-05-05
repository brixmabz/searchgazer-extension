window.saveDataAcrossSessions = true;
let pastSecond = 0;
let pointsData = [];
let scrollGazeCounter = 0;
let clickGazeCounter = 0;
let scrollerEnabled = false;
let clickerEnabled = false;
let elementToBeClicked = null
let elementLookedAtTimes = 0

createCircle();

webgazer
  .setGazeListener((data, timestamp) => {
    if (data === null) return;

    // console.log(currentElement);

    if (pastSecond !== parseInt(timestamp / 500)) {
      pastSecond = parseInt(timestamp / 500);
      let xTotal = 0;
      let yTotal = 0;
      pointsData.forEach((loopData, index) => {
        xTotal += loopData.x;
        yTotal += loopData.y;
      });
      xTotal /= pointsData.length;
      yTotal /= pointsData.length;
      pointsData = [];

      moveCircle(xTotal, yTotal);

      if (xTotal >= window.innerWidth * 0.85) {
        $(".overlay").css("right", "0");
      } else {
        $(".overlay").css("right", "-15%");
      }

      if (xTotal && yTotal) {
        let currentElement = document.elementFromPoint(xTotal, yTotal);

        if (currentElement) {
          scrollerFunction(currentElement);
          clickerFunction(currentElement);
        }

        if (scrollerEnabled) {
          if (yTotal >= window.innerHeight * 0.85) {
            window.scrollBy(0, 50);
          } else if (yTotal <= window.innerHeight * 0.15) {
            window.scrollBy(0, -50);
          }
        }

        if (clickerEnabled && false) {
          if (currentElement && elementToBeClicked !== currentElement) {
            elementToBeClicked = currentElement
          } else if (currentElement === elementToBeClicked) {
            elementLookedAtTimes += 1
          }

          if (elementLookedAtTimes === 6) {
            elementToBeClicked.click()
            clickerEnabled = !clickerEnabled;
            console.log("I CLICKED")
          }
        }
      }

      // if (currentElement === null) return;

      // console.log(currentElement.closest("a"));
    } else {
      pointsData.push({
        x: data.x,
        y: data.y,
      });
    }
  })
  .showPredictionPoints(false)
  .begin();

// chrome.storage.local.set({ key: value }, function () {
//   console.log("Value is set to " + value);
// });

// chrome.storage.local.get(["test_var", "webgazer_data"], function (result) {
//   console.log(JSON.parse(result.test_var));
// });

window.onbeforeunload = function () {
  // webgazer.saveCurrentCalibrationData();
};

window.onload = function () {
  // webgazer.clearDataFromAllStorage();
}

function createCircle() {
  let circle = document.createElement("div");
  circle.id = "gazer-circle";
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

function scrollerFunction(currentElement) {
  if (currentElement.id == "scroller") {
    if (!scrollerEnabled) {
      $("button#scroller").css("background-color", "green");
    } else {
      $("button#scroller").css("background-color", "red");
    }
    scrollGazeCounter += 1;
    if (scrollGazeCounter === 3) {
      scrollerEnabled = !scrollerEnabled;
      if (scrollerEnabled) {
        $("button#scroller").css("background-color", "green");
        scrollerFunc(scrollerEnabled);
      } else {
        $("button#scroller").css("background-color", "transparent");
        $(".scroller-container").remove();
      }
    }
  } else {
    scrollGazeCounter = 0;
    if (!scrollerEnabled) {
      $("button#scroller").css("background-color", "transparent");
    } else {
      $("button#scroller").css("background-color", "green");
    }
  }
}

function clickerFunction(currentElement) {
  if (currentElement.id == "clicker") {
    if (!clickerEnabled) {
      $("button#clicker").css("background-color", "green");
    } else {
      $("button#clicker").css("background-color", "red");
    }
    clickGazeCounter += 1;
    if (clickGazeCounter === 3) {
      clickerEnabled = !clickerEnabled;
      if (clickerEnabled) {
        $("button#clicker").css("background-color", "green");
      } else {
        $("button#clicker").css("background-color", "transparent");
      }
    }
  } else {
    clickGazeCounter = 0;
    if (!clickerEnabled) {
      $("button#clicker").css("background-color", "transparent");
    } else {
      $("button#clicker").css("background-color", "green");
    }
  }
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === "popup" && msg.subject == "calibrate") {
    showCalibration();
  }
});

overlay();

$(function () {
  console.log($('a[href$="http"]'));
});
