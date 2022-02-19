<script>
    import Gallery from './Gallery.svelte';
    import { places } from '../../public/portfolio.json';

    export let name;
    const place = places.filter((place) => place.name === name)[0];
</script>

<Gallery title={place.name} photoIds={place.photos} />
