<svelte:head>
  <link href="/styles/download.css" rel="preload" as="style" />
  <link href="/styles/download.css" rel="stylesheet" type="text/css" onload="this.media='all'; this.onload=null;" />
</svelte:head>

<div class="white-background">
    <div class="page-container">
        <Header></Header>
        <div class="content-container">
            <div use:slide id="downloads" class="slide">
                <div><h1 class="primary">DOWNLOAD</h1></div>
                <hr>
                <h4 class="gray">We think you are running { osHeader }</h4>
                <p ng-if="!currentOs">{ os } is not currently supported by Flat.</p>
                <div ng-repeat="type in downloadTypes" id="{ type.id }" ng-if="type.version">
                    <h2>{ (build || type.name).toUpperCase() } v{ buildVersion || type.version } <span class="show-all gray" ng-click="toggleShowAll(type)">show { type.showAll ? versionTimeText : 'all' }</span></h2>
                    <div ng-repeat="version in type.versions | orderBy:'-'">
                        <a
                          ng-repeat="os in type.oses"
                          href="#"
                          download="{ !disabled ? os.filename + os.extension : undefined }"
                          target="_blank"
                          class="download-button{disabled ? " disabled" : ""}"
                          ng-if="version == type.version || type.showAll"
                          ng-init="disabled = os.betaVersions.indexOf(version) < 0"
                          ng-disabled="disabled"
                        >
                            <button>
                                <table>
                                    <tr>
                                        <td>
                                            <div class="icon-container"><img ng-src="/images/{os.key}.svg" /></div>
                                        </td>
                                        <td>
                                            { os.name } <span ng-if="type.showAll">v{ version }</span> build
                                        </td>
                                    </tr>
                                </table>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            {#if currentOs}
            <div use:slide id="installation" class="slide">
                <div><h1 class="primary">INSTALLATION</h1></div>
                <hr>
                <h4>Pre-requisites</h4>
                <ul>
                    <li>Java 1.8 or later <span class="why-java gray" ng-init="whyJava = false" ng-click="whyJava = true"><span ng-if="!whyJava">why java?</span><span ng-if="whyJava">The first iteration of the compiler is written in Java.</span></span></li>
                    <li>GCC compiler <span class="why-java gray" ng-init="whyGcc = false" ng-click="whyGcc = true"><span ng-if="!whyGcc">why gcc?</span><span ng-if="whyGcc">C is the most mature compilation target currently, and is the only language that comes pre-packaged with the installation.</span></span></li>
                </ul>
                <p>After the installer has finished, you are ready to <a href="/docs/getting-started/hello-world">write your first program</a>.</p>
            </div>
            {/if}
        </div>
        <Footer></Footer>
    </div>
</div>

<script>
    import Header from '/src/components/Header.svelte';
    import Footer from '/src/components/Footer.svelte';

    import { jscd } from '/src/util';
    import { slide } from '/src/slide';

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