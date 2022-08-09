<div>
    <h3><a href="/download">DOWNLOAD BETA v0.3.9</a></h3>
    <h1>NOTABLE CHANGES</h1>
    <h4 style="margin-bottom: 0px;">tl;dr:</h4>
    <ul>
        <li><a href="#null-function-references">Function references compatible with null</a></li>
    </ul>
    <div use:anchorButton id="release-notes" class="release-notes" style="margin-bottom: 20px;">
        <div use:anchorButton id="null-function-references" class="release-note">
            <h4>Function references now compatible with null <Issue values={[{number: 377, repo: 'Flat'}]}></Issue></h4>
            <p>
                More info on first class functions discussed in <a href="/blog}first-class-functions">this blog post</a>.
            </p>
        </div>
        <div use:anchorButton id="bug-fixes" class="release-note">
            <h4>General bug fixes</h4>
            <p>
                Fixed function types without lambda assignment being treated as lambda declarations.
            </p>
        </div>
    </div>
</div>

<script>
    import Issue from '/src/components/Issue.svelte';

    import { anchorButton } from '/src/util';
</script>