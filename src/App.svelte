<script>
  import Router from './routes/index.svelte';
  // eslint-disable-next-line max-len
  if( !sessionStorage.getItem( '_swa' )&&document.referrer.indexOf( location.protocol+'//'+location.host )!== 0 ) {fetch( 'https://counter.dev/track?'+new URLSearchParams( { referrer:document.referrer,screen:screen.width+'x'+screen.height,user:'adimoldovan',utcoffset:'3' } ) );}sessionStorage.setItem( '_swa','1' );
</script>

<main>
    <Router />
</main>
