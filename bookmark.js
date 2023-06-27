function bookmarkFunc() {
  let bookmark = document.createElement("div")
  bookmark.classList.add("outer-container-2")

  bookmark.innerHTML = `
  <div class="bookmark-container">
    <span class="bookmark-title">Bookmarks</span>
    <div class="bookmark-list">
      <div class="bookmark-item webgazer-clickable" data-url="https://eye-tracking-youtube.com.trigl-demo.com/">
        <h1>YouTube</h1>https://eye-tracking-youtube.com.trigl-demo.com/
      </div>
      <div class="bookmark-item webgazer-clickable" data-url="https://tictactoe.com.trigl-demo.com/">
        <h1>Tic Tac Toe</h1>https://tictactoe.com.trigl-demo.com/
      </div>
      <div class="bookmark-item webgazer-clickable" data-url="https://eye-tracking-look-to-speak-web.com.trigl-demo.com/">
        <h1>Look To Speak</h1>https://eye-tracking-look-to-speak-web.com.trigl-demo.com/
      </div>
      <div class="bookmark-item webgazer-clickable" data-url="https://eye-tracking-food-menu.com.trigl-demo.com/">
        <h1>Food Menu</h1>https://eye-tracking-food-menu.com.trigl-demo.com/
      </div>
    </div>
  </div>
  `

  document.body.appendChild(bookmark);

  $(".bookmark-item").on("click", function(el) {
    window.location.href = $(this).attr("data-url");
  })
}
