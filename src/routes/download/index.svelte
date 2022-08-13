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
                <h4 class="gray">We think you are running { osHeader }</h4>
                {#if !currentOs}
                <p>{ os } is not currently supported by Flat.</p>
                {/if}
            </div>
            {#if currentOs}
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
                <p>After the installer has finished, you are ready to <a href="/docs/getting-started/hello-world">write your first program</a>.</p>
            </div>
            {/if}
        </div>
        <Footer></Footer>
    </div>
</div>
</template>

<script>
    import Header from '/src/components/Header.svelte';
    import Footer from '/src/components/Footer.svelte';

    import { jscd } from '/src/util';
    import { slide } from '/src/slide';

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