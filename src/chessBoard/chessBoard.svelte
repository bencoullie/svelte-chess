<script lang="ts">
  import Square from './square/square.svelte'
  import { createChessBoard } from '../utilities/createBoard'
  import { addPiecesToBoard } from '../utilities/addPiecesToBoard'
  const board = createChessBoard()
  const boardWithPieces = addPiecesToBoard(board)
</script>

<style>
  .chess-board {
    width: 800px;
    height: 800px;
    background: grey;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    box-shadow: 0 0px 15px -11px black;
  }
</style>

<div class="chess-board">
  {#each boardWithPieces as square}
    <Square color={square.color} location={square.location} />
  {/each}
</div>
