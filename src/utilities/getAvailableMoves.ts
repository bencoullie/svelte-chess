const getAvailableMoves = (square: Square, player: Color): Moves => {
  const { piece, location } = square

  // Can't do shit without a piece mate
  if (!piece) {
    return []
  }

  // Can't move the other player's pieces... that would be too easy
  if (piece.color !== player) {
    return []
  }

  const splitLocation = location.split('')
  // const rank = splitLocation[0]
  const file = Number(splitLocation[1])

  // Pawns
  if (piece.type === 'pawn') {
    if (piece.color === 'white') {
      const isStartingPosition = location.includes('2')

      if (isStartingPosition) {
        const singleStep = location.slice(0, -1) + (file + 1) as Location
        const doubleStep = location.slice(0, -1) + (file + 2) as Location
        return [singleStep, doubleStep]
      } else {
        const singleStep = location.slice(0, -1) + (file + 1) as Location
        return [singleStep]
      }
    }

    if (piece.color === 'black') {
      const isStartingPosition = location.includes('7')

      if (isStartingPosition) {
        const singleStep = location.slice(0, -1) + (file - 1) as Location
        const doubleStep = location.slice(0, -1) + (file - 2) as Location
        return [singleStep, doubleStep]
      } else {
        const singleStep = location.slice(0, -1) + (file - 1) as Location
        return [singleStep]
      }
    }
  }
}

export { getAvailableMoves }