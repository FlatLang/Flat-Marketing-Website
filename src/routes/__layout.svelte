<script>
  import { checkHash } from '/src/flash'
  import { afterNavigate } from '$app/navigation';
  import { clearFootnotes } from '/src/components/footnotes';

  afterNavigate(() => {
    checkHash();
    clearFootnotes();
  });
</script>

<slot></slot>