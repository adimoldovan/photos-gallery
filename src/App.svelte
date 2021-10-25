<script>
  import { photos } from '../public/portfolio.json';
  import { Router, Route, Link } from 'svelte-routing';
  import Album from './components/Album.svelte';
  import Home from './components/Home.svelte';
  import Tag from './components/Tag.svelte';
  import { Icon } from 'svelte-awesome';
  import { envelopeO, github, instagram } from 'svelte-awesome/icons';
  import Photo from './components/Photo.svelte';
  import config from './../public/config.json';
  import { onMount } from 'svelte';
  import Place from './components/Place.svelte';
  import Contact from './components/Contact.svelte';

  document.title = `${config.siteTitle} - ${config.siteSubtitle}`;

  export let url = '';

  // eslint-disable-next-line max-len
  if ( !sessionStorage.getItem( '_swa' ) && document.referrer.indexOf( location.protocol + '//' + location.host ) !== 0 ) {
    fetch( 'https://counter.dev/track?' + new URLSearchParams( {
      referrer: document.referrer,
      screen: screen.width + 'x' + screen.height,
      user: 'adimoldovan',
      utcoffset: '3'
    } ) );
  }
  sessionStorage.setItem( '_swa', '1' );

  const allPhotoIds = photos.map( p => p.id );
  document.addEventListener( 'keydown', function ( event ) {
    if ( event.key === 'r' && !location.pathname.includes( 'contact' ) ) {
      const randomIdx = Math.floor( ( Math.random() * allPhotoIds.length ) );
      location.assign( `${location.origin}/photo#lightbox-${allPhotoIds[randomIdx]}` );
    }

    if ( event.key === 'h' && !location.pathname.includes( 'contact' ) ) {
      location.assign( location.origin );
    }
  } );

  onMount( async () => {
    const goTopBtn = document.getElementById( 'go-top' );
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if ( document.body.scrollTop > 200 || document.documentElement.scrollTop > 200 ) {
        goTopBtn.style.display = 'block';
      } else {
        goTopBtn.style.display = 'none';
      }
    }
  } );


  function goTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

</script>

<main class="main">
    <Router {url}>
        <div class="header">
            <h1 class="site-title">
                <Link to="/">{config.siteTitle}</Link>
            </h1>
            <div class="site-subtitle">{config.siteSubtitle}</div>
            <div class="contact-header">
                <a href="{config.social.instagram}" target="_blank">
                    <Icon scale="1.5" data={instagram}/>
                </a>
                <a href="contact">
                    <Icon scale="1.47" data={envelopeO}/>
                </a>
            </div>
        </div>
        <div>
            <Route path="album/:name" component={Album}/>
            <Route path="tag/:name" component={Tag}/>
            <Route path="place/:name" component={Place}/>
            <Route path="photo" component={Photo}/>
            <Route path="contact" component={Contact}/>
            <Route path="/" component={Home}/>
        </div>
        <div class="footer">
            <div class="keys-help">
                <div><span class="key">R</span><br>random photo</div>
                <div><span class="key">H</span><br>home page</div>
                <div><span class="key">&rarr;</span><br>next photo</div>
                <div><span class="key">&larr;</span><br>previous photo</div>
                <div><span class="key">ESC</span><br>exit slideshow</div>
            </div>
        </div>
        <div class="footer-source">
            <a href="{config.gitUrl}" target="_blank">
                <Icon data={github}/>
            </a>
        </div>
    </Router>
    <button id="go-top" on:click={goTop}>&uarr;</button>
</main>
