import { getMovesForBishop } from './getMovesForBishop'
import { getMovesForRook } from './getMovesForRook'

interface RequiredContext {
  board: Chess.Board
  location: Chess.Location
  file: number
  rank: string
  player: Chess.Color
}

const getMovesForQueen = (requiredContext: RequiredContext) => {
  const diagonals = getMovesForBishop(requiredContext)
  const ranksAndFiles = getMovesForRook(requiredContext)
  const availableLocations = new Set<string>([...diagonals, ...ranksAndFiles])

  return availableLocations
}

export { getMovesForQueen }
