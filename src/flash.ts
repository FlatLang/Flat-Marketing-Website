let lastFlashed;

export function checkHash() {
  const hash = window.location.hash?.substring(1);

  if (hash) {
    lastFlashed?.classList.remove("flash");

    const element = document.getElementById(hash);

    element?.classList.remove("flash");

    setTimeout(() => {
      element?.classList.add("flash");
      element?.scrollIntoView();
    }, 0);

    lastFlashed = element;
  }
}

if (typeof document !== 'undefined') {
  window.addEventListener("hashchange", checkHash, false);

  document.addEventListener("click", ({target}) => {
    let current = target as HTMLElement;
    let href: string;

    while (!href && current && current !== document) {
      href = current?.getAttribute("href");

      current = current.parentElement;
    }

    if (typeof href === 'string' && href[0] === '#') {
      const hash = window.location.hash;

      if (hash === href) {
        checkHash();
      }
    }
  });
}