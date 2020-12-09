<script lang="ts">
  import { getBackgroundImage } from '../../utilities/getBackgroundImage'

  export let square: Chess.Square
  export let onClickCallback: (square: Chess.Square) => void

  const handleCLick = () => {
    onClickCallback(square)
  }

  const handleHoverOn = () => {
    if (!square.piece) {
      return
    }

    square.piece.availableMoves.forEach((move) => {
      const squareNode = document.querySelector(
        `[data-location="${move.location}"]`
      )

      squareNode.classList.add('highlighted')
    })
  }

  const handleHoverOff = () => {
    if (!square.piece) {
      return
    }

    square.piece.availableMoves.forEach((move) => {
      const squareNode = document.querySelector(
        `[data-location="${move.location}"]`
      )

      squareNode.classList.remove('highlighted')
    })
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
    left: 7px;
    color: #555;
  }

  .square {
    box-sizing: border-box;
    position: relative;
    width: 100px;
    height: 100px;
    background-position: center;
    background-size: contain;
  }

  .highlighted {
    opacity: 0.7;
  }

  .is-active {
    box-shadow: 0 0px 10px -3px black;
    z-index: 1;
  }
</style>

<div
  on:click={handleCLick}
  on:mouseenter={handleHoverOn}
  on:mouseleave={handleHoverOff}
  data-location={square.location}
  class={`square ${square.color} ${square.piece && square.piece.isActive && 'is-active'}`}
  style={square.piece && `background-image: url(${getBackgroundImage(square.piece)})`}>
  <div class="location">{square.location}</div>
</div>
