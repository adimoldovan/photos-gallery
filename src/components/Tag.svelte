<script>
  import Gallery from './Gallery.svelte';

  export let name;
  const photos = [];
</script>

<Gallery title="{name}" photos="{photos}"/>
