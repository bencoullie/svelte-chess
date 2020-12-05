<script lang="ts">
  import { getBackgroundImage } from '../../utilities/getBackgroundImage'

  export let color: Chess.Color
  export let location: Chess.Location
  export let piece: Chess.Piece | undefined
  export let onClickCallback: (square: Chess.Square) => void

  const backgroundImage = piece ? getBackgroundImage(piece) : undefined
  const handleCLick = () => {
    onClickCallback({ color, location, piece })
  }
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
  on:click={handleCLick}
  class={`square ${color}`}
  style={backgroundImage && `background-image: url(${backgroundImage})`}>
  <div class="location">{location}</div>
</div>
