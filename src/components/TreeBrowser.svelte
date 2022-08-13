<div
  class="tree-browser{(isRoot ? " root" : " sub-tree-browser")}"
  class:open={open}
>
  {#each data as item}
  <div
    class="tree-item"
    class:children={item.children?.length > 0}
    class:open={opened[item.path]}
    class:selected={selectedItem === item}
  >
    <table
      on:click="{(event) => toggle(item, event.target)}"
    >
      <tr>
        <td class="arrow-container">
        <div
          class="arrow{
            (item.children?.length > 0 ? "" : " invisible")
          }"
          class:invisible={!item.children || item.children.length === 0}
          class:down={opened[item.path]}
        ></div>
        </td>
        <td class="link-container">
        <a
          class="link"
          href="{urlPrefix}/{item.url}"
          title="{item.tooltip}"
          class:selected={selectedItem === item}
        >
          {item.header}
        </a>
        </td>
      </tr>
    </table>
    {#if item.children?.length > 0}
    <TreeBrowser
      isRoot={false}
      open={opened[item.path]}
      data={item.children}
      urlPrefix="{urlPrefix}/{item.url}"
    ></TreeBrowser>
    {/if}
  </div>
  {/each}
</div>

<script>
    import { page } from '$app/stores';
    import { currentPage } from '/src/routes/docs/docs';

    import TreeBrowser from './TreeBrowser.svelte';

    export let isRoot = true;
    export let open = isRoot;
    export let data;
    export let urlPrefix = "";

    let selectedItem;
    let opened = {[urlPrefix]: open};

    page.subscribe(({url}) => {
      const postUrl = url.pathname.substring("/docs/".length);
      const item = data.find(c => c.path === postUrl);

      selectedItem = item;
    });

    currentPage.subscribe(() => {
      const value = data.find(c => $currentPage?.path.startsWith(c.path));

      if (value) {
        open = true;
        opened[value.path] = true;
      }
    });

    const toggle = (item, target) => {
      if (!target.classList.contains("link")) {
        return;
      }

      const prev = opened[item.path];

      if (selectedItem === item) {
        opened[item.path] = !prev;
      } else {
        opened[item.path] = true;
      }
    };
</script>