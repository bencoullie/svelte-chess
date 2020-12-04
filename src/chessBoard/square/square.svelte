<script lang="ts">
  import type { Color } from '../../utilities/createBoard'
  import type { Location } from '../../utilities/createBoard'
  export let color: Color
  export let location: Location
</script>

<style>
  .white {
    background: white;
  }

  .black {
    background: #fcc9b9;
  }

  .location {
    position: relative;
    top: 75px;
  }
</style>

<div class={color}><span class="location">{location}</span></div>
