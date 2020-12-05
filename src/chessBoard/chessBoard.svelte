<script lang="ts">
  import Square from './square/square.svelte'
  import { useMachine } from 'xstate-svelte'
  import { machine } from '../state/machine'
  import { getAvailableMoves } from '../utilities/getAvailableMoves'

  const { state, send } = useMachine(machine, { devTools: true })

  // Handle square click
  const handleClick = (sqaure: Chess.Square) => {
    const availableMoves = getAvailableMoves(sqaure, $state.context.player)

    if (availableMoves.length > 0) {
      send('MOVE')
    }

    // eslint-disable-next-line no-console
    console.log('availableMoves:', availableMoves)
  }
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
  {#if $state.matches('setup')}
    <span>Setting up the board...</span>
  {:else if $state.matches('play')}
    {#each $state.context.board as square}
      <Square
        onClickCallback={handleClick}
        color={square.color}
        location={square.location}
        piece={square.piece} />
    {/each}
  {/if}
</div>
