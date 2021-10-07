<script>
    import Gallery from './Gallery.svelte';

    export let name;
    import { albums } from './../portfolio.json';
    const album = albums.filter( album => album.title === name )[0];
</script>

<Gallery title="{album.title}" photos="{album.photos}"/>
