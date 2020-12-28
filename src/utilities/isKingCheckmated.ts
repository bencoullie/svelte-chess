import cloneDeep from 'lodash.clonedeep'
import { getAttackMovesForPawn } from './getAttackMovesForPawn'
import { getAvailableMovesForPiece } from './getAvailableMoves'

// Very similar to isViableMove guard with slightly different signature + no alerts
// NOTE: done here so we can keep isLegalGuard pure (i.e. matching required xstate signature)
// while avoiding alerts in this case
// TODO: name this better (similar to isLegalMove)
const isViableMove = (
  newLocation: string,
  oldLocation: string,
  context: Chess.Context
) => {
  const { board, player } = context
  const currentPlayer = player
  const enemyPlayer = player === 'white' ? 'black' : 'white'
  const temporaryBoard: Chess.Board = cloneDeep(board)
  const currentlyActiveSquare = temporaryBoard.find(
    (square) => square.location === oldLocation
  )
  const destinationSquare = temporaryBoard.find(
    (square) => square.location === newLocation
  )

  // Temporarily add piece to destination square
  destinationSquare.piece = currentlyActiveSquare.piece

  // Remove piece from active square
  delete currentlyActiveSquare.piece

  // Get players king's location
  const kingsLocation = temporaryBoard.find((square) => {
    if (!square.piece) return

    const isOwnPiece = square.piece.color === currentPlayer
    const isKing = square.piece.type === 'king'

    return isOwnPiece && isKing
  }).location

  // Find out if the player's king would be in check if they made this move
  const pieceCapableOfCheck = temporaryBoard.find((square) => {
    // If there is no opposing piece on that square, ignore it
    const isOpposingPiece = square.piece && square.piece.color === enemyPlayer
    if (!isOpposingPiece) return false

    // So there is a potential threat but if it doesn't actually check the king, ignore it
    // Note: we pass through enemy player here as we're thinking ahead (before swapping player)
    const possibleMoves = getAvailableMovesForPiece(
      square,
      temporaryBoard,
      enemyPlayer
    )
    const possibleLocations = possibleMoves.map((square) => square.location)
    if (!possibleLocations.includes(kingsLocation)) return false

    // Otherwise we can assume the king is now in check (illegal move)
    return true
  })

  // There is no check, you're free to make the move mate
  if (!pieceCapableOfCheck) return true

  return false
}

const isKingCheckmated = (
  playersKingSquare: Chess.Square,
  context: Chess.Context
) => {
  const playersKing = playersKingSquare.piece

  // TODO: move this 'attackedSquares' to context state (and use that here and in castling)? Maybe?
  // First we see if we kind find a piece that is checking the king
  const pieceCheckingKing = context.board.find((square) => {
    if (square.piece && square.piece.color !== context.player) {
      if (square.piece.type === 'pawn') {
        const attackMoves = getAttackMovesForPawn(square)
        return attackMoves.includes(playersKingSquare.location)
      } else {
        return square.piece.availableMoves.some(
          (move) => move.location === playersKingSquare.location
        )
      }
    }

    return false
  })

  // If no piece is checking the king we return false (i.e. not checkmated)
  if (!pieceCheckingKing) return false

  // Then we check to see if the king can, itself, move away from danger
  const isKingAbleToMove = playersKing.availableMoves.some((square) =>
    isViableMove(square.location, playersKingSquare.location, context)
  )

  // If the king can move away, its not checkmate
  if (isKingAbleToMove) return false

  // Then we check to see if the player can move any other pieces to eliminate the check
  const squaresWithPiecesChallengingChecker = context.board.filter(
    (square) =>
      square.piece?.color === context.player &&
      square.piece?.availableMoves.some(
        (move) => move.location === pieceCheckingKing.location
      )
  )

  const canMoveSaveKing = squaresWithPiecesChallengingChecker.some((square) =>
    isViableMove(pieceCheckingKing.location, square.location, context)
  )

  // If they can legally kill the checker piece, then the king isn't in check
  if (canMoveSaveKing) return false

  // Now we check to see if the checking piece is a knight
  const isCheckedByKnight = pieceCheckingKing.piece.type === 'knight'

  // As knights can't be blocked, its GG if, by this point, the king's being checked by a knight
  // NOTE: early exit here for performance reasons
  if (isCheckedByKnight) return true

  // Finally we have to see if the checked player can move a piece to body block the attack
  // First we get every move for every defending piece
  const everyDefendingPiece = context.board.filter(
    (square) => square.piece?.color === context.player
  )

  // Get the location of the defender and their prospective move (required for checking viability)
  const everyPossibleDefense: {
    oldLocation: string
    newLocation: string
  }[] = []

  everyDefendingPiece.forEach((defender) =>
    defender.piece.availableMoves.forEach((move) =>
      everyPossibleDefense.push({
        oldLocation: defender.location,
        newLocation: move.location,
      })
    )
  )

  // Get all attackers moves
  // TODO: Fix locations to either only include Chess.Location types or all be strings (which they are right now as some locations are out of bounds)
  const attackersMoves = pieceCheckingKing.piece.availableMoves.map(
    (move) => move.location
  ) as string[]

  // Can they bodyguard?
  const canBlockPieceCheckingKing = everyPossibleDefense.some(
    (defense) =>
      attackersMoves.includes(defense.newLocation) &&
      isViableMove(defense.newLocation, defense.oldLocation, context)
  )

  // If a defender can take the bullet for their king then we're not in checkmate
  if (canBlockPieceCheckingKing) return false

  // 😏 ~ got em bois ~ 😏
  return true
}

export { isKingCheckmated }
