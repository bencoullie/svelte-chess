<script lang="ts">
  import Square from "./square/square.svelte";
  import Button from "./button/button.svelte";
  import { useMachine } from "xstate-svelte";
  import { machine } from "../state/machine";
  import { handleSquareClick } from "../utilities/handleSquareClick";
  import { afterUpdate } from "svelte";
  import { getContext } from "svelte";
  import CheckmateModal from "../modals/checkmateModal.svelte";

  // Get our state and event sender func from the state machine
  const { state, send } = useMachine(machine, { devTools: true });

  // Handle the square click
  const onSquareClick = (sqaure: Chess.Square) => {
    // Function used to send events to state machine (redefined for ease of typing)
    const sendFunc = (event: Chess.Event) => send(event);
    const { board, player } = $state.context;
    handleSquareClick(sqaure, board, player, sendFunc);
  };

  // Reset the board state
  const handlePlayAgain = () => {
    send({ type: "PLAY_AGAIN" });
  };

  // Enable checkmate modal
  const { open } = getContext("simple-modal");
  const showCheckmate = () => {
    open(CheckmateModal, { message: "got em bois" });
  };

  // If checkmate has been found, transition the state to game over
  afterUpdate(() => {
    if ($state.context.isCheckmate) {
      // We use a timeout here to allow for the final move to be displayed
      // It takes a bit to load the BG image
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log("$state.value:", $state.value);
        console.log("$state.context:", $state.context);

        if ($state.value !== "gameOver") {
          // Display checkmate modal
          showCheckmate();
        }

        // Transition to game over state
        send({ type: "CHECKMATE" });
      }, 100);
    }
  });
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
  {#if !$state.matches('setup')}
    {#each $state.context.board as square}
      <Square
        onClickCallback={onSquareClick}
        player={$state.context.player}
        {square} />
    {/each}
  {:else}<span>Setting up the board...</span>{/if}
</div>

<!-- Indicate whose turn it is -->
{#if $state.matches('play')}
  <h3>
    <!-- Capitalise the player color 🤷‍♂️ -->
    {`${$state.context.player[0].toUpperCase()}${$state.context.player.substring(1)}'s turn`}
  </h3>
{/if}

<!-- Allow player to reset board -->
{#if $state.matches('gameOver')}
  <Button callback={handlePlayAgain} text={'Play again'} />
{/if}
