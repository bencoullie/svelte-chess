const movePiece = (context: Chess.Context, event: Chess.Event) => {
  if (event.type === 'MOVE') {
    const { newLocation } = event

    const currentlyActiveSquare = context.board.find(
      (square) => square.piece?.isActive
    )

    const destinationSquare = context.board.find(
      (square) => square.location === newLocation
    )

    // Add piece to destination square
    destinationSquare.piece = currentlyActiveSquare.piece

    // Remove active state from moved piece
    destinationSquare.piece.isActive = false

    // Remove piece from active square
    delete currentlyActiveSquare.piece

    // We need to keep track of king and rook movements for castling reasons
    if (
      destinationSquare.piece.type === 'king' ||
      destinationSquare.piece.type === 'rook'
    ) {
      destinationSquare.piece.hasMoved = true
    }

    return { board: context.board }
  }
}

export { movePiece }
