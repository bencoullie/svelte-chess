import cloneDeep from 'lodash.clonedeep'
import { alertBadMove } from '../../utilities/alertBadMove'
import { getAttackMovesForPawn } from '../../utilities/getAttackMovesForPawn'

const isLegalMove = (
  board: Chess.Board,
  player: Chess.Color,
  squaresThatMustBeEmpty: string[],
  squaresThatMustBeSafe: string[]
) => {
  // Now check to see if the path is clear
  const isPathBlocked = squaresThatMustBeEmpty.some((location) =>
    board.some((square) => square.location === location && square.piece)
  )

  if (isPathBlocked) {
    // If it's not, we can't castle so just explain why
    alertBadMove(`Unable to castle: the path is blocked.`)
    return false
  }

  // Now check to see if any of the key squares are under threat
  const allEnemyMoves = new Set<string>()
  board.forEach((square) => {
    if (square.piece && square.piece.color !== player) {
      if (square.piece.type === 'pawn') {
        const attackMoves = getAttackMovesForPawn(square)
        attackMoves.forEach((location) => allEnemyMoves.add(location))
      } else {
        square.piece.availableMoves.forEach((move) =>
          allEnemyMoves.add(move.location)
        )
      }
    }
  })

  const firstSquareUnderThreat = squaresThatMustBeSafe.find((location) =>
    [...allEnemyMoves].some((move) => move === location)
  )

  if (firstSquareUnderThreat) {
    // If any are, we can't castle so just explain why
    alertBadMove(`Unable to castle: ${firstSquareUnderThreat} is threatened.`)
    return false
  }

  return true
}

// Determine if the user can actually make their move
// If their proposed move leaves the king in check, then its not a legal move
// Returns true if move is legal and false if not
const canCastle = (context: Chess.Context, event: Chess.Event) => {
  if (event.type === 'CASTLE') {
    const { rookLocation } = event
    const { board, player } = context
    const temporaryBoard: Chess.Board = cloneDeep(board)
    const kingSquare = temporaryBoard.find((square) => square.piece?.isActive)
    const rookSquare = temporaryBoard.find(
      (square) => square.location === rookLocation
    )

    // First check to see if either king or rook have moved
    if (kingSquare.piece.hasMoved || rookSquare.piece.hasMoved) {
      // If they have, we can't castle so just explain why
      alertBadMove(
        `Unable to castle: ${
          rookSquare.piece.hasMoved
            ? 'your rook has moved.'
            : 'your king has moved'
        }`
      )
      return false
    }

    // Now determine legality of move (based on blocked and/or checked path)
    let squaresThatMustBeEmpty: string[]
    let squaresThatMustBeSafe: string[]

    // Castle is in original location (castling left as white)
    if (rookLocation === 'a1') {
      squaresThatMustBeEmpty = ['d1', 'c1', 'b1']
      squaresThatMustBeSafe = ['e1', 'd1', 'c1', 'b1', 'a1']
    }

    // Castle is in original location (castling right as white)
    if (rookLocation === 'h1') {
      squaresThatMustBeEmpty = ['f1', 'g1']
      squaresThatMustBeSafe = ['e1', 'f1', 'g1', 'h1']
    }

    // Castle is in original location (castling left as black)
    if (rookLocation === 'a8') {
      squaresThatMustBeEmpty = ['b8', 'c8', 'd8']
      squaresThatMustBeSafe = ['a8', 'b8', 'c8', 'd8', 'e8']
    }

    // Castle is in original location (castling right as black)
    if (rookLocation === 'h8') {
      squaresThatMustBeEmpty = ['f8', 'g8']
      squaresThatMustBeSafe = ['e8', 'f8', 'g8', 'h8']
    }

    // Final check to see if we can castle
    return isLegalMove(
      board,
      player,
      squaresThatMustBeEmpty,
      squaresThatMustBeSafe
    )
  }

  // Default to allowing the action (if it's not a 'castle' action)
  return true
}

export { canCastle }
