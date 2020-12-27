const castle = (context: Chess.Context, event: Chess.Event) => {
  if (event.type === 'CASTLE') {
    const { rookLocation } = event

    // Locations before castling begins
    const originalKingSquare = context.board.find(
      (square) => square.piece?.isActive
    )
    const originalRookSquare = context.board.find(
      (square) => square.location === rookLocation
    )

    // Determine new positions
    let newKingSquare: Chess.Square
    let newRookSquare: Chess.Square

    // White castling left
    if (rookLocation === 'a1') {
      newKingSquare = context.board.find((square) => square.location === 'c1')
      newRookSquare = context.board.find((square) => square.location === 'd1')
    }

    // White castling right
    if (rookLocation === 'h1') {
      newKingSquare = context.board.find((square) => square.location === 'g1')
      newRookSquare = context.board.find((square) => square.location === 'f1')
    }

    // Black castling left
    if (rookLocation === 'a8') {
      newKingSquare = context.board.find((square) => square.location === 'c8')
      newRookSquare = context.board.find((square) => square.location === 'd8')
    }

    // White castling right
    if (rookLocation === 'h8') {
      newKingSquare = context.board.find((square) => square.location === 'g8')
      newRookSquare = context.board.find((square) => square.location === 'f8')
    }

    // Add pieces to new squares
    newKingSquare.piece = originalKingSquare.piece
    newRookSquare.piece = originalRookSquare.piece

    // We need to keep track of king and rook movements for castling reasons
    // so they can't castle again.
    newKingSquare.piece.hasMoved = true
    newRookSquare.piece.hasMoved = true

    // Remove old pieces
    delete originalKingSquare.piece
    delete originalRookSquare.piece

    // Remove active state from king
    newKingSquare.piece.isActive = false

    return { board: context.board }
  }
}

export { castle }
