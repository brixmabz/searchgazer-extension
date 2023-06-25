let calibSecondsTimer = 5
let circleElementsCustomIDs = []
let timer = 10;

function calibrationInstructions() {
  let ins = document.createElement("div");
  let message = `
    <div>
      Please look or gaze on circles which are colored green <span></span> for ${calibSecondsTimer} seconds starting from TOP-LEFT and will go from left to right, line by line.
    </div>
    <div class='timer'>
      Calibration will start in ${timer} seconds
    </div>`
  ins.className = "calib-instructions"
  ins.innerHTML = message;

  document.body.appendChild(ins)

  let intervalContainer = setInterval(() => {
    if (!timer) {
      clearInterval(intervalContainer);
      $(".calib-instructions").remove()
      timer = 10;
    }

    timer -= 1;

    $("div.timer").html(`Calibration will start in ${timer} seconds`)
  }, 1000)
}

function showCalibration() {
  calibrationInstructions()
  let outer_div = document.createElement("div");
  outer_div.className = "outer-container";
  clickEnabled = false;
  removeCircle();

  let coordinates = [
    ["5%", "5%"],
    ["50%", "5%"],
    ["95%", "5%"],
    ["5%", "50%"],
    ["50%", "50%"],
    ["95%", "50%"],
    ["5%", "95%"],
    ["50%", "95%"],
    ["95%", "95%"],
  ];

  coordinates.forEach((data, index) => {
    let html = document.createElement("div");
    html.className = "circle-btn";
    html.id = "calib-btns";
    html.innerHTML = "5s";
    html.dataset.seconds = `${calibSecondsTimer}`;
    html.dataset.customId = `${data[0]} ${data[1]}`;
    html.style.left = `${data[0]}`;
    html.style.top = `${data[1]}`;

    circleElementsCustomIDs.push(`${data[0]} ${data[1]}`)

    outer_div.appendChild(html.cloneNode(true));

    if (index === coordinates.length - 1) {
      document.body.appendChild(outer_div);
      setTimeout(() => {
        autoCalibration()
        recordData()
      }, (timer + 1) * 1000)
    }
  });
}

function autoCalibration() {
  if (!circleElementsCustomIDs.length) {
    webgazer.pause();
    webgazer.saveCurrentCalibrationData();
    setTimeout(function(){
      $(".outer-container").remove();
      createCircle();
      delayClick();
    }, 2000);
    return
  };

  let el = $(`div[data-custom-id="${circleElementsCustomIDs[0]}"]`);
  el.css("background-color", "#48e148");

  let elSeconds = parseInt(el.attr("data-seconds"));

  if (elSeconds > 0) {
    el.attr("data-seconds", elSeconds - 1);
    el.html(`${elSeconds - 1}s`);
  } else {
    circleElementsCustomIDs.shift();
    $(el).remove()
    $(`div[data-custom-id="${circleElementsCustomIDs[0]}"]`).css("background-color", "#48e148");
  }

  setTimeout(() => {
    requestAnimationFrame(autoCalibration)
  }, 1000)
}

function recordData() {
  let recordDataInterval = setInterval(() => {
    if (!circleElementsCustomIDs.length) {
      clearInterval(recordDataInterval)
      return
    }

    let elem = $(`div[data-custom-id="${circleElementsCustomIDs[0]}"]`)
    const xPos = $(elem).offset().left + ($(elem).width() / 2);
    const yPos = $(elem).offset().top + ($(elem).height() / 2);

    webgazer.recordScreenPosition(xPos, yPos, "click");
  }, 300)
}
