window.onload = function () {
  window.saveDataAcrossSessions = true;

  webgazer
    .setRegression("ridge") /* currently must set regression and tracker */
    .setTracker("clmtrackr")
    .setGazeListener(function (data, clock) {
      if (data != null) console.log(findDomElementGoogle(data.x, data.y));

      //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
      //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
    })
    .begin()
    .showPredictionPoints(
      true
    ); /* shows a square every 100 milliseconds where current prediction is */

  var width = 320;
  var height = 240;
  var topDist = "0px";
  var leftDist = "0px";

  var setup = function () {
    var video = document.getElementById("webgazerVideoFeed");
    // video.style.display = "hidden";
    video.style.position = "absolute";
    video.style.top = topDist;
    video.style.left = leftDist;
    video.width = width;
    video.height = height;
    video.style.margin = "0px";

    webgazer.params.imgWidth = width;
    webgazer.params.imgHeight = height;
  };

  function checkIfReady() {
    if (webgazer.isReady()) {
      setup();
    } else {
      setTimeout(checkIfReady, 100);
    }
  }
  setTimeout(checkIfReady, 100);

  window.onbeforeunload = function () {
    webgazer.end();
  };
};
