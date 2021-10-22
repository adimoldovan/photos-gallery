<script>
  import { albums } from '../../public/portfolio.json';
  import { photos } from '../../public/portfolio.json';
  import { tags } from '../../public/portfolio.json';
  import { places } from '../../public/portfolio.json';
  import { Icon } from 'svelte-awesome';
  import { mapMarker } from 'svelte-awesome/icons';

  function getAlbumCoverUrl( albumId ) {
    const album = albums.filter( album => album.id === albumId )[0];
    const randomIdx = Math.floor( Math.random() * album.photos.length );
    const randomPhotoId = album.photos[randomIdx];
    return photos.filter( photo => photo.id === randomPhotoId )[0].url_z;
  }

  function getTagCoverUrl( tag ) {
    const randomIdx = Math.floor( Math.random() * tag.photos.length );
    const randomPhotoId = tag.photos[randomIdx];
    return photos.filter( photo => photo.id === randomPhotoId )[0].url_z;
  }

  function getPlaceCoverUrl( place ) {
    const randomIdx = Math.floor( Math.random() * place.photos.length );
    const randomPhotoId = place.photos[randomIdx];
    return photos.filter( photo => photo.id === randomPhotoId )[0].url_z;
  }

  const popularTags = [];
  const otherTags = [];

  for( const tag of tags ) {
    if( tag.count >= 5 ) {
      popularTags.push( tag );
    } else {
      otherTags.push( tag );
    }
  }

</script>

<style>
    h1.album-caption {
        position: absolute;
        text-align: center;
        color: #f5f5f5;
        text-shadow: 1px 2px 2px #000;
        font-size: 2.2em;
        letter-spacing: -1px;
        font-weight: bolder;
        opacity: 90%;
        z-index: 1;
        top: 50%;
        width: 100%;
        transform: translateY(-100%);
    }
</style>

<h2>Albums</h2>
<div id="albums-gallery" class="gallery">
    {#each albums as album (album.id)}
            <a href="album/{album.title}" class="gallery-item">
                <img class="gallery-image" src="{getAlbumCoverUrl( album.id )}" alt="{album.title}"/>
                <h1 class="album-caption">{album.title}</h1>
            </a>
    {/each}
</div>
<h2>Places</h2>
<div id="places-gallery" class="gallery">
    {#each places as place}
        <a href="place/{place.name}" class="gallery-item">
            <img class="gallery-image" src="{getPlaceCoverUrl( place )}" alt="{place.name}"/>
            <h1 class="album-caption"><Icon data={mapMarker} scale={3}/><br/>{place.name}</h1>
        </a>
    {/each}
</div>
<h2>Tags</h2>
<div id="tags-gallery" class="gallery">
    {#each popularTags as tag}
        <a href="tag/{tag.tag}" class="gallery-item">
            <img class="gallery-image" src="{getTagCoverUrl( tag )}" alt="{tag.tag}"/>
            <h1 class="album-caption">#{tag.tag}</h1>
        </a>
    {/each}
</div>


<!--<div class="tags">-->
<!--    {#each otherTags as tag}-->
<!--        <span><Link to="tag/{tag.tag}">#{tag.tag} ({tag.count})</Link>&#32;</span>-->
<!--    {/each}-->
<!--</div>-->
