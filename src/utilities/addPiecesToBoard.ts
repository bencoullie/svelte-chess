const addPiecesToBoard = (board: Board): Board => {
  const boardWithPieces = board.map(square => {
    // Pawns
    const isBlackPawnStartingLocation = square.location.includes('7')
    const isWhitePawnStartingLocation = square.location.includes('2')

    if (isBlackPawnStartingLocation || isWhitePawnStartingLocation) {
      const piece: Piece = {
        type: 'pawn',
        color: isBlackPawnStartingLocation ? 'black' : 'white'
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
