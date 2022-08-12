<template lang="flat-html">
<div class="white-background">
    <div class="page-container">
        <Header></Header>
        <div id="content-container">
            <div class="content">
                {#if $currentPage != null}
                <div class="content-header-container dark-border">
                    <table>
                    <tbody>
                        <tr>
                            <td>
                                <div class="header-container">
                                    {#if $currentPage.header}
                                    <h1 class="content-header">{$currentPage.header.toUpperCase()}</h1>
                                    {/if}
                                    {#if $currentPage.subheader}
                                    <h2 class="content-subheader">{$currentPage.subheader.toUpperCase()}</h2>
                                    {/if}
                                    {#if $currentPage.author || $currentPage.date}
                                    <p class="info">
                                        {#if $currentPage.author}
                                        <span
                                          class="author"
                                        >{$currentPage.author}</span>
                                        {/if}
                                        {#if $currentPage.author && $currentPage.date}
                                        <span> - </span>
                                        {/if}
                                        {#if $currentPage.date}
                                        <span class="date">{$currentPage.date}</span>
                                        {/if}
                                    </p>
                                    {/if}
                                </div>
                            </td>
                            <td class="export-options">
                                <h4
                                  class="share-link nowrap"
                                  on:click={() => share.set(true)}
                                >
                                  SHARE PAGE <img class="share" src="/images/share.svg" />
                                </h4>
                            </td>
                        </tr>
                    </tbody>
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
        <Share active={share}></Share>
    </div>
</div>
</template>

<script>
    import Header from '/src/components/Header.svelte';
    import Footer from '/src/components/Footer.svelte';
    import Share from '/src/components/Share.svelte';

    import { currentPage, blogPages } from './blog';
    import { page } from '$app/stores';
    import { writable } from 'svelte/store';

    let share = writable(false);

    page.subscribe(({url}) => {
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
  <title>Blog | Flat Programming Language</title>

  <link href="/styles/docs.css" rel="preload" as="style" />
  <link href="/styles/docs.css" rel="stylesheet" type="text/css" onload="this.media='all'; this.onload=null;" />
  <link href="/styles/blog.css" rel="preload" as="style" />
  <link href="/styles/blog.css" rel="stylesheet" type="text/css" onload="this.media='all'; this.onload=null;" />
  <link href="/styles/blog-styles.css" rel="preload" as="style" />
  <link href="/styles/blog-styles.css" rel="stylesheet" type="text/css" onload="this.media='all'; this.onload=null;" />
</svelte:head>