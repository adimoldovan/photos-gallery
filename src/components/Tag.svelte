<script>
	import Gallery from './Gallery.svelte';
	import { tags } from '../../public/portfolio.json';

	export let name;
	const tag = tags.filter(tag => tag.tag === name)[0];
</script>

<Gallery title="#{tag.tag}" photoIds={tag.photos} />
