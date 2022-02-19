<script>
    import Gallery from './Gallery.svelte';
    import { photos } from '../../public/portfolio.json';
    const photoIds = photos.map((p) => p.id);
</script>

<Gallery title="All photos" {photoIds} />
