import { getMovesForBishop } from "./moves/getMovesForBishop"
import { getMovesForKing } from "./moves/getMovesForKing"
import { getMovesForKnight } from "./moves/getMovesForKnight"
import { getMovesForPawn } from "./moves/getMovesForPawn"
import { getMovesForQueen } from "./moves/getMovesForQueen"
import { getMovesForRook } from "./moves/getMovesForRook"

const getAvailableMovesForPiece = (square: Chess.Square, board: Chess.Board, player: Chess.Color): Chess.Square[] => {
  const { piece, location } = square
  const splitLocation = location.split('')
  const isWhitePiece = piece.color === 'white'
  const file = Number(splitLocation[1])
  const rank = splitLocation[0]
  let availableLocations = new Set<string>()

  // Pawns
  if (piece.type === 'pawn') {
    const movesForPawn = getMovesForPawn({ board, isWhitePiece, location, file, rank, player })
    availableLocations = new Set<string>([...availableLocations, ...movesForPawn])
  }

  // Rooks
  if (piece.type === 'rook') {
    const movesForRook = getMovesForRook({ board, isWhitePiece, location, file, rank, player })
    availableLocations = new Set<string>([...availableLocations, ...movesForRook])
  }

  // Knights
  if (piece.type === 'knight') {
    const movesForKnight = getMovesForKnight({ board, isWhitePiece, location, file, rank, player })
    availableLocations = new Set<string>([...availableLocations, ...movesForKnight])
  }

  // Bishops
  if (piece.type === 'bishop') {
    const movesForBishop = getMovesForBishop({ board, isWhitePiece, location, file, rank, player })
    availableLocations = new Set<string>([...availableLocations, ...movesForBishop])
  }

  // Queens
  if (piece.type === 'queen') {
    const movesForQueen = getMovesForQueen({ board, isWhitePiece, location, file, rank, player })
    availableLocations = new Set<string>([...availableLocations, ...movesForQueen])
  }

  // Now we return a subset of the board which represent available moves for that piece
  return board.filter(square => availableLocations.has(square.location))
}

const getAvailableMoves = (board: Chess.Board, player: Chess.Color): Chess.Board => {
  // TODO: make it so we can only move king if king is threatened
  
  // First we grab the moves for all non-king units and add them to the board
  const boardWithNonKingMoves = board.map(square => {
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

  // Then we add in the king moves.
  // We do this after adding non-king moves as kings need to know which squares are threatened.
  const finalBoard = boardWithNonKingMoves.map(square => {
    if (!square.piece || square.piece.type !== 'king') {
      return square
    }

    const { location } = square
    return {
      ...square,
      piece: {
        ...square.piece,
        availableMoves: getMovesForKing({ boardWithNonKingMoves, player, location })
      }
    }
  })

  return finalBoard
}

export { getAvailableMoves }
