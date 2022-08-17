<script lang="ts">
	import Header from '/src/components/Header.svelte';
	import Footer from '/src/components/Footer.svelte';

	import { jscd, defer } from '/src/util';
	import type { Deferred } from '/src/util';
	import { slide } from '/src/slide';
	import { blogPages } from '/src/routes/blog/blog';
	import type { BlogPage } from '/src/routes/blog/blog';

	interface GitHubRelease {
		name: string;
		html_url: string;
		assets: Asset[];
	}

	interface OsAsset {
		name: string;
		assetName: string;
		asset: Deferred<Asset>;
		version: Deferred<string>;
		url: Deferred<string>;
		releaseNotesUrl: Deferred<string>;
	}

	interface Asset {
		browser_download_url: string;
		name: string;
	}

	function createAsset(name: string, assetName: string): OsAsset {
		return {
			name,
			assetName,
			asset: defer(),
			version: defer(),
			url: defer(),
			releaseNotesUrl: defer()
		};
	}

	function createOsAssets(): OsAsset[] {
		return [
			createAsset('windows', 'airship-win.exe'),
			createAsset('mac', 'airship-macos'),
			createAsset('linux', 'airship-linux'),
			createAsset('node', 'airship.js')
		];
	}

	const currentAssets: OsAsset[] = createOsAssets();

	function resolveAsset(release: GitHubRelease, value: OsAsset): OsAsset {
		const { name, html_url, assets } = release;

		value.asset.resolve(assets.find((a) => a.name === value.assetName));
		value.version.resolve(name);
		value.url.resolve(html_url);

		const blogPostUrl = 'airship/' + name.replace(/[\.]/g, '_') + '-release-notes';
		const page = (blogPages as BlogPage[]).find((page) => page.url === blogPostUrl);

		if (page) {
			value.releaseNotesUrl.resolve(`/blog/${page.url}`);
		} else {
			value.releaseNotesUrl.resolve(null);
		}

		return value;
	}

	let allDownloads: Deferred<OsAsset[][]> = defer();

	fetch('https://api.github.com/repos/FlatLang/Airship/releases/latest')
		.then((resp) => resp.json() as Promise<GitHubRelease>)
		.then((release) => {
			currentAssets.forEach((value) => resolveAsset(release, value));
		});

	function toggleShowAll() {
		showAll = !showAll;

		if (showAll) {
			fetch('https://api.github.com/repos/FlatLang/Airship/releases')
				.then((resp) => resp.json() as Promise<GitHubRelease[]>)
				.then((releases) => {
					allDownloads.resolve(
						releases.slice(1).map((release) => {
							return createOsAssets().map((value) => resolveAsset(release, value));
						})
					);
				});
		}
	}

	let whyJava = false;
	let showAll = false;

	let os = jscd.os || '';
	let osVersion = jscd.osVersion;
	let lowerOs = os?.toLowerCase();
	let osHeader = os + (osVersion?.trim() ? ' ' + osVersion : '');

	currentAssets.sort((a, b) => {
		if (lowerOs === a.name) {
			return -1;
		} else if (lowerOs === b.name) {
			return 1;
		} else {
			return 0;
		}
	});

	if (lowerOs?.indexOf('mac') == 0) {
		lowerOs = 'mac';
	}
</script>

<svelte:head>
	<title>Download | Flat Programming Language</title>

	<link href="/styles/download.css" rel="preload" as="style" />
	<link
		href="/styles/download.css"
		rel="stylesheet"
		type="text/css"
		onload="this.media='all'; this.onload=null;"
	/>
</svelte:head>

<template lang="flat-html">
	<div class="white-background download">
		<div class="page-container">
			<Header />
			<div id="content-container">
				<div use:slide id="downloads" class="slide">
					<div><h1 class="primary">DOWNLOAD</h1></div>
					<hr />
					{#await currentAssets[0].version.promise}
						Version (loading...)
					{:then version}
						Version {version}
						[<a target="_blank" href={currentAssets[0].url.value}>GitHub</a>]
						{#if currentAssets[0].releaseNotesUrl.value}
							[<a href={currentAssets[0].releaseNotesUrl.value}>Release Notes</a>]
						{/if}
					{:catch error}
						{error}
					{/await}
					<ul>
						{#each currentAssets as osAsset}
							<li>
								{#await osAsset.asset.promise}
									Download <a href="/" on:click|preventDefault={() => {}}>{osAsset.assetName}</a>
								{:then asset}
									Download <a href={asset.browser_download_url}>{asset.name}</a>
									{#if lowerOs === osAsset.name}
										<span class="gray">// We think you are running {osHeader}</span>
									{/if}
								{:catch error}
									{error}
								{/await}
							</li>
						{/each}
					</ul>
					{#if showAll}
						{#await allDownloads.promise}
							Loading...
						{:then downloads}
							{#each downloads as osAssets}
								Version {osAssets[0].version.value}
								[<a target="_blank" href={osAssets[0].url.value}>GitHub</a>]
								{#if osAssets[0].releaseNotesUrl.value}
									[<a target="_blank" href={osAssets[0].releaseNotesUrl.value}>Release Notes</a>]
								{/if}
								<ul>
									{#each osAssets as osAsset}
										{#if osAsset.asset.value}
											<li>
												Download <a href={osAsset.asset.value.browser_download_url}
													>{osAsset.asset.value.name}</a
												>
												{#if lowerOs === osAsset.name}
													<span class="gray">// We think you are running {osHeader}</span>
												{/if}
											</li>
										{/if}
									{/each}
								</ul>
							{/each}
						{:catch error}
							{error}
						{/await}
					{:else}
						<a href="/" on:click|preventDefault={() => toggleShowAll()}>Show all</a>
					{/if}
				</div>
				<div use:slide id="installation" class="slide">
					<div><h1 class="primary">INSTALLATION</h1></div>
					<hr />
					<h4>Pre-requisites</h4>
					<ul>
						<li>
							Java Runtime 1.8 or later
							<span class="why gray">
								{#if !whyJava}<span class="tooltip" on:click={() => (whyJava = true)}
										>why java?</span
									>{/if}
								{#if whyJava}<span>The first iteration of the compiler is written in Java</span
									>{/if}
							</span>
						</li>
					</ul>
					<p />
					<p>
						After the installer has finished, you are ready to <a
							href="/docs/getting-started/hello-world">write your first program</a
						>.
					</p>
				</div>
			</div>
			<Footer />
		</div>
	</div>
</template>
