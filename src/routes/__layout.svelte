<script>
  import { checkHash } from '/src/flash'
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { clearFootnotes } from '/src/components/footnotes';
  import { resetSlides } from '/src/slide';

  beforeNavigate(()=> {
    resetSlides();
  });

  afterNavigate(() => {
    checkHash();
    clearFootnotes();
  });
</script>

<slot></slot>
<link type="text/css" href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet" />
<link type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" />