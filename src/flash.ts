export function checkHash() {
  const hash = window.location.hash?.substring(1);

  if (hash) {
    const element = document.getElementById(hash);

    element?.classList.remove("flash");

    setTimeout(() => {
      element?.classList.add("flash");
      element?.scrollIntoView();
    }, 0);
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener("click", ({target}) => {
    const href = target?.getAttribute("href");

    if (typeof href === 'string' && href[0] === '#') {
      checkHash();
    }
  });
}