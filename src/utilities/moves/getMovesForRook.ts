import { getNextLetter } from '../getNextLetter'
import { getPreviousLetter } from '../getPreviousLetter'

interface RequiredContext {
  board: Chess.Board
  file: number
  rank: string
  player: Chess.Color
}

// TODO: can we just get all squares on each file and rank for the rook then loop through them incrementally and decrementally?
const getMovesForRook = (requiredContext: RequiredContext) => {
  const { board, file, rank, player } = requiredContext
  const availableLocations = new Set<string>()

  // Get right hand movements
  let currentRankRight = rank
  for (let i = 0; i < 8; i++) {
    // Work out contents of next square in rank to the right
    const nextRankRight = getNextLetter(currentRankRight)
    const newLocation = nextRankRight + file
    currentRankRight = nextRankRight
    const squareWithPiece = board.find(
      (square) => square.piece && square.location === newLocation
    )

    // Rooks can move horizontally until they find a piece
    if (!squareWithPiece) {
      availableLocations.add(newLocation)
    }

    // If they find a piece
    if (squareWithPiece) {
      // And if the piece is an enemy piece
      if (squareWithPiece.piece.color !== player) {
        // Let them take it
        availableLocations.add(newLocation)
      }

      // As they can't keep going through a take, break the loop here
      break
    }
  }

  // Get left hand movements
  let currentRankLeft = rank
  for (let i = 0; i < 8; i++) {
    const nextRankLeft = getPreviousLetter(currentRankLeft)
    const newLocation = nextRankLeft + file
    currentRankLeft = nextRankLeft
    const squareWithPiece = board.find(
      (square) => square.piece && square.location === newLocation
    )

    if (!squareWithPiece) {
      availableLocations.add(newLocation)
    }

    if (squareWithPiece) {
      if (squareWithPiece.piece.color !== player) {
        availableLocations.add(newLocation)
      }

      break
    }
  }

  // Get upward movements
  let currentFileUpward = file
  for (let i = 0; i < 8; i++) {
    const nextFileUpward = currentFileUpward + 1
    currentFileUpward = nextFileUpward

    if (nextFileUpward > 8) {
      break
    }

    const newLocation = rank + nextFileUpward
    const squareWithPiece = board.find(
      (square) => square.piece && square.location === newLocation
    )

    if (!squareWithPiece) {
      availableLocations.add(newLocation)
    }

    if (squareWithPiece) {
      if (squareWithPiece.piece.color !== player) {
        availableLocations.add(newLocation)
      }

      break
    }
  }

  // Get downward movements
  let currentFileDownward = file
  for (let i = 0; i < 8; i++) {
    const nextFileDownward = currentFileDownward - 1
    currentFileDownward = nextFileDownward

    if (nextFileDownward <= 0) {
      break
    }

    const newLocation = rank + nextFileDownward
    const squareWithPiece = board.find(
      (square) => square.piece && square.location === newLocation
    )

    if (!squareWithPiece) {
      availableLocations.add(newLocation)
    }

    if (squareWithPiece) {
      if (squareWithPiece.piece.color !== player) {
        availableLocations.add(newLocation)
      }

      break
    }
  }

  return availableLocations
}

export { getMovesForRook }
