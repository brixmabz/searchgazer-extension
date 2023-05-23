function overlay() {
  var overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <button id="scroller" class="click-icon">
      <svg
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"
        />
      </svg>
    </button>
    <button id="bookmark" class="click-icon bookmark">
      <svg
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
        />
      </svg>
    </button>
  `;

  $("body").append(overlay);
}

function scrollerFunc() {
  let scrollerCont = document.createElement("div");
  scrollerCont.className = "scroller-container";
  scrollerCont.innerHTML = `
    <svg
      fill="#727272"
      class="scroller-icon scroller-up"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
      />
    </svg>
    <svg
      fill="#727272"
      class="scroller-icon scroller-down"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
      />
    </svg>
  `;

  $("body").append(scrollerCont);
}
