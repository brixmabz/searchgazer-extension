let calibSecondsTimer = 5;
let circleElementsCustomIDs = [];
let timer = 10;
let isDelaying = false;

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

  let lookMessageElem = document.createElement("div");
  lookMessageElem.className = "look-message";
  lookMessageElem.id = "look-message-cont";
  lookMessageElem.innerHTML = "Look Here";

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

  outer_div.appendChild(lookMessageElem);

  coordinates.forEach((data, index) => {
    let html = document.createElement("div");
    html.className = "circle-btn";
    html.id = "calib-btns";
    html.innerHTML = "5s";
    html.dataset.seconds = `${calibSecondsTimer}`;
    html.dataset.customId = `${data[0]} ${data[1]}`;
    html.style.left = `${data[0]}`;
    html.style.top = `${data[1]}`;
    html.style.opacity = `0`;

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
  isDelaying = false;
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
  el.css("opacity", "1");

  let lookElem = $("#look-message-cont")
  setLookMessagePosition(el)
  lookElem.show()

  let elSeconds = parseInt(el.attr("data-seconds"));

  if (elSeconds > 0) {
    el.attr("data-seconds", elSeconds - 1);
    el.html(`${elSeconds}s`);
    lookElem.html("Look Here")
    setTimeout(() => {
      requestAnimationFrame(autoCalibration)
    }, 1000)
  } else {
    circleElementsCustomIDs.shift();
    $(el).remove()
    let nextEl = $(`div[data-custom-id="${circleElementsCustomIDs[0]}"]`);
    nextEl.css("opacity", "1");
    isDelaying = true

    setLookMessagePosition(nextEl)
    lookElem.html("Look Here Next")
    if (!circleElementsCustomIDs.length) lookElem.remove()

    setTimeout(() => {
      requestAnimationFrame(autoCalibration)
    }, 3000)
  }
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
    
    if (!isDelaying) {
      webgazer.recordScreenPosition(xPos, yPos, "click");
    }
  }, 300)
}

function setLookMessagePosition(elem) {
  if (!circleElementsCustomIDs.length) return;

  const xPos = $(elem).offset().left + ($(elem).width() / 2);
  const yPos = $(elem).offset().top + ($(elem).height() / 2);

  let lookElem = $("#look-message-cont")

  if (!lookElem) return;

  if(circleElementsCustomIDs.length <= 3) {
    lookElem.removeClass("look-message")
    lookElem.addClass("look-message-top")
    lookElem.css("top", `${yPos - 60}px`)
    lookElem.css("left", `${xPos}px`)
  } else {
    lookElem.css("top", `${yPos + 35}px`)
    lookElem.css("left", `${xPos}px`)
  }
}
