<p id={id} class="footnote"><span class="footnote-number">{footnote.number}.</span> <span class="footnote-content"><slot/></span></p>

<script>
  import { getFootnote } from '/src/util';

  export let id;

  let footnote = getFootnote(id);
</script>