<script>
    export let title;
    export let photoIds;

    import { photos } from './../portfolio.json';

    function getPhotoSource( photoId, sizeLabel ) {
      const photo = photos.filter( photo => photo.id === photoId )[0];
      return photo[sizeLabel];
    }

    function getNextPhotoId( photoId ) {
      const currentIdx = photoIds.indexOf( photoId );

      if ( currentIdx === photoIds.length - 1 ) {
        return photoIds[0];
      }
      return photoIds[currentIdx + 1];
    }

    function getPreviousPhotoId( photoId ) {
      const currentIdx = photoIds.indexOf( photoId );

      if ( currentIdx === 0 ) {
        return photoIds[photoIds.length - 1];
      }
      return photoIds[currentIdx - 1];
    }

</script>

<style>
    .album-title {
        text-align: center;
    }

    @supports (display: grid) {
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, auto));
            grid-gap: 0.2rem;
        }

        .gallery,
        .gallery-item {
            margin: 0;
        }
    }

    .lightbox {
        display: none;
        position: fixed;
        z-index: 9999;
        width: 100%;
        height: 100%;
        left: 0;
        color:#333333;
        transition: opacity .5s ease-in-out;
        background-color: rgba(0, 0, 0, 0.9);
        text-align: center;
    }

    .lightbox:target {
        display: block;
        top: 0;
    }

    .lightbox img {
        /*max-width: 100%;*/
        /*!*max-height: calc(100vh - 225px);*!*/
        /*height: auto;*/

        position: fixed;
        background-color: white;
        padding: 0;
        max-height: 90%;
        max-width: 90%;
        top: 50%;
        left: 50%;
        margin: 0 -50% 0 0;
        transform: translate(-50%, -50%);
    }

    a.slideshow-nav {
        color: #333333;
        z-index: 999999;
        text-decoration: none;
        position: fixed;
        font-size: 36px;
        background-color: #cccccc;
        border-radius: 25px;
        padding: 5px 10px 5px 10px;
        opacity: 50%;
    }

    a.close {
        font-size: 24px;
        top: 1%;
        right: 1%;
        padding: 4px 12px 4px 12px;
    }

    a.prev,
    a.next {
        top: 50%;
        transform: translate(0%, -50%);
    }

    a.prev {
        left: 5%;
    }

    a.next {
        right: 5%;
    }
</style>

<h1 class="album-title">{title}</h1>

<div id="gallery" class="gallery">
    {#each photoIds as photoId }
        <a class="gallery-item" href="#lightbox-{photoId}">
            <img class="gallery-image" src="{getPhotoSource( photoId, 'url_z' )}" alt=""/>
        </a>
        <div class="lightbox" id="lightbox-{photoId}">
            <img src="{getPhotoSource( photoId, 'url_l' )}" alt=""/>
            <a class="slideshow-nav next" href="#lightbox-{getNextPhotoId( photoId )}">&#8594;</a>
            <a class="slideshow-nav close" href="{'#'}">X</a>
            <a class="slideshow-nav prev" href="#lightbox-{getPreviousPhotoId( photoId )}">&#8592;</a>
        </div>
    {/each}
</div>
