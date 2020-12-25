<script lang="ts">
  import Square from "./square/square.svelte";
  import { useMachine } from "xstate-svelte";
  import { machine } from "../state/machine";
  import { handleSquareClick } from "../utilities/handleSquareClick";

  // Get our state and event sender func from the state machine
  const { state, send } = useMachine(machine, { devTools: true });

  const handleClick = (sqaure: Chess.Square) => {
    // Function used to send events to state machine (redefined for ease of typing)
    const sendFunc = (event: Chess.Event) => send(event);
    const { board, player } = $state.context;
    handleSquareClick(sqaure, board, player, sendFunc);
  };
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
        player={$state.context.player}
        {square} />
    {/each}
  {/if}
</div>
<h3>
  <!-- Capitalise the player color 🤷‍♂️ -->
  {`${$state.context.player[0].toUpperCase()}${$state.context.player.substring(1)}'s turn`}
</h3>
