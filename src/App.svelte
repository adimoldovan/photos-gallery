<script>
  import { photos } from '../public/portfolio.json';
  import { Router, Route, Link } from 'svelte-routing';
  import Album from './components/Album.svelte';
  import Home from './components/Home.svelte';
  import Tag from './components/Tag.svelte';
  import { Icon } from 'svelte-awesome';
  import { github } from 'svelte-awesome/icons';
  import Photo from './components/Photo.svelte';
  import config from './../public/config.json';

  document.title = `${config.siteTitle} - ${config.siteSubtitle}`;

  export let url = '';

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
    <Router {url}>
        <div class="header">
            <h1 class="site-title"><Link to="/">{config.siteTitle}</Link></h1>
            <div class="site-subtitle">{config.siteSubtitle}</div>
        </div>
        <div>
            <Route path="album/:name" component={Album} />
            <Route path="tag/:name" component={Tag} />
            <Route path="photo" component={Photo} />
            <Route path="/" component={Home} />
        </div>
        <div class="footer">
            <div class="keys-help">
                <span class="key">R</span> - random photo •
                <span class="key">H</span> - home page •
                <span class="key">&rarr;</span> - next photo •
                <span class="key">&larr;</span> - previous photo •
                <span class="key">ESC</span> - exit slideshow
            </div>
        </div>
        <div class="footer-source">
            <a href="{config.gitUrl}"><Icon data={github}/></a>
        </div>
    </Router>
</main>
