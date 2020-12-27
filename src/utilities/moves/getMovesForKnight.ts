import { getNextLetter } from '../getNextLetter'
import { getPreviousLetter } from '../getPreviousLetter'

interface RequiredContext {
  board: Chess.Board
  file: number
  rank: string
  player: Chess.Color
}

const getMovesForKnight = (requiredContext: RequiredContext) => {
  const { board, file, rank, player } = requiredContext
  const availableLocations = new Set<string>()

  // Grab some common co-ordinates
  const newHorizontalFileUp = file + 1
  const newHorizontalFileDown = file - 1
  const newVerticalRankLeft = getNextLetter(rank)
  const newVerticalRankRight = getPreviousLetter(rank)

  // Get right hand movements
  const newRightRank = getNextLetter(getNextLetter(rank))
  const possibleRightPositions = [
    newRightRank + newHorizontalFileUp,
    newRightRank + newHorizontalFileDown,
  ]

  // Get left hand movements
  const newLeftRank = getPreviousLetter(getPreviousLetter(rank))
  const possibleLeftPositions = [
    newLeftRank + newHorizontalFileUp,
    newLeftRank + newHorizontalFileDown,
  ]

  // Get upward movements
  const newUpwardFile = file + 2
  const possibleUpwardLocations = [
    newVerticalRankRight + newUpwardFile,
    newVerticalRankLeft + newUpwardFile,
  ]

  // Get downward movements
  const newDownwardFile = file - 2
  const possibleDownwardLocations = [
    newVerticalRankRight + newDownwardFile,
    newVerticalRankLeft + newDownwardFile,
  ]

  const allPossibleLocations = [
    ...possibleRightPositions,
    ...possibleLeftPositions,
    ...possibleUpwardLocations,
    ...possibleDownwardLocations,
  ]

  // Figure out final, vetted locations
  allPossibleLocations.forEach((location) => {
    const correspondingSquare = board.find(
      (square) => square.location === location
    )

    // We can't think outside the box in chess
    if (!correspondingSquare) {
      return
    }

    const isEmptyLocation = !correspondingSquare.piece

    if (isEmptyLocation) {
      availableLocations.add(location)
    } else {
      const isAttacking = correspondingSquare.piece.color !== player

      if (isAttacking) {
        availableLocations.add(location)
      }
    }
  })

  return availableLocations
}

export { getMovesForKnight }
