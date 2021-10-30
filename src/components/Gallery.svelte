<script>
  export let title;
  export let photoIds;

  import { photos } from '../../public/portfolio.json';

  const sizes = [ 'url_k', 'url_h', 'url_l', 'url_c', 'url_z' ];

  function getPhotoSource( photoId, sizeLabel, fixSize = true ) {
    const photo = photos.filter( photo => photo.id === photoId )[0];

    if ( !fixSize && !photo[sizeLabel] ) {
      for ( const size of sizes ) {
        const photo = photos.filter( photo => photo.id === photoId )[0];
        if ( photo[size] ) {
          return photo[size];
        }
      }
    }

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

  document.addEventListener( 'keydown', function ( event ) {
    if ( !location.hash.startsWith( '#lightbox' ) ) {
      return;
    }

    const keyMap = [ {
      key: 'ArrowRight',
      selector: 'next'
    }, {
      key: 'ArrowLeft',
      selector: 'prev'
    },
    {
      key: 'Escape',
      selector: 'close'
    } ];

    for ( const keyEntry of keyMap ) {
      if ( event.key === keyEntry.key ) {
        const targetElement = document.querySelector( `${location.hash} > a.${keyEntry.selector}` );
        targetElement.click();
      }
    }
  } );

  console.log( location.pathname );

</script>

<style>
    .gallery-image:hover {
        transform: scale(1.1);
        transition: transform 3s ease;
    }

    .lightbox {
        display: none;
        position: fixed;
        z-index: 9999;
        width: 100%;
        height: 100%;
        left: 0;
        color: #333333;
        transition: opacity .5s ease-in-out;
        background-color: rgba(0, 0, 0, 0.95);
        text-align: center;
    }

    .lightbox:target {
        display: block;
        top: 0;
    }

    .lightbox img {
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
        border-radius: 12px;
        padding: 5px 10px 5px 10px;
        background-color: rgba(204, 204, 204, 0.5);
    }

    a.slideshow-nav:hover {
        background-color: rgba(204, 204, 204, 1);
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

<h1 class="page-title">
    {title}
</h1>

<div id="gallery" class="gallery">
    {#each photoIds as photoId }
        <a class="gallery-item" href="#lightbox-{photoId}">
            <img class="gallery-image" src="{getPhotoSource( photoId, 'url_z' )}" alt="" loading="lazy"/>
        </a>
        <div class="lightbox" id="lightbox-{photoId}">
            <img src="{getPhotoSource( photoId, 'url_k', false )}" alt=""/>
            <a class="slideshow-nav next" href="#lightbox-{getNextPhotoId( photoId )}">&#8594;</a>
            <a class="slideshow-nav close" href="{'#'}">X</a>
            <a class="slideshow-nav prev" href="#lightbox-{getPreviousPhotoId( photoId )}">&#8592;</a>
        </div>
    {/each}
</div>
