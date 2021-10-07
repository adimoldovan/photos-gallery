<script>
  import { albums } from './../portfolio.json';
  import { Link } from 'svelte-routing';

  function getAlbumCover( albumId ) {
    const album = albums.filter( album => album.id === albumId )[0];
    const randomIdx = Math.floor( Math.random() * album.photos.length );
    return album.photos[randomIdx].sizes.size.filter( size => size.label === 'Small 400' )[0].source;
  }

</script>

<style>
    .album-cover-image {
        display: block;
        width: 100%;
        max-height: 212px;
        object-fit: cover;
        transition: .9s;
        cursor: pointer;
    }

    .album-caption {
        text-align: center;
        padding-bottom: 15px;
        padding-top: 15px;
        border-bottom: #cccccc 1px solid;
        border-left: #cccccc 1px solid;
        border-right: #cccccc 1px solid;
        color: #666666;
    }

    @supports (display: grid) {
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, auto));
            grid-gap: 0.2rem;
        }

        .gallery,
        .gallery-item {
            margin: 0;
        }
    }
</style>

<div id="gallery" class="gallery">
{#each albums as album (album.id)}
    <Link to="album/{album.title}" class="gallery-item">
        <figure class="album-figure">
            <img class="album-cover-image" src="{getAlbumCover( album.id )}" alt="{album.title}"/>
            <figcaption class="album-caption">{album.title}</figcaption>
        </figure>
    </Link>
{/each}
</div>
