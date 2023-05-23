window.saveDataAcrossSessions = true;
let pastSecond = 0;
let pointsData = [];
let gazeCounter = 0;
let bookmarkGazeCounter = 0;
let scrollerEnabled = false;
let bookmarkEnabled = false;
const xClick = [];
const yClick = [];
let xAverage = 0;
let yAverage = 0;
let scale = 1;
let xRelative = [];
let yRelative = [];
let totalSessionClicks = 0;


createCircle();

webgazer
  .setGazeListener((data, timestamp) => {
    if (data === null) return;

    data = trackerViewportLimiter(data)

    if (pastSecond !== parseInt(timestamp / 750)) {
      pastSecond = parseInt(timestamp / 750);
      let xTotal = 0;
      let yTotal = 0;
      pointsData.forEach((loopData, index) => {
        xTotal += loopData.x;
        yTotal += loopData.y;
      });
      xTotal /= pointsData.length;
      yTotal /= pointsData.length;
      pointsData = [];
      if ((xTotal >= window.innerWidth * 0.85) && withOverlaySites()) {
        $(".overlay").css("right", "0");
      } else {
        $(".overlay").css("right", "-15%");
      }

      if (xTotal && yTotal) {
        let currentElement = document.elementFromPoint(xTotal, yTotal);
        xTotal = moveXRelative(xTotal);
        yTotal = moveYRelative(yTotal);
        moveCircle(xTotal, yTotal);
        gazeClick(xTotal, yTotal);

        if (currentElement) {
          scrollerFunction(currentElement);
          bookmarkFunction(currentElement);
        }

        if (scrollerEnabled) {
          if (yTotal >= window.innerHeight * 0.85) {
            window.scrollBy(0, 50);
          } else if (yTotal <= window.innerHeight * 0.15) {
            window.scrollBy(0, -50);
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
  .setRegression("weightedRidge")
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
  let circleShadow = document.createElement("div");
  circle.id = "gazer-circle";
  circleShadow.id = "gazer-circle-shadow";
  circleShadow.classList.add("gazer-circle-shadow")
  document.body.appendChild(circle);
  document.body.appendChild(circleShadow);
}

function moveCircle(x, y) {
  let xPos = parseInt(x);
  let yPos = parseInt(y);
  let circle = document.getElementById("gazer-circle");
  let circleShadow = document.getElementById("gazer-circle-shadow");
  if (circle) {
    circle.style.top = `${yPos}px`;
    circle.style.left = `${xPos}px`;
  }

  if (circleShadow) {
    circleShadow.style.top = `${yPos}px`;
    circleShadow.style.left = `${xPos}px`;
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
    gazeCounter += 1;
    if (gazeCounter === 3) {
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
    gazeCounter = 0;
    if (!scrollerEnabled) {
      $("button#scroller").css("background-color", "transparent");
    } else {
      $("button#scroller").css("background-color", "green");
    }
  }
}

function bookmarkFunction(currentElement) {
  if (currentElement.id == "bookmark") {
    if (!bookmarkEnabled) {
      $("button#bookmark").css("background-color", "green");
    } else {
      $("button#bookmark").css("background-color", "red");
    }
    bookmarkGazeCounter += 1;
    if (bookmarkGazeCounter === 3) {
      bookmarkEnabled = !bookmarkEnabled;
      if (bookmarkEnabled) {
        $("button#bookmark").css("background-color", "green");
        bookmarkFunc()
      } else {
        $("button#bookmark").css("background-color", "transparent");
        document.body.removeChild(document.querySelector(".outer-container-2"))
        $(".bookmark-item").off()
      }
    }
  } else {
    bookmarkGazeCounter = 0;
    if (!bookmarkEnabled) {
      $("button#bookmark").css("background-color", "transparent");
    } else {
      $("button#bookmark").css("background-color", "green");
    }
  }
}

function enableScroll() {
  scrollerEnabled = !scrollerEnabled;
  if(scrollerEnabled) {
    $("button#scroller").css("background-color", "green");
    scrollerFunc(scrollerEnabled);
  } else {
    $("button#scroller").css("background-color", "transparent");
    $(".scroller-container").remove();
  }
}

async function gazeClick(x, y) {
  if(!(document.URL.indexOf("tictactoe.com.trigl-demo.com") >= 0) &&
  !(document.URL.indexOf("eye-tracking-food-menu.com.trigl-demo.com") >= 0) &&
  !(document.URL.indexOf("eye-tracking-look-to-speak-web.com.trigl-demo.com") >= 0)
  ) {
    return;
  }
  if (scrollerEnabled) {
    return;
  }
  if (xClick.length===4){
    xClick.shift();
  }
  xClick.push(x);

  if (yClick.length===4){
    yClick.shift();
  }
  yClick.push(y);

  if (xClick.length !== 4 || yClick.length !== 4){
    return;
  }

  let xSum = xClick.reduce((a, b) => a + b, 0);
  xAverage = (xSum / xClick.length) || 0;
  let ySum = yClick.reduce((a, b) => a + b, 0);
  yAverage = (ySum / yClick.length) || 0;

  let xMinRange = xAverage - 75;
  let xMaxRange = xAverage + 75;

  let yMinRange = yAverage - 75;
  let yMaxRange = yAverage + 75;

  if((x >= xMinRange && x <= xMaxRange) && (y >= yMinRange && y <= yMaxRange)){
    // scale = scale + 1;
    // zoom(scale, x, y);

    // if(scale >= 3) {
    webgazer.pause();
    if(!(( x < 0 || x > window.innerWidth ) || ( y < 0 || y > window.innerHeight ))) {
      totalSessionClicks += 1;
      await document.elementFromPoint(x, y).click();
    }
    document.getElementById("gazer-circle-shadow").classList.add("gazer-circle-click")
    setTimeout(() => {
      document.getElementById("gazer-circle-shadow").classList.remove("gazer-circle-click")
    }, 500)
    xClick.splice(0, xClick.length);
    yClick.splice(0, yClick.length);
    webgazer.resume();

  }
  else {
    // scale = 1;
    // zoom(1, 0, 0);
  }
}

function moveXRelative (x) {
  if(xRelative.length == 2) {
    xRelative.shift();
  }
  let xRelativeMin = xRelative[0] - 200;
  let xRelativeMax = xRelative[0] + 200;
  if (x <= xRelativeMin) { x=xRelativeMin }
  if (x >= xRelativeMax) { x=xRelativeMax }
  xRelative.push(x);
  return x;
}

function moveYRelative (y) {
  if(yRelative.length == 2) {
    yRelative.shift();
  }
  let yRelativeMin = yRelative[0] - 200;
  let yRelativeMax = yRelative[0] + 200;
  if (y <= yRelativeMin) { y=yRelativeMin }
  if (y >= yRelativeMax) { y=yRelativeMax }
  yRelative.push(y);
  return y;
}

async function createClickCircle(x, y) {
  allClickCircles = document.getElementsByClassName("click-circle");
  if(allClickCircles.length) {
    await document.body.removeChild(allClickCircles[0])
  }

  let clickCircle = document.createElement("div");
  clickCircle.className = "click-circle";
  let xPos = parseInt(x);
  let yPos = parseInt(y);
  clickCircle.style.top = `${yPos}px`;
  clickCircle.style.left = `${xPos}px`;
  await document.body.appendChild(clickCircle);
}

function zoom(scale, x, y) {
  var body = document.body
  var transformOrigin = x + "px " + y + "px";
  body.style.transformOrigin = transformOrigin;
  body.style.transform = "scale(" + scale + ")";
}

function trackerViewportLimiter(prediction){
  if(prediction.x < 20)
      prediction.x = 20;
  if(prediction.y < 20)
      prediction.y = 20;
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  if(prediction.x > w - 20){
      prediction.x = w - 20;
  }

  if(prediction.y > h - 20)
  {
      prediction.y = h - 20;
  }
  return prediction;
};

function withOverlaySites() {
  if (document.URL.indexOf("tictactoe.com.trigl-demo.com") >= 0 ||
      document.URL.indexOf("eye-tracking-look-to-speak-web.com.trigl-demo.com") >= 0
  ) {
    return false;
  }
  return true;
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === "popup" && msg.subject == "calibrate") {
    showCalibration();
  } else if (msg.from === "popup" && msg.subject == "clearData") {
    webgazer.clearDataFromAllStorage();
  } else if (msg.from === "popup" && msg.subject == "getClicksData") {
    chrome.runtime.sendMessage({
      data: `${totalSessionClicks} clicks`,
      from: "tab",
      subject: "sendClicksData"
    }, function (res) {
      return true;
    })
  }
});

overlay();
//let scroller = document.getElementById("scroller");
//console.log(scroller);
//scroller.addEventListener("click", enableScroll);
