<div ng-if="!page" class="default-view" ng-init="limit = 50">
    <table class="recent-posts-header">
        <tr>
            <td>
                <h1>{ limit ? 'RECENT' : 'ALL' } POSTS {#if limit}<span ng-show="limit" class="show-all" on:click={() => toggleLimit()}>Show all</span>{/if}</h1>
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
    </div>
</div>

<svelte:head>
    <link rel="stylesheet" type="text/css" href="/styles/blog-home.css" />
</svelte:head>

<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { blogPages, currentPage } from './blog';

    currentPage.set(null);

    let limit;
    let pages = [];
    let searchValue;

    page.subscribe(() => {
        searchValue = typeof searchValue === 'undefined' ? $page.url.searchParams.get("search") : searchValue;
        limit = typeof limit === 'undefined' ? !$page.url.searchParams.get("showAll") : limit;
    });

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
        pages = [...blogPages]
            .filter(p => p.visible !== false)
            .filter(p => !searchValue || p.header.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1)
            .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

        if (limit) {
            pages = pages.slice(0, 10);
        }
    }

    updateResults();
</script>