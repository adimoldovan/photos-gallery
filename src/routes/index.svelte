<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Album from '../components/Album.svelte';
  import Home from '../components/Home.svelte';
  import Tag from '../components/Tag.svelte';

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
        <Route path="/" component={Home} />
    </div>
</Router>
