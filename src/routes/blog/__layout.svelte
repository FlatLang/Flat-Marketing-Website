<div class="white-background">
    <div class="page-container">
        <Header></Header>
        <div id="content-container">
            <div class="content">
                {#if page != null}
                <div class="content-header-container dark-border" ng-if="page">
                    <table>
                        <tr>
                            <td>
                                <div class="header-container">
                                    <h1 class="content-header" ng-bind="page.header | uppercase"></h1>
                                    <h2 class="content-subheader" ng-bind="page.subheader | uppercase" ng-if="page.subheader"></h2>
                                    <p class="info" ng-if="page.author || page.date">
                                        <span class="author" ng-bind="page.author"></span><span ng-if="page.author && page.date"> - </span><span class="date" ng-bind="page.date"></span>
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
                        <div class="view{ !page ? " home" : "" }">
                            <slot></slot>
                        </div>
                    </div>
                    {#if page.references && page.references.length > 0}
                    <div class="references dark-border">
                        <h2>References</h2>
                        <ul class="references-list">
                            {#each page.references as ref}
                            <li ng-repeat="ref in page.references">
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

    let currentUrl;
    let page = {references: []};
</script>

<svelte:head>
  <link rel="stylesheet" type="text/css" href="/styles/docs.css" />
  <link rel="stylesheet" type="text/css" href="/styles/blog.css" />
  <link rel="stylesheet" type="text/css" href="/styles/blog-styles.css" />
</svelte:head>