<a href="#{id}" class="footnote">{footnote.number}</a>

<script>
  import { getFootnote } from './footnotes';

  export let id;

  let footnote = getFootnote(id);
</script>