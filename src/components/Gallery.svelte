<script>
    export let title;
    export let photos;

    function getPhotoSource( photoId, sizeLabel ) {
      const photo = photos.filter( photo => photo.id === photoId )[0];
      const size = photo.sizes.size.filter( size => size.label === sizeLabel )[0];
      return size.source;
    }

    function getNextPhotoId( photoId ) {
      const photoIds = photos.map( photo => photo.id );
      const currentIdx = photoIds.indexOf( photoId );

      if ( currentIdx === photos.length - 1 ) {
        return photos.map( photo => photo.id )[0];
      }
      return photos.map( photo => photo.id )[currentIdx + 1];
    }

    function getPreviousPhotoId( photoId ) {
      const photoIds = photos.map( photo => photo.id );
      const currentIdx = photoIds.indexOf( photoId );

      if ( currentIdx === 0 ) {
        return photos.map( photo => photo.id )[photos.length - 1];
      }
      return photos.map( photo => photo.id )[currentIdx - 1];
    }

</script>

<style>
    .album-title {
        text-align: center;
    }

    @supports (display: grid) {
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, auto));
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
        background-color: rgba(0, 0, 0, 0.86);
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
        top: 1%;
        right: 1%;
        padding: 5px 15px 5px 15px;
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
    {#each photos as photo (photo.id)}
        <a class="gallery-item" href="#lightbox-{photo.id}">
            <img class="gallery-image" src="{getPhotoSource( photo.id, 'Small 320' )}" alt=""/>
        </a>
        <div class="lightbox" id="lightbox-{photo.id}">
            <img src="{getPhotoSource( photo.id, 'Large' )}" alt=""/>
            <a class="slideshow-nav next" href="#lightbox-{getNextPhotoId( photo.id )}">&#8594;</a>
            <a class="slideshow-nav close" href="#">X</a>
            <a class="slideshow-nav prev" href="#lightbox-{getPreviousPhotoId( photo.id )}">&#8592;</a>
        </div>
    {/each}
</div>
