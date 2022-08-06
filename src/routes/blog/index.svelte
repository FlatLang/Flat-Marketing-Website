<div ng-if="!page" class="default-view" ng-init="limit = 50">
    <table class="recent-posts-header">
        <tr>
            <td>
                <h1>{ limit ? 'RECENT' : 'ALL' } POSTS {#if limit}<span ng-show="limit" class="show-all" on:click={() => toggleLimit()}>Show all</span>{/if}</h1>
            </td>
            <td class="search">
                <input type="text" ng-model="searchValue" placeholder="SEARCH POSTS" />
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
    import { blogPages, currentPage } from './blog';

    currentPage.set(null);

    let limit = false;
    let pages = [];

    const toggleLimit = () => {
        limit = !limit;

        pages = [...blogPages]
            .filter(p => p.visible !== false)
            .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

        if (limit) {
            pages = pages.slice(0, 10);
        }
    };

    toggleLimit();
</script>