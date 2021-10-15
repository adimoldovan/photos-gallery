<script>
  import Router from './routes/index.svelte';
  import { photos } from '../public/portfolio.json';


  // eslint-disable-next-line max-len
  if( !sessionStorage.getItem( '_swa' )&&document.referrer.indexOf( location.protocol+'//'+location.host )!== 0 ) {fetch( 'https://counter.dev/track?'+new URLSearchParams( { referrer:document.referrer,screen:screen.width+'x'+screen.height,user:'adimoldovan',utcoffset:'3' } ) );}sessionStorage.setItem( '_swa','1' );

  const allPhotoIds = photos.map( p => p.id );
  document.addEventListener( 'keydown', function ( event ) {
    if ( event.key === 'r' ) {
      const randomIdx = Math.floor( ( Math.random() * allPhotoIds.length ) );
      location.assign ( `${location.origin}/photo#lightbox-${allPhotoIds[randomIdx]}` );
    }

    if ( event.key === 'h' ) {
      location.assign ( location.origin );
    }
  } );
</script>

<main class="main">
    <Router />
</main>
