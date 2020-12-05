<script lang="ts">
  import { getBackgroundImage } from '../../utilities/getBackgroundImage'
  export let color: Color
  export let location: SquareLocation
  export let piece: Piece | undefined

  const backgroundImage = piece ? getBackgroundImage(piece) : undefined
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
    top: 3px;
    left: -34px;
    width: 100%;
    color: #555;
  }

  .square {
    position: relative;
    width: 100px;
    height: 100px;
    background-position: center;
    background-size: contain;
  }
</style>

<div
  class={`square ${color}`}
  style={backgroundImage && `background-image: url(${backgroundImage})`}>
  <div class="location">{location}</div>
</div>
