const movePiece = (context: Chess.Context, event: Chess.Event) => {
  if (event.type === 'MOVE') {
    const { newLocation } = event
    const currentlyActiveSquare = context.board.find(square => square.piece?.isActive)
    const destinationSquare = context.board.find(square => square.location === newLocation)

    // Add piece to destination square
    destinationSquare.piece = currentlyActiveSquare.piece

    // Remove active state from moved piece
    destinationSquare.piece.isActive = false

    // Remove piece from active square
    delete currentlyActiveSquare.piece

    return { board: context.board }
  }
}

export { movePiece }