<script>
  import { albums } from '../../public/portfolio.json';
  import { photos } from '../../public/portfolio.json';
  import { tags } from '../../public/portfolio.json';
  import { Link } from 'svelte-routing';

  function getAlbumCoverUrl( albumId ) {
    const album = albums.filter( album => album.id === albumId )[0];
    const randomIdx = Math.floor( Math.random() * album.photos.length );
    const randomPhotoId = album.photos[randomIdx];
    return photos.filter( photo => photo.id === randomPhotoId )[0].url_z;
  }

</script>

<style>
    .album-cover-image {
        display: block;
        width: 100%;
        max-height: 427px;
        object-fit: cover;
        transition: .9s;
        cursor: pointer;
        z-index: -1;
        position: relative;
    }

    .album-caption {
        text-align: center;
        padding-bottom: 20px;
        padding-top: 20px;
        /*border-bottom: #e5e5e5 1px solid;*/
        /*border-left: #e5e5e5 1px solid;*/
        /*border-right: #e5e5e5 1px solid;*/
        color: #333;
        background-color: #e5e5e5;
        opacity: 70%;
        /*margin-top: -55px;*/
        z-index: 1;
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
                <img class="album-cover-image" src="{getAlbumCoverUrl( album.id )}" alt="{album.title}"/>
                <figcaption class="album-caption">{album.title}</figcaption>
            </figure>
        </Link>
    {/each}
</div>
<div class="tags">
    {#each tags as tag}
        <span><Link to="tag/{tag.tag}">#{tag.tag} ({tag.count})</Link>&#32;</span>
    {/each}
</div>
