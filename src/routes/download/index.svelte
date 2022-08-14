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
                    {#await osAsset.asset}
                        Download <a href="/" on:click|preventDefault={() => {}}>loading...</a>
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

    import { jscd } from '/src/util';
    import { slide } from '/src/slide';
    import { browser } from '$app/env';

    interface OsAsset {
        name: string;
        asset: Promise<Asset>;
        assetName: string;
        assetDefer: {resolve: (value: any) => void};
    }

    interface Asset {
        browser_download_url: string;
        name: string;
    }

    function defer<T>(): {promise: Promise<T>} {
        var deferred = {};
        var promise = new Promise(function(resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject  = reject;
        });
        deferred.promise = promise;
        return deferred;
    }


    const downloadSchema: OsAsset[] = [
        {name: "windows", assetName: "airship-win.exe"},
        {name: "mac", assetName: "airship-macos"},
        {name: "linux", assetName: "airship-linux"},
        {name: "node", assetName: "airship.js"}
    ].map((a) => {
        const deferred = defer();

        return {
            ...a,
            asset: deferred.promise,
            assetDefer: deferred
        };
    });

    fetch('https://api.github.com/repos/FlatLang/Airship/releases/latest')
        .then(resp => resp.json())
        .then(data => data.assets)
        .then((assets: Asset[]) => {
            downloadSchema.forEach((value) => {
                value.assetDefer.resolve(assets.find(a => a.name === value.assetName))
            });
        });

    let whyJava = false;

    let buildVersion;
    let disabled = false;
    let version;
    let build;
    let type = {name: ""};
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

    let oses = {
        windows: {
            name: "Windows",
            key: "windows",
            extension: ".exe",
            filename: "FlatInstaller",
            stableVersions: [],
            betaVersions: ["0.3.0", "0.3.3", "0.3.4", "0.3.5", "0.3.6", "0.3.7", "0.3.8"]
        },
        mac: {
            name: "Mac OS X",
            key: "mac",
            extension: ".dmg",
            filename: "Flat",
            stableVersions: [],
            betaVersions: ["0.3.2", "0.3.3", "0.3.4", "0.3.5", "0.3.6", "0.3.7", "0.3.8"]
        },
        linux: {
            name: "Linux",
            key: "linux",
            extension: ".deb",
            filename: "flat",
            stableVersions: [],
            betaVersions: ["0.3.5", "0.3.6", "0.3.7", "0.3.8"]
        }
    };

    let currentOs = oses[lowerOs];

    let osArray = Object.keys(oses).map((key) => {
        return oses[key];
    });
</script>