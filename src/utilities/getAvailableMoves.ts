import { getMovesForBishop } from './moves/getMovesForBishop'
import { getMovesForKing } from './moves/getMovesForKing'
import { getMovesForKnight } from './moves/getMovesForKnight'
import { getMovesForPawn } from './moves/getMovesForPawn'
import { getMovesForQueen } from './moves/getMovesForQueen'
import { getMovesForRook } from './moves/getMovesForRook'

const getAvailableMovesForPiece = (
  square: Chess.Square,
  board: Chess.Board,
  player: Chess.Color
): Chess.Square[] => {
  const { piece, location } = square
  const splitLocation = location.split('')
  const isWhitePiece = piece.color === 'white'
  const file = Number(splitLocation[1])
  const rank = splitLocation[0]
  let availableLocations = new Set<string>()

  // Pawns
  if (piece.type === 'pawn') {
    const movesForPawn = getMovesForPawn({
      board,
      isWhitePiece,
      location,
      file,
      rank,
      player,
    })
    availableLocations = new Set<string>([
      ...availableLocations,
      ...movesForPawn,
    ])
  }

  // Rooks
  if (piece.type === 'rook') {
    const movesForRook = getMovesForRook({
      board,
      isWhitePiece,
      location,
      file,
      rank,
      player,
    })
    availableLocations = new Set<string>([
      ...availableLocations,
      ...movesForRook,
    ])
  }

  // Knights
  if (piece.type === 'knight') {
    const movesForKnight = getMovesForKnight({
      board,
      isWhitePiece,
      location,
      file,
      rank,
      player,
    })
    availableLocations = new Set<string>([
      ...availableLocations,
      ...movesForKnight,
    ])
  }

  // Bishops
  if (piece.type === 'bishop') {
    const movesForBishop = getMovesForBishop({
      board,
      isWhitePiece,
      location,
      file,
      rank,
      player,
    })
    availableLocations = new Set<string>([
      ...availableLocations,
      ...movesForBishop,
    ])
  }

  // Queens
  if (piece.type === 'queen') {
    const movesForQueen = getMovesForQueen({
      board,
      isWhitePiece,
      location,
      file,
      rank,
      player,
    })
    availableLocations = new Set<string>([
      ...availableLocations,
      ...movesForQueen,
    ])
  }

  // Kings
  if (piece.type === 'king') {
    const movesForKing = getMovesForKing({ board, player, location })
    availableLocations = new Set<string>([
      ...availableLocations,
      ...movesForKing,
    ])
  }

  // Now we return a subset of the board which represent available moves for that piece
  return board.filter((square) => availableLocations.has(square.location))
}

const getAvailableMoves = (
  board: Chess.Board,
  player: Chess.Color
): Chess.Board => {
  // Add all available moves to the board
  // MOTE: might include illegal moves - those will be handled by a state machine guard.
  const boardWithMoves = board.map((square) => {
    // Can't do shit without a piece mate
    if (!square.piece) {
      return square
    }

    return {
      ...square,
      piece: {
        ...square.piece,
        availableMoves: getAvailableMovesForPiece(square, board, player),
      },
    }
  })

  return boardWithMoves
}

export { getAvailableMoves, getAvailableMovesForPiece }
