<script>
  import { page } from '$app/stores';
  import { docPages, currentPage, getDocFromPath } from './docs';
  import { writable } from 'svelte/store';
  import { anchorButton } from '/src/util';

  import TreeBrowser from '/src/components/TreeBrowser.svelte';
  import Share from '/src/components/Share.svelte';

  let share = writable(false);

  page.subscribe(({url}) => {
    currentPage.set(null);

    const prefix = "/docs/";
    const urlIndex = url.pathname.indexOf(prefix);

    if (urlIndex === 0) {
      const docPage = url.pathname.substring(urlIndex + prefix.length);

      if (docPage) {
        currentPage.set(getDocFromPath(docPage));
      }
    }
  });
</script>

<svelte:head>
  <title>Docs | Flat Programming Language</title>

  <link href="/styles/docs.css" rel="preload" as="style" />
  <link href="/styles/docs.css" rel="stylesheet" type="text/css" onload="this.media='all'; this.onload=null;" />
  <link href="/styles/blog-styles.css" rel="preload" as="style" />
  <link href="/styles/blog-styles.css" rel="stylesheet" type="text/css" onload="this.media='all'; this.onload=null;" />
</svelte:head>

<style>
  .flat-text-container {
      margin-top: 20px;
  }
</style>

<template lang="flat-html">
<main class="docs">
  <div class="container">
      <div class="navigation dark-background">
          <div class="logo-container">
              <a href="/">
                  <img style="max-width: 20vw;" class="logo glow-logo" src="/images/hex-f-plain.svg" />
              </a>

              <div class="flat-text-container">
                  <a href="/">
                      <h1 class="flat-text" style="color: rgba(0,0,0,0);">FLAT</h1>
                      <h1 class="flat-text">FLAT</h1>
                  </a>
              </div>

              <a class="neon-shadow" href="/">
                  <h1 class="return-home">RETURN HOME</h1>
              </a>
              <TreeBrowser class="page-browser" data={docPages} urlPrefix="/docs"></TreeBrowser>

              <div class="tree-browser root">
                <div ng-repeat="item in data | orderBy:'-children.length'" class="tree-item">
                    <table ng-click="toggle(item, false)">
                        <tr>
                            <td class="arrow-container">
                                <div class="arrow"></div>
                            </td>
                            <td class="link-container">
                                <a ng-click="toggle(item, true); $event.stopPropagation();" class="link" href="/docs/data-structures/lists">Lists</a>
                            </td>
                        </tr>
                    </table>
                    <div class="tree-browser">
                      <div ng-repeat="item in data | orderBy:'-children.length'" class="tree-item">
                          <table ng-click="toggle(item, false)">
                              <tr>
                                  <td class="arrow-container">
                                      <div class="arrow"></div>
                                  </td>
                                  <td class="link-container">
                                      <a ng-click="toggle(item, true); $event.stopPropagation();" class="link" href="/docs/class-types">Class Types</a>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div class="content white-background">
          {#if $currentPage !== null}
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
                  <div class="view">
                    <slot></slot>
                  </div>
              </div>
              {#if $currentPage?.references?.length > 0}
              <div use:anchorButton id="references" class="references dark-border">
                  <h2>References</h2>
                  <ul class="references-list">
                    {#each $currentPage.references as ref}
                      <li>
                          <a href="{ref.href}">{ref.header}</a>
                      </li>
                    {/each}
                  </ul>
              </div>
              {/if}
          </div>
          <Share active={share}></Share>
      </div>
  </div>
</main>
</template>