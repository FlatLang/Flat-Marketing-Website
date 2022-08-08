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

export function jump(id: string, changeUrl: boolean) {
  if (changeUrl !== false) {
      const url = location.href;

      location.href = "#" + id;
      history.replaceState(null, null, url);
  } else {
      const element = document.getElementById(id);

      element?.scrollIntoView(true);
  }

  return flash(id);
}

function flash(id: string) {
  const element = document.getElementById(id);

  if (element) {
      element.classList.remove("flash");

      element.timeoutId = setTimeout(function () {
          element.classList.add("flash");
      });
  }

  return element;
}

if (typeof document !== 'undefined') {
  document.addEventListener("click", ({target}) => {
    const href = target?.getAttribute("href");

    if (typeof href === 'string' && href[0] === '#') {
      checkHash();
    }
  });
}