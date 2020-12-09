const getAvailableMovesForPiece = (square: Chess.Square, board: Chess.Board, player: Chess.Color): Chess.Square[] => {
  const { piece, location } = square

  // Can't move the other player's pieces... that would be too easy
  if (piece.color !== player) {
    return []
  }

  const availableLocations = []
  const splitLocation = location.split('')
  const isWhitePiece = piece.color === 'white'
  const file = Number(splitLocation[1])
  // const rank = splitLocation[0]

  // Pawns
  if (piece.type === 'pawn') {
    const isStartingPosition = isWhitePiece ? 
      location.includes('2') : 
      location.includes('7')

    const singleRankChange = isWhitePiece ? file + 1 : file - 1
    const singleStep = location.slice(0, -1) + singleRankChange
    availableLocations.push(singleStep)

    if (isStartingPosition) {
      const doubleRankChange = isWhitePiece ? file + 2 : file - 2
      const doubleStep = location.slice(0, -1) + doubleRankChange
      availableLocations.push(doubleStep)
    }
  }

  // Now we return a subset of the board which represent available moves for that piece
  return board.filter(square => availableLocations.includes(square.location))
}

const getAvailableMoves = (board: Chess.Board, player: Chess.Color): Chess.Board => {
  const newBoard = board.map(square => {
    // Can't do shit without a piece mate
    if (!square.piece) {
      return square
    }

    return {
      ...square,
      piece: {
        ...square.piece,
        availableMoves: getAvailableMovesForPiece(square, board, player)
      }
    }
  })

  return newBoard
}

export { getAvailableMoves }
