import { locations } from '../createEmptyChessBoard'
import { getNextLetter } from '../getNextLetter'
import { getPreviousLetter } from '../getPreviousLetter'

interface RequiredContext {
  // NOTE: this is the board with all other pieces' available moves already added
  // We need to do this so the kings know which squares are threatened
  board: Chess.Board
  location: Chess.Location
  player: Chess.Color
}

const getBoundMovesForKing = (rank: string, file: number) => {
  const newRightLocation = getNextLetter(rank) + file
  const newLeftLocation = getPreviousLetter(rank) + file
  const newTopLocation = rank + (file + 1)
  const newBottomLocation = rank + (file - 1)
  const newTopLeftDiagonalLocation = getPreviousLetter(rank) + (file + 1)
  const newTopRightDiagonalLocation = getNextLetter(rank) + (file + 1)
  const newBottomLeftDiagonalLocation = getPreviousLetter(rank) + (file - 1)
  const newBottomRightDiagonalLocation = getNextLetter(rank) + (file - 1)
  const proposedMoves = [
    newRightLocation,
    newLeftLocation,
    newTopLocation,
    newBottomLocation,
    newTopLeftDiagonalLocation,
    newTopRightDiagonalLocation,
    newBottomLeftDiagonalLocation,
    newBottomRightDiagonalLocation,
  ] as Chess.Location[]
  const boundMoves = proposedMoves.filter((move) => locations.includes(move))

  return boundMoves
}

// NOTE: Includes illegal moves, those are handled by a state machine guard.
const getMovesForKing = (requiredContext: RequiredContext) => {
  const { board, location, player } = requiredContext
  const rank = location[0]
  const file = Number(location[1])
  const availableLocations = new Set<string>()

  // Get all potentially possible locations
  const boundMovesForPlayersKing = getBoundMovesForKing(rank, file)

  // Vet those locations (i.e. disallow moves onto squares with allied pieces on them)
  boundMovesForPlayersKing.forEach((newLocation) => {
    const correspondingSquare = board.find(
      (square) => square.location === newLocation
    )

    // Can't move onto another of your own pieces
    if (correspondingSquare.piece?.color === player) {
      return
    }

    availableLocations.add(newLocation)
  })

  return availableLocations
}

export { getMovesForKing }
