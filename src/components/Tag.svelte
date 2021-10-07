<script>
  import Gallery from './Gallery.svelte';

  export let name;
  import { tags } from '../../public/portfolio.json';
  const tag = tags.filter( tag => tag.tag === name )[0];
</script>

<Gallery title="#{tag.tag}" photoIds="{tag.photos}"/>
