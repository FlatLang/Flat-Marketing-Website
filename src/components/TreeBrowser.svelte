<div
  class="tree-browser{
    (isRoot ? " root" : " sub-tree-browser") +
    (isRoot ? " open" : "")
  }"
>
  {#each data as item}
  <div
    class="tree-item{
      (item.children && item.children.length > 0 ? " children" : "")
    }"
  >
    <table
      on:click="{(event) => toggle(item, event.target)}"
    >
      <tr>
        <td class="arrow-container">
        <div
          class="arrow{
            (!item.children || item.children.length == 0 ? " invisible" : "")
          }"
        ></div>
        </td>
        <td class="link-container">
        <a
          class="link"
          href="{urlPrefix}/{item.url}"
          title="{item.tooltip}"
        >
          {item.header}
        </a>
        </td>
      </tr>
    </table>
    {#if item.children && item.children.length > 0}
    <TreeBrowser on:notify="{test}" isRoot={false} data={item.children} urlPrefix="{urlPrefix + "/" + item.url}" parent={item} stack={[...stack, item]}></TreeBrowser>
    {/if}
  </div>
  {/each}
</div>

<script>
    import TreeBrowser from './TreeBrowser.svelte';

    export let isRoot = true;
    export let data;
    export let urlPrefix = "";
    export let parent;
    export let stack = [];

    const jq = typeof window !== 'undefined' ? window.$ : null;

    const toggle = (item, target) => {
        const element = jq(target);

        if (!element.hasClass("link")) {
            return;
        }
        const elements = jq(".tree-browser .open");
        const selected = jq(".tree-browser .selected");
        const arrows = jq(".tree-browser .arrow");
        console.log(item, elements, target);
        // elements.toggleClass("open", false);
        selected.toggleClass("selected", false);
        // arrows.toggleClass("down", false);

        element
            .toggleClass("selected", true)
            .closest(".tree-item")
            .toggleClass("selected", true)
            .toggleClass("open", true)
            .find(".arrow")
            .toggleClass("down", true)
            .closest(".tree-browser")
            .toggleClass("open", true);
    };

    const test = (data) => {
        console.log("here", data, parent);
    };
</script>