<svelte:head>
  <title>Download | Flat Programming Language</title>

  <link href="/styles/download.css" rel="preload" as="style" />
  <link href="/styles/download.css" rel="stylesheet" type="text/css" onload="this.media='all'; this.onload=null;" />
</svelte:head>

<template lang="flat-html">
<div class="white-background download">
    <div class="page-container">
        <Header></Header>
        <div id="content-container">
            <div use:slide id="downloads" class="slide">
                <div><h1 class="primary">DOWNLOAD</h1></div>
                <hr>
                <ul>
                {#each downloadSchema as osAsset}
                    <li>
                    {#await osAsset.asset.promise}
                        Download <a href="/" on:click|preventDefault={() => {}}>{osAsset.assetName}</a>
                    {:then asset}
                        Download <a href={asset.browser_download_url}>{asset.name}</a>
                        {#if lowerOs === osAsset.name}
                            <span class="gray">// We think you are running { osHeader }</span>
                        {/if}
                    {:catch error}
                        {error}
                    {/await}
                    </li>
                {/each}
                </ul>
            </div>
            <div use:slide id="installation" class="slide">
                <div><h1 class="primary">INSTALLATION</h1></div>
                <hr>
                <h4>Pre-requisites</h4>
                <ul>
                    <li>Java Runtime 1.8 or later
                        <span class="why gray">
                            {#if !whyJava}<span class="tooltip" on:click={() => whyJava = true}>why java?</span>{/if}
                            {#if whyJava}<span>The first iteration of the compiler is written in Java</span>{/if}
                        </span>
                    </li>
                </ul>
                <p>
                </p>
                <p>After the installer has finished, you are ready to <a href="/docs/getting-started/hello-world">write your first program</a>.</p>
            </div>
        </div>
        <Footer></Footer>
    </div>
</div>
</template>

<script lang="ts">
    import Header from '/src/components/Header.svelte';
    import Footer from '/src/components/Footer.svelte';

    import { jscd, defer } from '/src/util';
    import type { Deferred } from '/src/util';
    import { slide } from '/src/slide';

    interface OsAsset {
        name: string;
        asset: Deferred<Asset>;
        assetName: string;
    }

    interface Asset {
        browser_download_url: string;
        name: string;
    }

    const downloadSchema: OsAsset[] = [
        {name: "windows", assetName: "airship-win.exe", asset: defer()},
        {name: "mac", assetName: "airship-macos", asset: defer()},
        {name: "linux", assetName: "airship-linux", asset: defer()},
        {name: "node", assetName: "airship.js", asset: defer()}
    ];

    fetch('https://api.github.com/repos/FlatLang/Airship/releases/latest')
        .then(resp => resp.json())
        .then(data => data.assets)
        .then((assets: Asset[]) => {
            downloadSchema.forEach((value) => {
                value.asset.resolve(assets.find(a => a.name === value.assetName))
            });
        });

    let whyJava = false;

    let os = jscd.os || "";
    let osVersion = jscd.osVersion;
    let lowerOs = os?.toLowerCase();
    let osHeader = os + (osVersion?.trim() ? " " + osVersion : "");

    downloadSchema.sort((a, b) => {
        if (lowerOs === a.name) {
            return -1;
        } else if (lowerOs === b.name) {
            return 1;
        } else {
            return 0;
        }
    });

    if (lowerOs?.indexOf("mac") == 0) {
        lowerOs = "mac";
    }
</script>