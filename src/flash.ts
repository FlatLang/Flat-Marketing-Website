export function loadFlash() {
  function checkHash() {
    const hash = window.location.hash?.substring(1);

    if (hash) {
      const element = document.getElementById(hash);

      element?.classList.remove("flash");
      element?.classList.add("flash");
      element?.scrollIntoView();
    }
  }

  checkHash();

  window.addEventListener("hashchange", checkHash, false);
}