<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Album from '../components/Album.svelte';
  import Home from '../components/Home.svelte';
  import Tag from '../components/Tag.svelte';
  import { Icon } from 'svelte-awesome';
  import { github } from 'svelte-awesome/icons';
  import Photo from '../components/Photo.svelte';

  export let url = '';
</script>

<Router {url}>
    <div class="header">
        <h1 class="site-title"><Link to="/">Adrian Moldovan</Link></h1>
        <div class="site-subtitle">Amateur playing with pro tools</div>
    </div>
    <div>
        <Route path="album/:name" component={Album} />
        <Route path="tag/:name" component={Tag} />
        <Route path="photo" component={Photo} />
        <Route path="/" component={Home} />
    </div>
    <div class="footer">
        <div class="keys-help">
            <span class="key">R</span> display a random photo
            <span class="key">H</span> navigate to home page
            <span class="key">&rarr;</span> next photo in slideshow
            <span class="key">&larr;</span> previous photo in slideshow
            <span class="key">ESC</span> exit slideshow
        </div>
        <a href="https://github.com/adimoldovan/flickr-gallery"><Icon data={github}/></a>
    </div>
</Router>
