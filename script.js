import { webgazer } from "./searchgazer.js";
// var searchgazer = document.createElement("script");

// searchgazer.setAttribute(
//   "src",
//   "https://webgazer.cs.brown.edu/search/searchgazer.js"
// );
// searchgazer.setAttribute("type", "text/javascript");
// // searchgazer.onload = init_scripts();
// document.head.appendChild(searchgazer);

var jquery = document.createElement("script");

jquery.setAttribute("src", "https://code.jquery.com/jquery-3.6.0.min.js");
document.head.appendChild(jquery);

// setTimeout(() => {
//   webgazer
//     .setGazeListener(function (data, elapsedTime) {
//       if (data == null) {
//         return;
//       }
//       var xprediction = data.x; //these x coordinates are relative to the viewport
//       var yprediction = data.y; //these y coordinates are relative to the viewport
//       console.log(elapsedTime); //elapsed time is based on time since begin was called
//     })
//     .begin();
// }, 3000);

console.log(webgazer);

function init_scripts() {
  //   const html = `<script type="text/javascript">
  //     $(function() {
  //         console.log("IT IS READY")
  //     });
  //   </script>`;

  //   const scriptEl = document.createRange().createContextualFragment(html);
  var scriptEl = document.createElement("script");

  scriptEl.setAttribute("type", "text/javascript");
  scriptEl.setAttribute(
    "src",
    "https://webgazer.cs.brown.edu/search/searchgazer.js"
  );
  document.body.appendChild(scriptEl);
}

function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}

var myPrettyCode = function () {
  console.log(webgazer);
};

loadScript("https://webgazer.cs.brown.edu/search/searchgazer.js", myPrettyCode);
