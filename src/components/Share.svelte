<div
  class="share-modal"
  class:active={$active}
  use:clickOutside
  on:click_outside={() => active.set(false)}
>
  <table>
      <tr>
          <td colspan="4">
              <h1>SHARE THIS PAGE</h1>
          </td>
      </tr>
      <tr>
          <td colspan="4">
              <input class="url" type="text" value={url} readonly="readonly" bind:this={urlElement} />
          </td>
      </tr>
      <tr>
          <td>
            <a on:click={() => fbShare(url, '', '', 520, 350)}>
              <img src="/images/facebook.svg" />
            </a>
          </td>
          <td>
            <a on:click={() => twitterShare(url, '', '', 520, 350)}>
              <img src="/images/twitter.svg" />
            </a>
          </td>
          <td>
            <a on:click={() => linkedinShare(url, '', '', 520, 350)}>
              <img src="/images/linkedin.svg" />
            </a>
          </td>
          <td>
            <a href="mailto:?&subject=Flat programming language&body=Check%20out%20this%20page%20on%20the%20Flat%20programming%20language%20site%3A%20{url}">
              <img src="/images/email.svg" />
            </a>
          </td>
      </tr>
  </table>
</div>

<script>
    import { page } from '$app/stores';
    import { writable } from 'svelte/store';
    import { clickOutside } from '/src/clickOutside';

    export let active = writable(false);
    export let url;

    let urlElement;

    active.subscribe((value) => {
      if (value) {
        urlElement.select();
      }
    });

    page.subscribe((page) => {
      url = page.url.href;
    });

    const fbShare = (url, title, descr, winWidth, winHeight) => {
      const winTop = (screen.height / 2) - (winHeight / 2);
      const winLeft = (screen.width / 2) - (winWidth / 2);

      title = title || "";
      descr = descr || "";

      window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    };

    const twitterShare = (url, title, descr, winWidth, winHeight) => {
      const winTop = (screen.height / 2) - (winHeight / 2);
      const winLeft = (screen.width / 2) - (winWidth / 2);

      title = title || "";
      descr = descr || "";

      window.open('https://twitter.com/home?status=Check%20out%20this%20Flat%20post%20' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    };

    const linkedinShare = (url, title, descr, winWidth, winHeight) => {
      const winTop = (screen.height / 2) - (winHeight / 2);
      const winLeft = (screen.width / 2) - (winWidth / 2);

      title = title || "";
      descr = descr || "";

      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=Check%20out%20this%20Flat%20blog%20post&summary=&source=`, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    };
</script>