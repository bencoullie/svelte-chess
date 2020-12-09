<script lang="ts">
  import Square from './square/square.svelte'
  import { useMachine } from 'xstate-svelte'
  import { machine } from '../state/machine'

  const { state, send } = useMachine(machine, { devTools: true })

  const handleClick = (sqaure: Chess.Square) => {
    if (sqaure.piece) {
      send({ type: 'SELECT_PIECE', squareLocation: sqaure.location })
    }
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
      <Square onClickCallback={handleClick} {square} />
    {/each}
  {/if}
</div>
<h3>Current player: {$state.context.player}</h3>
