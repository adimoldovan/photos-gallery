<script>
  import { albums } from "../../public/portfolio.json";
  import { photos } from "../../public/portfolio.json";
  import { tags } from "../../public/portfolio.json";
  import { places } from "../../public/portfolio.json";
  import { Icon } from "svelte-awesome";
  import { mapMarker } from "svelte-awesome/icons";

  function getAlbumCoverUrl(albumId) {
    const album = albums.filter((album) => album.id === albumId)[0];
    const randomIdx = Math.floor(Math.random() * album.photos.length);
    const randomPhotoId = album.photos[randomIdx];
    return photos.filter((photo) => photo.id === randomPhotoId)[0].url_z;
  }

  function getTagCoverUrl(tag) {
    const randomIdx = Math.floor(Math.random() * tag.photos.length);
    const randomPhotoId = tag.photos[randomIdx];
    return photos.filter((photo) => photo.id === randomPhotoId)[0].url_z;
  }

  function getPlaceCoverUrl(place) {
    const randomIdx = Math.floor(Math.random() * place.photos.length);
    const randomPhotoId = place.photos[randomIdx];
    return photos.filter((photo) => photo.id === randomPhotoId)[0].url_z;
  }

  function getAlbumUrl(album) {
    if(album.id === "0") {
      return "photo"
    } else {
      return `album/${album.title}`
    }
  }

  // Push "All" album
  const allPhotosIds = photos.map((p) => p.id)
  albums.push({
    "id": "0",
    "title": "All photos",
    "description": "",
    "photos": allPhotosIds
  })

  // Get only popular tags
  const popularTags = [];
  const otherTags = [];

  for (const tag of tags) {
    if (tag.count >= 5) {
      popularTags.push(tag);
    } else {
      otherTags.push(tag);
    }
  }
</script>

<h1 class="category-title">Albums</h1>
<div id="albums-gallery" class="gallery">
  {#each albums as album (album.id)}
    <a href={getAlbumUrl(album)} class="gallery-item">
      <img
        class="gallery-image"
        src={getAlbumCoverUrl(album.id)}
        alt={album.title}
      />
      <h1 class="album-caption">{album.title}</h1>
      <h1 class="photo-count">
        {album.photos.length} photo{#if album.photos.length > 1}s{/if}
      </h1>
    </a>
  {/each}
</div>
<h1 class="category-title sub">Places</h1>
<div id="places-gallery" class="gallery">
  {#each places as place}
    <a href="place/{place.name}" class="gallery-item">
      <img
        class="gallery-image"
        src={getPlaceCoverUrl(place)}
        alt={place.name}
      />
      <h1 class="album-caption">
        <Icon data={mapMarker} scale={3} />
        <br />{place.name}
      </h1>
      <h1 class="photo-count">
        {place.count} photo{#if place.count > 1}s{/if}
      </h1>
    </a>
  {/each}
</div>
<h1 class="category-title sub">Tags</h1>
<div id="tags-gallery" class="gallery">
  {#each popularTags as tag}
    <a href="tag/{tag.tag}" class="gallery-item">
      <img class="gallery-image" src={getTagCoverUrl(tag)} alt={tag.tag} />
      <h1 class="album-caption">#{tag.tag}</h1>
      <h1 class="photo-count">
        {tag.count} photo{#if tag.count > 1}s{/if}
      </h1>
    </a>
  {/each}
</div>

<style>
  h1.album-caption {
    position: absolute;
    text-align: center;
    color: #f5f5f5;
    text-shadow: 1px 2px 2px #000;
    font-size: 2.5rem;
    letter-spacing: -1px;
    font-weight: bolder;
    opacity: 90%;
    z-index: 1;
    bottom: 30%;
    width: 100%;
  }

  h1.photo-count {
    position: absolute;
    text-align: center;
    color: #f5f5f5;
    text-shadow: 1px 2px 2px #000;
    font-size: 1rem;
    letter-spacing: -1px;
    font-weight: bolder;
    opacity: 90%;
    z-index: 1;
    bottom: 25%;
    width: 100%;
  }

  .gallery-item:hover > .album-caption {
    transform: scale(1.1);
  }

  .gallery-item:hover > .photo-count {
    transform: scale(1.7);
  }

  .gallery-item:hover > h1 {
    transition: transform 0.5s ease;
    opacity: 100%;
  }

  .sub {
    margin-top: 10vh;
  }
</style>
