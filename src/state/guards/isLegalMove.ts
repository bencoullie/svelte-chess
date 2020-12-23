import cloneDeep from 'lodash.clonedeep'
import { alertBadMove } from "../../utilities/alertBadMove"
import { getAvailableMovesForPiece } from "../../utilities/getAvailableMoves"

// Determine if the user can actually make their move
// If their proposed move leaves the king in check, then its not a legal move
// Returns true if move is legal and false if not
const isLegalMove = (context: Chess.Context, event: Chess.Event) => {
  if (event.type === 'MOVE') {
    const { newLocation } = event
    const { board, player } = context
    const currentPlayer = player
    const enemyPlayer = player === 'white' ? 'black' : 'white'
    const temporaryBoard: Chess.Board = cloneDeep(board)
    const currentlyActiveSquare = temporaryBoard.find(square => square.piece?.isActive)
    const destinationSquare = temporaryBoard.find(square => square.location === newLocation)

    // Temporarily add piece to destination square
    destinationSquare.piece = currentlyActiveSquare.piece

    // Remove piece from active square
    delete currentlyActiveSquare.piece

    // Get players king's location
    const kingsLocation = temporaryBoard.find(square => {
      if (!square.piece) return

      const isOwnPiece = square.piece.color === currentPlayer
      const isKing = square.piece.type === 'king'

      return isOwnPiece && isKing
    }).location

    // Determine all possible moves for opponent 
    // (but only for pieces that can produce a discovered check)
    const pieceCapableOfCheck = temporaryBoard.find(square => {
      // If there is no opposing piece on that square, ignore it
      const isOpposingPiece = square.piece && square.piece.color === enemyPlayer
      if (!isOpposingPiece) return false

      // If piece is not possible of discovered check, ignore it
      const piecesCapableOfDiscoveredCheck = ['bishop', 'queen', 'rook']
      if (!piecesCapableOfDiscoveredCheck.includes(square.piece.type)) return false

      // So there is a potential threat but if it doesn't actually check the king, ignore it
      // Note: we pass through enemy player here as we're thinking ahead (before swapping player)
      const possibleMoves = getAvailableMovesForPiece(square, temporaryBoard, enemyPlayer)
      const possibleLocations = possibleMoves.map(square => square.location)
      if (!possibleLocations.includes(kingsLocation)) return false

      // Otherwise we can assume the king is now in check (illegal move)
      return true
    })
    
    // There is no discovered check, you're free to make the move mate
    if (!pieceCapableOfCheck) return true

    // Stop right there criminal scum
    alertBadMove()
    return false
  }

  // Default to allowing the action (if it's not a 'move' action)
  return true
}

export { isLegalMove }