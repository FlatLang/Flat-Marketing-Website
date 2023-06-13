<p id={id} class="footnote"><span class="footnote-number">{footnote.number}.</span> <span class="footnote-content"><slot/></span></p>

<script lang="ts">
  import { getFootnote } from './footnotes';

  export let id;

  let footnote = getFootnote(id);
</script>