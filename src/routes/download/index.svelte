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
                {#if currentOs}
                <h4 class="gray">We think you are running { osHeader }</h4>
                {/if}
                {#if !currentOs}
                <p>{ os } is not currently supported by Flat.</p>
                {/if}
                <p>
                    {#if currentOs}
                    {#await latestRequest}
                        Download <a href="/" on:click|preventDefault={() => {}}>loading...</a>
                    {:then latest}
                        Download <a href={latest[lowerOs].browser_download_url}>{latest[lowerOs].name}</a>
                    {:catch error}
                        {error}
                    {/await}
                    {/if}
                    {#if lowerOs !== "windows"}
                    <br>
                    {#await latestRequest}
                        Download <a href="/" on:click|preventDefault={() => {}}>loading...</a>
                    {:then latest}
                        Download <a href={latest.windows.browser_download_url}>{latest.windows.name}</a>
                    {:catch error}
                        {error}
                    {/await}
                    {/if}
                    {#if lowerOs !== "mac"}
                    <br>
                    {#await latestRequest}
                        Download <a href="/" on:click|preventDefault={() => {}}>loading...</a>
                    {:then latest}
                        Download <a href={latest.mac.browser_download_url}>{latest.mac.name}</a>
                    {:catch error}
                        {error}
                    {/await}
                    {/if}
                    {#if lowerOs !== "linux"}
                    <br>
                    {#await latestRequest}
                        Download <a href="/" on:click|preventDefault={() => {}}>loading...</a>
                    {:then latest}
                        Download <a href={latest.linux.browser_download_url}>{latest.linux.name}</a>
                    {:catch error}
                        {error}
                    {/await}
                    {/if}
                    <br>
                    {#await latestRequest}
                        Download <a href="/" on:click|preventDefault={() => {}}>loading...</a>
                    {:then latest}
                        Download <a href={latest.node.browser_download_url}>{latest.node.name}</a>
                    {:catch error}
                        {error}
                    {/await}
                </p>
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

    interface Asset {
        browser_download_url: string;
        name: string;
    }

    const latestRequest: Promise<{[target: string]: Asset}> = fetch('https://api.github.com/repos/FlatLang/Airship/releases/latest')
        .then(resp => resp.json())
        .then(data => data.assets)
        .then(assets => {
            return {
                windows: assets.find(a => a.name.indexOf(".exe") !== -1),
                mac: assets.find(a => a.name.indexOf("mac") !== -1),
                linux: assets.find(a => a.name.indexOf("linux") !== -1),
                node: assets.find(a => a.name.indexOf(".js") !== -1)
            };
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