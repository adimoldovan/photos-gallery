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
    .album-caption {
        position: absolute;
        text-align: center;
        padding-bottom: 20px;
        padding-top: 20px;
        color: #222;
        background-color: #e5e5e5;
        opacity: 80%;
        z-index: 1;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -100%);
    }

</style>

<div id="gallery" class="gallery">
    {#each albums as album (album.id)}
            <Link to="album/{album.title}" class="gallery-item">
                <img class="gallery-image" src="{getAlbumCoverUrl( album.id )}" alt="{album.title}"/>
                <div class="album-caption">{album.title}</div>
            </Link>
    {/each}
</div>
<div class="tags">
    <h2>&nbsp;</h2>
    {#each tags as tag}
        <span><Link to="tag/{tag.tag}">#{tag.tag} ({tag.count})</Link>&#32;</span>
    {/each}
</div>
