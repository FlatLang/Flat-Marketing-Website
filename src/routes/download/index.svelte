<script lang="ts">
	import Header from '/src/components/Header.svelte';
	import Footer from '/src/components/Footer.svelte';

	import { jscd, defer, anchorButton } from '/src/util';
	import type { Deferred } from '/src/util';
	import { blogPages } from '/src/routes/blog/blog';
	import type { BlogPage } from '/src/routes/blog/blog';

	interface GitHubRelease {
		name: string;
		html_url: string;
		assets: Asset[];
	}

	interface Asset {
		browser_download_url: string;
		name: string;
		size: number;
	}

	interface OsAsset {
		name: string;
		assetName: string;
		assetMatcher: (assetName: string) => boolean;
		asset: Deferred<Asset>;
		version: Deferred<string>;
		url: Deferred<string>;
		releaseNotesUrl: Deferred<string>;
		showMoreFormats: boolean;
		otherFormats: Deferred<Asset[]>;
	}

	function createAsset(
		name: string,
		assetName: string,
		assetMatcher: (assetName: string) => boolean
	): OsAsset {
		return {
			name,
			assetName,
			assetMatcher,
			asset: defer(),
			version: defer(),
			url: defer(),
			releaseNotesUrl: defer(),
			showMoreFormats: true,
			otherFormats: defer()
		};
	}

	function createOsAssets(): OsAsset[] {
		return [
			createAsset('windows', 'airship-win.exe', (name) => name.startsWith('airship-win')),
			createAsset('mac', 'airship-macos', (name) => name.startsWith('airship-macos')),
			createAsset('linux', 'airship-linux', (name) => name.startsWith('airship-linux')),
			createAsset('node', 'airship.js', (name) => name.startsWith('airship.'))
		];
	}

	const currentAssets: OsAsset[] = createOsAssets();

	function resolveAsset(release: GitHubRelease, value: OsAsset): OsAsset {
		const { name, html_url, assets } = release;

		value.asset.resolve(assets.find((a) => a.name === value.assetName));
		value.otherFormats.resolve(
			assets.filter((a) => a.name !== value.assetName && value.assetMatcher(a.name))
		);
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

	function getSize(size: number) {
		if (size < 1024) {
			return `${size}B`;
		} else if (size / 1024 < 1024) {
			return `${(size / 1024).toFixed(1)}KiB`;
		} else if (size / 1024 / 1024 < 1024) {
			return `${(size / 1024 / 1024).toFixed(1)}MiB`;
		} else {
			return `${(size / 1024 / 1024 / 1024).toFixed(1)}GiB`;
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

	function formatClassName(value: string): string {
		return value
			.replace(/ /g, '-')
			.replace(/[^\w-]/g, '_')
			.toLocaleLowerCase();
	}

	let asset: Asset;
	let osAsset: OsAsset;
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
	<element id="download-element">
		<div id={formatClassName(`${osAsset.version.value}-${osAsset.name}`)}>
			Download <a href={asset.browser_download_url}>{asset.name}</a>
			<span class="asset-size">({getSize(asset.size)})</span>
			{#if osAsset.otherFormats.value.length > 0 && !osAsset.showMoreFormats}
				[<a href="/" on:click|preventDefault={() => (osAsset.showMoreFormats = true)}
					>more formats...</a
				>]
			{/if}
			{#if lowerOs === osAsset.name}
				<span class="gray os-comment">// We think you are running {osHeader}</span>
			{/if}
			{#if osAsset.showMoreFormats}
				<div class="more-formats">
					<ul>
						{#each osAsset.otherFormats.value as asset}
							<li>
								<a href={asset.browser_download_url}>{asset.name}</a>
								<span class="asset-size">({getSize(asset.size)})</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</element>

	<div class="white-background download">
		<div class="page-container">
			<Header />
			<div id="content-container">
				<section id="downloads">
					<div><h1 class="primary">DOWNLOAD</h1></div>
					<hr />
					{#await currentAssets[0].version.promise}
						<h4>Loading...</h4>
					{:then version}
						<div use:anchorButton id={formatClassName(currentAssets[0].version.value)}>
							<h4>{version}</h4>
							[<a target="_blank" href={currentAssets[0].url.value}>GitHub</a>]
							{#if currentAssets[0].releaseNotesUrl.value}
								[<a href={currentAssets[0].releaseNotesUrl.value}>Release Notes</a>]
							{/if}
							<ul class="downloads-list">
								{#each currentAssets as osAsset}
									<li>
										{#await osAsset.asset.promise}
											Download <a href="/" on:click|preventDefault={() => {}}>{osAsset.assetName}</a
											>
										{:then asset}
											<replace id="download-element" />
										{:catch error}
											{error}
										{/await}
									</li>
								{/each}
							</ul>
						</div>
						{#if showAll}
							{#await allDownloads.promise}
								Loading...
							{:then downloads}
								{#each downloads as osAssets}
									<hr />
									<div use:anchorButton id={formatClassName(osAssets[0].version.value)}>
										<h4>{osAssets[0].version.value}</h4>
										[<a target="_blank" href={osAssets[0].url.value}>GitHub</a>]
										{#if osAssets[0].releaseNotesUrl.value}
											[<a target="_blank" href={osAssets[0].releaseNotesUrl.value}>Release Notes</a
											>]
										{/if}
										<ul class="downloads-list">
											{#each osAssets as osAsset}
												{@const asset = osAsset.asset.value}
												{#if asset}
													<li>
														<replace id="download-element" />
													</li>
												{/if}
											{/each}
										</ul>
									</div>
								{/each}
							{:catch error}
								{error}
							{/await}
						{:else}
							<a href="/" on:click|preventDefault={() => toggleShowAll()}>Show all</a>
						{/if}
					{:catch error}
						{error}
					{/await}
				</section>
				<section id="installation">
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
				</section>
			</div>
			<Footer />
		</div>
	</div>
</template>
