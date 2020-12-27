const movePiece = (context: Chess.Context, event: Chess.Event) => {
  if (event.type === 'MOVE') {
    const { newLocation } = event

    // TODO find all of these in a single loop?
    const currentlyActiveSquare = context.board.find(
      (square) => square.piece?.isActive
    )

    const destinationSquare = context.board.find(
      (square) => square.location === newLocation
    )

    // Get the previous en passant vulnerability (square)
    const previousEnPassant = context.board.find(
      (square) => square.enPassantPlayer
    )

    // We need to keep track of pawn double jumps for en passant reasons
    if (currentlyActiveSquare.piece.type === 'pawn') {
      // First, is it a double jump?
      const isDoubleJump =
        context.player === 'white'
          ? currentlyActiveSquare.location[1] === '2' &&
            destinationSquare.location[1] === '4'
          : currentlyActiveSquare.location[1] === '7' &&
            destinationSquare.location[1] === '5'

      // If it is
      if (isDoubleJump) {
        // Then what was the square we jumped?
        const enPassantJumpLocation =
          context.player === 'white'
            ? currentlyActiveSquare.location[0] + 3
            : currentlyActiveSquare.location[0] + 6

        const enPassantOpportunity = context.board.find(
          (square) => square.location === enPassantJumpLocation
        )

        // Then, as there is a new en passant opportunity, we tell the jumped square it is vulnerable
        enPassantOpportunity.enPassantPlayer = context.player

        // And set the moved piece as, itself, vulnerable
        currentlyActiveSquare.piece.isVulnerableToEnPassant = true
      }
    }

    // Add piece to destination square
    destinationSquare.piece = currentlyActiveSquare.piece

    // Remove active state from moved piece
    destinationSquare.piece.isActive = false

    // Remove piece from active square
    delete currentlyActiveSquare.piece

    // We need to keep track of king and rook movements for castling reasons
    if (
      destinationSquare.piece?.type === 'king' ||
      destinationSquare.piece?.type === 'rook'
    ) {
      destinationSquare.piece.hasMoved = true
    }

    // And finally check to see if the move is actually an en passant attack
    const isEnPassantAttack = destinationSquare.enPassantPlayer
    if (isEnPassantAttack) {
      // if it is we delete the attacked piece
      const squareToEmpty = context.board.find(
        (square) => square.piece?.isVulnerableToEnPassant
      )
      delete squareToEmpty.piece
    }

    // Remove any previous en passant opportunities
    // (you can only en passant immediately after double jump)
    if (previousEnPassant) {
      // Remove jumped square state
      delete previousEnPassant.enPassantPlayer

      // Get the previous en passant vulnerability (pawn square)
      // We have to do this here as the piece might have been taken
      const vulnerablePiece = context.board.find(
        (square) => square.piece?.isVulnerableToEnPassant
      )

      // If we find a vulnerable piece (i.e. it hasn't been taken yet)
      if (vulnerablePiece) {
        // Remove that vulnerability
        delete vulnerablePiece.piece.isVulnerableToEnPassant
      }
    }

    return { board: context.board }
  }
}

export { movePiece }
