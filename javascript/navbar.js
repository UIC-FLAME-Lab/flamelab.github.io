function toggleMenu() {
  const nav = document.getElementById("mynavbar");
  const willOpen = !nav.classList.contains("responsive");

  nav.classList.toggle("responsive", willOpen);
  document.body.classList.toggle("menu-open", willOpen);

  // When closing, collapse any open dropdowns
  if (!willOpen) {
    nav.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
  }
}

// Accordion behavior for mobile dropdowns
document.addEventListener("click", function (e) {
  const nav = document.getElementById("mynavbar");
  if (!nav.classList.contains("responsive")) return; // only in overlay mode

  const btn = e.target.closest(".dropbtn");
  if (btn && nav.contains(btn)) {
    e.preventDefault();
    const dd = btn.closest(".dropdown");
    nav.querySelectorAll(".dropdown.open").forEach(d => {
      if (d !== dd) d.classList.remove("open");
    });
    dd.classList.toggle("open");
  }
});


(function () {
  const nav = document.getElementById('mynavbar');
  const right = nav.querySelector('.nav-right');

  let lastMode = null;
  let firstOverflowLogged = false;

  function setMenuMode() {
    // Is the right-side links area overflowing?
    const isOverflowing = right.scrollWidth > right.clientWidth;

    // toggle compact mode (shows hamburger, hides links)
    nav.classList.toggle('compact', isOverflowing);

    // log the width the first time it overflows
    if (isOverflowing && !firstOverflowLogged) {
      console.log('Navbar starts cutting off at ~', window.innerWidth, 'px');
      firstOverflowLogged = true;
    }

    // (optional) clear the log flag if it stops overflowing
    if (!isOverflowing) firstOverflowLogged = false;

    lastMode = isOverflowing;
  }

  // run on load and on resize (throttled)
  window.addEventListener('load', setMenuMode);
  window.addEventListener('resize', () => {
    // simple throttle via rAF
    if (lastMode === null) return setMenuMode();
    cancelAnimationFrame(setMenuMode._raf);
    setMenuMode._raf = requestAnimationFrame(setMenuMode);
  });
})();
