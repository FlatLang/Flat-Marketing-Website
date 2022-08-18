<script lang="ts">
	import Header from 'src/components/Header.svelte';
	import Footer from 'src/components/Footer.svelte';
	import dayjs from 'dayjs';

	import type { GitHubRelease, OsRelease, OsAsset, Asset } from './types';

	import { jscd, defer, anchorButton, fetchJson } from 'src/util';
	import { blogPages } from 'src/routes/blog/blog';
	import { checkHash } from 'src/flash';
	import { browser } from '$app/env';

	function createAsset(
		release: GitHubRelease,
		name: string,
		assetName: string,
		assetMatcher: (assetName: string) => boolean
	): OsAsset {
		const { assets } = release;

		return {
			name,
			assetName,
			assetMatcher,
			asset: assets.find((a) => a.name === assetName),
			showMoreFormats: true,
			otherFormats: assets.filter((a) => a.name !== assetName && assetMatcher(a.name))
		};
	}

	function createOsRelease(release: GitHubRelease): OsRelease {
		const { name, html_url } = release;

		const blogPostUrl = 'airship/' + name.replace(/[\.]/g, '_') + '-release-notes';
		const page = blogPages.find((page) => page.url === blogPostUrl);

		function prefixedWith(value: string): (name: string) => boolean {
			return (name) => name.startsWith(value);
		}

		const value = {
			assets: [
				createAsset(release, 'windows', 'airship-win.exe', prefixedWith('airship-win')),
				createAsset(release, 'mac', 'airship-macos', prefixedWith('airship-macos')),
				createAsset(release, 'linux', 'airship-linux', prefixedWith('airship-linux')),
				createAsset(release, 'node', 'airship.js', prefixedWith('airship.'))
			],
			version: name,
			url: html_url,
			releaseNotesUrl: page ? `/blog/${page.url}` : undefined,
			createdAt: dayjs(release.created_at)
		};

		value.assets.sort((a, b) => {
			if (lowerOs === a.name) {
				return -1;
			} else if (lowerOs === b.name) {
				return 1;
			} else {
				return 0;
			}
		});

		return value;
	}

	function getReleaseTagFromHash(): string | null {
		if (!browser) {
			return null;
		}

		const hashValue = window.location.hash?.substring(1);

		if (hashValue && /v\d+_\d+_\d+/g.test(hashValue)) {
			return hashValue.replace(/_/g, '.');
		} else {
			return null;
		}
	}

	let currentRelease = defer<OsRelease>();
	const otherReleases = defer<OsRelease[]>();
	const releaseTag = getReleaseTagFromHash();
	const apiRoot = `https://api.github.com/repos/FlatLang/Airship`;
	const releaseUrl = `${apiRoot}/releases/${releaseTag ? 'tags/' + releaseTag : 'latest'}`;

	fetchJson<GitHubRelease>(releaseUrl)
		.then((release) => createOsRelease(release))
		.then((osRelease) => currentRelease.resolve(osRelease))
		.then(() => checkHash());

	function toggleShowAll() {
		showAll = !showAll;

		if (showAll) {
			fetchJson<GitHubRelease[]>(`${apiRoot}/releases`)
				.then((releases) => releases.filter((r) => r.name !== currentRelease.value!.version))
				.then((otherReleases) => otherReleases.map(createOsRelease))
				.then((osReleases) => {
					const existing = currentRelease.value!;

					osReleases.push(existing);
					osReleases.sort((a, b) => b.createdAt.diff(a.createdAt));

					currentRelease = defer<OsRelease>();
					currentRelease.resolve(osReleases.shift()!);

					return osReleases;
				})
				.then((osReleases) => otherReleases.resolve(osReleases))
				.then(() => checkHash());
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
	let release: OsRelease;
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
		<div id={formatClassName(`${release.version}-${osAsset.name}`)}>
			Download <a href={asset.browser_download_url}>{asset.name}</a>
			<span class="asset-size">({getSize(asset.size)})</span>
			{#if osAsset.otherFormats.length > 0 && !osAsset.showMoreFormats}
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
						{#each osAsset.otherFormats as asset}
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

	<element id="release">
		<div use:anchorButton id={formatClassName(release.version)}>
			<h4>
				{release.version} <span class="date gray">{release.createdAt.format('MMMM D, YYYY')}</span>
			</h4>
			[<a target="_blank" href={release.url}>GitHub</a>]
			{#if release.releaseNotesUrl}
				[<a href={release.releaseNotesUrl}>Release Notes</a>]
			{/if}
			<ul class="downloads-list">
				{#each release.assets as osAsset}
					{@const asset = osAsset.asset}
					{#if asset}
						<li>
							<replace id="download-element" />
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</element>

	<div class="white-background download">
		<div class="page-container">
			<Header />
			<div id="content-container">
				<section id="downloads">
					<div><h1 class="primary">DOWNLOAD</h1></div>
					<hr />
					<p>
						The recommended way to install Flat is with Flat's package manager <a
							target="_blank"
							href="https://github.com/FlatLang/Airship">Airship</a
						>. You can download a native binary for Airship for your OS below, or you can download
						the node
						{#await currentRelease.promise}
							<a on:click|preventDefault={() => {}} href="#node">airship.js</a>
						{:then release}
							<a href="#{formatClassName(release.version)}-node">airship.js</a>
						{/await}
						script file and run it directly with node 16 or later.
					</p>
					{#await currentRelease.promise}
						<h4>Loading...</h4>
					{:then release}
						<replace id="release" />
						{#if showAll}
							{#await otherReleases.promise}
								Loading...
							{:then releases}
								{#each releases as release}
									<hr />
									<replace id="release" />
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
