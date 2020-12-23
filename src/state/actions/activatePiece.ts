const activatePiece = (context: Chess.Context, event: Chess.Event) => {
  if (event.type === 'SELECT_PIECE') {
    context.board.forEach(square => {
      if (!square.piece) {
        return
      }

      if (square.piece.isActive) {
        square.piece.isActive = false
      } else {
        square.piece.isActive = square.location === event.squareLocation ? true : false
      }
    })

    return { board: context.board }
  }
}

export { activatePiece }