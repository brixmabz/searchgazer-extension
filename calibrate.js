let click_required = 20;

function showCalibration() {
  alert("Please click all the red circles until they turn green.");
  let outer_div = document.createElement("div");
  outer_div.className = "outer-container";

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
    html.dataset.value = "0";
    html.style.left = `${data[0]}`;
    html.style.top = `${data[1]}`;

    outer_div.appendChild(html.cloneNode(true));

    if (index === coordinates.length - 1) {
      document.body.appendChild(outer_div);
      $(document).on("click", "#calib-btns", function () {
        // Do something with `$(this)`.
        let clicks = $(this).data("value");
        $(this).data("value", clicks + 1);
        if (clicks === click_required) {
          $(this).css("background-color", "#48e148");
        }

        isCalibrationDone();
      });
    }
  });
}

function updateButton(el) {}

function isCalibrationDone() {
  let done = true;

  $(".circle-btn").each(function (i, obj) {
    if ($(this).data("value") < click_required) {
      done = false;
    }
  });

  if (done) {
    $(".outer-container").remove();
  }
}
