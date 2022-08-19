<script lang="ts">
	import { checkHash } from 'src/flash';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { clearFootnotes } from 'src/components/footnotes';
	import { resetSlides } from 'src/slide';

	beforeNavigate(() => {
		resetSlides();
	});

	afterNavigate(() => {
		checkHash();
		clearFootnotes();
	});
</script>

<slot />
