const addPiecesToBoard = (board: Chess.Board): Chess.Board => {
  const boardWithPieces = board.map(square => {
    // Pawns
    const isBlackPawnStartingLocation = square.location.includes('7')
    const isWhitePawnStartingLocation = square.location.includes('2')

    if (isBlackPawnStartingLocation || isWhitePawnStartingLocation) {
      const piece: Chess.Piece = {
        type: 'pawn',
        color: isBlackPawnStartingLocation ? 'black' : 'white',
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
