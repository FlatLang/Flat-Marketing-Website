<script>
  import { checkHash } from '/src/flash'
  import { afterNavigate } from '$app/navigation';

  afterNavigate(() => {
    checkHash();
  });
</script>

<slot></slot>