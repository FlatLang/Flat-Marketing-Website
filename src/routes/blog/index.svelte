<div class="default-view">
    <table class="recent-posts-header">
        <tr>
            <td>
                <h1>{ limit ? 'RECENT POSTS' : 'ALL POSTS' } {#if limit && limited}<span class="show-all" on:click={() => toggleLimit()}>Show all</span>{/if}</h1>
            </td>
            <td class="search">
                <input type="text" bind:value={searchValue} on:input={() => updateSearch()} placeholder="SEARCH POSTS" />
            </td>
        </tr>
    </table>
    <hr>
    <div class="post-list">
        {#each pages as page}
        <div class="post">
            <h3><a href="/blog/{page.url}"><span>{page.header}</span></a></h3>
            <h6><span class="date">{page.date}</span></h6>
        </div>
        {/each}
        {#if limit && limited}<h3 class="show-all" on:click={() => toggleLimit()}>Show all</h3>{/if}
    </div>
</div>

<svelte:head>
  <link href="/styles/blog-home.css" rel="preload" as="style" />
  <link href="/styles/blog-home.css" rel="stylesheet" type="text/css" onload="this.media='all'; this.onload=null;" />
</svelte:head>

<script>
import { browser } from '$app/env';

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { blogPages, currentPage } from './blog';

    currentPage.set(null);

    let limit;
    let limited = false;
    let pages = [];
    let searchValue;

    const toggleLimit = () => {
        limit = !limit;

        updateQueryParam("showAll", !limit);

        updateResults();
    };

    const updateSearch = () => {
        updateQueryParam("search", searchValue);

        updateResults();
    };

    const updateQueryParam = (name, value) => {
        if (!value) {
            $page.url.searchParams.delete(name);
        } else {
            $page.url.searchParams.set(name, value);
        }

        goto(`?${$page.url.searchParams.toString()}`, {replaceState: false, noscroll: true, keepfocus: true});
    }

    const updateResults = () => {
        limited = false;
        pages = [...blogPages]
            .filter(p => p.visible !== false)
            .filter(p => !searchValue || p.header.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1)
            .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

        if (limit && pages.length > 10) {
            pages = pages.slice(0, 10);
            limited = true;
        }
    }

    page.subscribe(() => {
        if (browser) {
            searchValue = $page.url.searchParams.get("search") || "";
            limit = !$page.url.searchParams.get("showAll");
        } else {
            limit = true;
        }

        updateResults();
    });

    updateResults();
</script>