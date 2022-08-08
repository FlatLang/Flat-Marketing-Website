<hr>
<div id="windows">
    <h1>Configuring a Windows environment</h1>
    <h3>If you used the installer, then you should already have these configurations set up.</h3>
    <h4 ng-if="lowerOs == 'windows'" class="gray">We think you are running { osHeader }</h4>

    <p>From the start menu, click the settings gear:</p>
    <img style="max-width: 450px;" class="dark-background" src="/images/windows-step1.png" />

    <p>Next, in the Settings search box, type in "environment variables" and select "Edit the system environment variables".</p>
    <img style="max-width: 450px;" class="dark-background" src="/images/windows-step2.png" />

    <p>A "System Properties dialog will pop up. Click the "Environment Variables..." button at the bottom.</p>
    <img style="max-width: 450px;" src="/images/windows-step3.png" />

    <p>On the new dialog, click the "Edit..." button.</p>
    <img style="max-width: 450px;" src="/images/windows-step4.png" />

    <p>Next, click the "New" button in the top right corner.</p>
    <img style="max-width: 450px;" src="/images/windows-step5.png" />

    <p>After having clicked the "New" button, it will allow you to type the new environment variable value. Add the path to the bin folder where flat was installed.</p>
    <div class="note">If you don't know where it was installed, it was most likely installed to "C:\Program Files\Flat\bin" or "C:\Program Files (x86)\Flat\bin"</div>
    <img style="max-width: 450px;" src="/images/windows-step6.png" />

    <p>Finally, just click OK on all of the open dialogs to save the changes.</p>
    <img style="max-width: 40%; margin-right: 5%" src="/images/windows-step7.png" />
    <img style="max-width: 40%;" src="/images/windows-step8.png" />
    <div class="note">After setting the environment variables, you will need to restart any open command prompts or IDEs for the changes to take effect.</div>
</div>
<hr>
<div id="mac">
    <h1>Configuring a Mac OS X environment</h1>
    <h4 ng-if="lowerOs == 'mac'" class="gray">We think you are running { osHeader }</h4>


</div>
<hr>
<div id="linux">
    <h1>Configuring a Linux environment</h1>
    <h4 ng-if="lowerOs == 'linux'" class="gray">We think you are running { osHeader }</h4>


</div>


<script>
    import { onMount } from 'svelte';
    import { jscd } from '/src/util';

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

    onMount(() => {
        if (!window.location.hash) {
            window.location.hash = "#" + lowerOs;
        }
    });
</script>