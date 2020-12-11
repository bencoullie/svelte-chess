import { getNextLetter } from "../getNextLetter"
import { getPreviousLetter } from "../getPreviousLetter"

interface RequiredContext {
  board: Chess.Board, 
  availableLocations: Set<string>, 
  isWhitePiece: boolean, 
  location: Chess.Location, 
  file: number, 
  rank: string,
  player: Chess.Color
}

const getMovesForPawn = (requiredContext: RequiredContext) => {
  const { board, availableLocations, isWhitePiece, location, file, rank, player } = requiredContext

  // Pawn moving rules
  const isStartingPosition = isWhitePiece ? 
  location.includes('2') : 
  location.includes('7')
  const singleFileChange = isWhitePiece ? file + 1 : file - 1
  const singleStepLocation = location.slice(0, -1) + singleFileChange
  const isSingleStepOccupied = Boolean(board.find(square => square.location === singleStepLocation).piece)

  if (!isSingleStepOccupied) {
    availableLocations.add(singleStepLocation)
  }

  if (isStartingPosition) {
    const doubleFileChange = isWhitePiece ? file + 2 : file - 2
    const doubleStepLocation = location.slice(0, -1) + doubleFileChange
    const isOccupied = Boolean(board.find(square => square.location === doubleStepLocation).piece)

    if (!isSingleStepOccupied && !isOccupied) {
      availableLocations.add(doubleStepLocation)
    }
  }

  // pawn taking rules
  const rightOption = getNextLetter(rank) + singleFileChange
  const leftOption = getPreviousLetter(rank) + singleFileChange
  const rightOptionIsAGoBoi = board.some(square => square.location === rightOption && square.piece && square.piece.color !== player)
  const leftOptionIsAGoBoi = board.some(square => square.location === leftOption && square.piece && square.piece.color !== player)

  if (rightOptionIsAGoBoi) {
    availableLocations.add(rightOption)
  }

  if (leftOptionIsAGoBoi) {
    availableLocations.add(leftOption)
  }
}

export { getMovesForPawn }