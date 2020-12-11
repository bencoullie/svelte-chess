const addPiecesToBoard = (board: Chess.Board): Chess.Board => {
  const boardWithPieces = board.map(square => {
    // Pawns
    const isWhitePawnStartingLocation = square.location.includes('2')
    const isBlackPawnStartingLocation = square.location.includes('7')

    if (isWhitePawnStartingLocation || isBlackPawnStartingLocation) {
      const piece: Chess.Piece = {
        type: 'pawn',
        color: isWhitePawnStartingLocation ? 'white' : 'black',
        availableMoves: [],
        isActive: false
      }

      return {
        ...square,
        piece,
      }
    }

    // Rooks
    const isWhiteRookStartingLocation = square.location === 'a1' || square.location === 'h1'
    const isBlackRookStartingLocation = square.location === 'a8' || square.location === 'h8'

    if (isWhiteRookStartingLocation || isBlackRookStartingLocation) {
      const piece: Chess.Piece = {
        type: 'rook',
        color: isWhiteRookStartingLocation ? 'white' : 'black',
        availableMoves: [],
        isActive: false
      }

      return {
        ...square,
        piece,
      }
    }
    
    return square
  })

  return boardWithPieces
}

export { addPiecesToBoard }
