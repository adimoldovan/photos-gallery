<script>
  import { albums } from './../portfolio.json';
  import { photos } from './../portfolio.json';
  import { tags } from './../portfolio.json';
  import { Link } from 'svelte-routing';

  function getAlbumCoverUrl( albumId ) {
    const album = albums.filter( album => album.id === albumId )[0];
    const randomIdx = Math.floor( Math.random() * album.photos.length );
    const randomPhotoId = album.photos[randomIdx];
    return photos.filter( photo => photo.id === randomPhotoId )[0].url_n;
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

    #tags {
        text-align: center;
        text-decoration: none;
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
<div id="tags">
    {#each tags as tag}
        <Link to="tag/{tag.tag}">#{tag.tag}</Link>&nbsp;
    {/each}
</div>
