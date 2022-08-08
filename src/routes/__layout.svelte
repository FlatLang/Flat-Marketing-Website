<script>
  import { loadFlash } from '/src/flash'
  import { afterNavigate } from '$app/navigation';

  afterNavigate(() => {
    loadFlash();
  });
</script>

<slot></slot>