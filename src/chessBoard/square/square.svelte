<script lang="ts">
  export let color: Color
  export let location: SquareLocation
  export let piece: Piece | undefined
</script>

<style>
  .white {
    background: white;
  }

  .black {
    background: #fcc9b9;
  }

  .location {
    position: absolute;
    top: 75px;
    width: 100%;
  }

  .square {
    position: relative;
    width: 100px;
    height: 100px;
  }
</style>

<div class={`square ${color}`}>
  {#if piece}<span> {piece.type} </span>{/if}
  <div class="location">{location}</div>
</div>
