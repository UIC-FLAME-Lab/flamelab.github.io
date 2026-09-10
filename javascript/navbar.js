function toggleMenu() {
  const nav = document.getElementById("mynavbar");
  if (!nav) return;

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
  if (!nav || !nav.classList.contains("responsive")) return; // only in overlay mode

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

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("mynavbar");
  if (!nav) return;

  const right = nav.querySelector(".nav-right");
  if (!right) return;

  let firstOverflowLogged = false;

  function setMenuMode() {
    // Is the right-side links area overflowing?
    const isOverflowing = right.scrollWidth > right.clientWidth;

    // Toggle compact mode for pages that choose to style it
    nav.classList.toggle("compact", isOverflowing);

    // Log the width the first time it overflows
    if (isOverflowing && !firstOverflowLogged) {
      console.log("Navbar starts cutting off at ~", window.innerWidth, "px");
      firstOverflowLogged = true;
    }

    if (!isOverflowing) firstOverflowLogged = false;
  }

  window.addEventListener("load", setMenuMode);
  window.addEventListener("resize", () => {
    cancelAnimationFrame(setMenuMode._raf);
    setMenuMode._raf = requestAnimationFrame(setMenuMode);
  });

  setMenuMode();
});
