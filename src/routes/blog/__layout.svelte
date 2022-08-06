<div class="white-background">
    <div class="page-container">
        <Header></Header>
        <div id="content-container">
            <div class="content">
                {#if $currentPage != null}
                <div class="content-header-container dark-border">
                    <table>
                        <tr>
                            <td>
                                <div class="header-container">
                                    {#if $currentPage.header}
                                    <h1 class="content-header">{$currentPage.header.toUpperCase()}</h1>
                                    {/if}
                                    {#if $currentPage.subheader}
                                    <h2 class="content-subheader">{$currentPage.subheader.toUpperCase}</h2>
                                    {/if}
                                    <p class="info" ng-if="$currentPage.author || $currentPage.date">
                                        <span class="author" ng-bind="$currentPage.author"></span><span ng-if="$currentPage.author && $currentPage.date"> - </span><span class="date" ng-bind="$currentPage.date"></span>
                                    </p>
                                </div>
                            </td>
                            <td class="export-options">
                                <h2 class="share-link nowrap" share url="{currentUrl}">SHARE PAGE <img class="share" src="/images/share.svg" /></h2>
                            </td>
                        </tr>
                    </table>
                </div>
                {/if}
                <div class="content-view-container">
                    <div class="content-view">
                        <div class="view{ !$currentPage ? " home" : "" }">
                            <slot></slot>
                        </div>
                    </div>
                    {#if $currentPage && $currentPage.references && $currentPage.references.length > 0}
                    <div class="references dark-border">
                        <h2>References</h2>
                        <ul class="references-list">
                            {#each $currentPage.references as ref}
                            <li>
                                <a href="{ref.url}" ng-bind="ref.header" title="{ ref.tooltip }"></a>
                            </li>
                            {/each}
                        </ul>
                    </div>
                    {/if}
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</div>

<script>
    import Header from '/src/components/Header.svelte';
    import Footer from '/src/components/Footer.svelte';

    import { currentPage, blogPages } from './blog';
    import { page } from '$app/stores';

    let currentUrl = "";

    page.subscribe(({url}) => {
        currentUrl = url.href;

        currentPage.set(null);

        const prefix = "/blog/";
        const urlIndex = url.pathname.indexOf(prefix);

        if (urlIndex === 0) {
            const blogPage = url.pathname.substring(urlIndex + prefix.length);

            if (blogPage) {
                currentPage.set(blogPages.find(p => p.url === blogPage));
            }
        }
    });

</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="/styles/docs.css" />
  <link rel="stylesheet" type="text/css" href="/styles/blog.css" />
  <link rel="stylesheet" type="text/css" href="/styles/blog-styles.css" />
</svelte:head>