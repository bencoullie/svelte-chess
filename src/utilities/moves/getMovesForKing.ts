import { locations } from "../createChessBoard"
import { getNextLetter } from "../getNextLetter"
import { getPreviousLetter } from "../getPreviousLetter"

interface RequiredContext {
  // NOTE: this is the board with all other pieces' available moves already added
  // We need to do this so the kings know which squares are threatened
  boardWithNonKingMoves: Chess.Board, 
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
  const proposedMoves = [newRightLocation, newLeftLocation, newTopLocation, newBottomLocation, newTopLeftDiagonalLocation, newTopRightDiagonalLocation, newBottomLeftDiagonalLocation, newBottomRightDiagonalLocation] as Chess.Location[]
  const boundMoves = proposedMoves.filter(move => locations.includes(move))

  return boundMoves
}

const getMovesForKing = (requiredContext: RequiredContext) => {
  const { boardWithNonKingMoves, location, player } = requiredContext
  const rank = location[0]
  const file = Number(location[1])
  const availableLocations = new Set<string>()

  // Determine possible locations
  const boundMovesForPlayersKing = getBoundMovesForKing(rank, file)

  // Determine threatened locations
  const allThreatenedLocations = new Set<string>()
  boardWithNonKingMoves.forEach(square => {
    if (!square.piece) {
      return
    }

    if (square.piece.color === player) {
      return
    }

    // Add opposing king's moves to threatened locations
    const isKing = square.piece.type === 'king'
    if (isKing) {
      const rankForOpposingKing = square.location[0]
      const fileForOpposingKing = Number(square.location[1])
      const boundMovesForOpposingKing = getBoundMovesForKing(rankForOpposingKing, fileForOpposingKing)
      
      boundMovesForOpposingKing.forEach(move => allThreatenedLocations.add(move))
    }

    // Add opposing pawns attack moves to threatened locations
    const isPawn = square.piece.type === 'pawn'
    if (isPawn) {
      const squaresFile = Number(square.location[1])
      const singleFileChange = square.piece.color === 'white' ? squaresFile + 1 : squaresFile - 1
      const rightOption = getNextLetter(square.location[0]) + singleFileChange
      const leftOption = getPreviousLetter(square.location[0]) + singleFileChange

      allThreatenedLocations.add(rightOption)
      allThreatenedLocations.add(leftOption)
    }

    // For all other enemy pieces, add their available moves to threatened locations
    if (!isKing && !isPawn) {
      square.piece.availableMoves.forEach(move => allThreatenedLocations.add(move.location))
    }
  })

  // Vet those locations and add safe moves to available locations set
  boundMovesForPlayersKing.forEach(newLocation => {
    const correspondingSquare = boardWithNonKingMoves.find(square => square.location === newLocation)

    // Can't move onto another of your own pieces
    if (correspondingSquare.piece?.color === player) {
      return
    }

    // Can't move into threatened squares
    const isThreatenedLocation = allThreatenedLocations.has(newLocation)
    if (isThreatenedLocation) {
      return
    }
    
    availableLocations.add(newLocation)
  })

  return boardWithNonKingMoves.filter(square => availableLocations.has(square.location))
}

export { getMovesForKing }