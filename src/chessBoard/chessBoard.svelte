<script lang="ts">
  import Square from "./square/square.svelte";
  import { useMachine } from "xstate-svelte";
  import { machine } from "../state/machine";

  const { state, send } = useMachine(machine, { devTools: true });

  const handleClick = (sqaure: Chess.Square) => {
    const clickedPiece = sqaure.piece;
    const alreadyActiveSquare = $state.context.board.find(
      (square) => square.piece?.isActive
    );

    // They've just clicked a piece on the board
    if (clickedPiece) {
      // There is already an active piece on the board
      if (alreadyActiveSquare) {
        if (sqaure.location === alreadyActiveSquare.location) {
          // They just clicked their own active piece, so we deselect it
          send({ type: "SELECT_PIECE", squareLocation: sqaure.location });
        } else {
          // Else they must have clicked an enemy piece so we try attack it
          const isViableTake = alreadyActiveSquare.piece.availableMoves.some(
            (possibleMove) => possibleMove.location === sqaure.location
          );

          // But only allow viable takes
          if (isViableTake) {
            send({ type: "MOVE", newLocation: sqaure.location });
          }
        }
      }

      // They haven't got an activated piece
      if (!alreadyActiveSquare) {
        // And they're clicking one of their own pieces
        if (clickedPiece.color === $state.context.player) {
          // So let's activate it for them
          send({ type: "SELECT_PIECE", squareLocation: sqaure.location });
        }
      }
    }

    // They've just clicked an empty square
    if (!clickedPiece) {
      // And they currently have an active piece
      if (alreadyActiveSquare) {
        // So we try make the move
        const isViableMove = alreadyActiveSquare.piece.availableMoves.some(
          (possibleMove) => possibleMove.location === sqaure.location
        );

        // But only make viable moves
        if (isViableMove) {
          send({ type: "MOVE", newLocation: sqaure.location });
        }
      }
    }
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
<h3>Current player: {$state.context.player}</h3>
