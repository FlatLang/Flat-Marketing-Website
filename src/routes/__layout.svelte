<script>
  import { checkHash } from '/src/flash'
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { clearFootnotes, resetSlides } from '/src/util';

  beforeNavigate(()=> {
    resetSlides();
  });

  afterNavigate(() => {
    checkHash();
    clearFootnotes();
  });
</script>

<slot></slot>