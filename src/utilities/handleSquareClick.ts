import type { State } from 'xstate'

// Copy pasta typing bois
type sendFunc = (
  event: Chess.Event
) => State<
  Chess.Context,
  Chess.Event,
  any,
  {
    value: any
    context: Chess.Context
  }
>

const handleSquareClick = (
  square: Chess.Square,
  board: Chess.Board,
  player: Chess.Color,
  send: sendFunc
) => {
  const clickedPiece = square.piece
  const alreadyActiveSquare = board.find((square) => square.piece?.isActive)

  // They've just clicked a piece on the board
  if (clickedPiece) {
    // There is already an active piece on the board
    if (alreadyActiveSquare) {
      if (square.location === alreadyActiveSquare.location) {
        // They just clicked their own active piece, so we deselect it
        send({ type: 'SELECT_PIECE', squareLocation: square.location })
      } else {
        // They've clicked another of their pieces
        if (clickedPiece.color === player) {
          const isKingActive = alreadyActiveSquare.piece.type === 'king'
          const hasClickedRook = square.piece.type === 'rook'
          const tryingToCastle = isKingActive && hasClickedRook

          if (tryingToCastle) {
            // TODO: Handle castling
            console.log('trying to castle!')
          } else {
            // If they're not trying to castle we select the clicked allied piece
            send({ type: 'SELECT_PIECE', squareLocation: square.location })
          }
        } else {
          // Else they must have clicked an enemy piece so we try attack it
          const isViableTake = alreadyActiveSquare.piece.availableMoves.some(
            (possibleMove) => possibleMove.location === square.location
          )

          // But only allow viable takes
          if (isViableTake) {
            send({ type: 'MOVE', newLocation: square.location })
          }
        }
      }
    }

    // They haven't got an activated piece
    if (!alreadyActiveSquare) {
      // And they're clicking one of their own pieces
      if (clickedPiece.color === player) {
        // So let's activate it for them
        send({ type: 'SELECT_PIECE', squareLocation: square.location })
      }
    }
  }

  // They've just clicked an empty square
  if (!clickedPiece) {
    // And they currently have an active piece
    if (alreadyActiveSquare) {
      // So we see if we can make the move
      const isViableMove = alreadyActiveSquare.piece.availableMoves.some(
        (possibleMove) => possibleMove.location === square.location
      )

      // But only make viable moves
      if (isViableMove) {
        send({ type: 'MOVE', newLocation: square.location })
      }
    }
  }
}

export { handleSquareClick }
