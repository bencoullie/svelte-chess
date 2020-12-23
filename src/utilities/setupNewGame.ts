import { addPiecesToBoard } from "./addPiecesToBoard"
import { createEmptyChessBoard } from "./createEmptyChessBoard"
import { getAvailableMoves } from "./getAvailableMoves"

const setupNewGame = () => {
  const emptyBoard = createEmptyChessBoard()
  const boardWithPieces = addPiecesToBoard(emptyBoard)
  const boardWithAvailableMoves = getAvailableMoves(boardWithPieces, 'white')
 
  return boardWithAvailableMoves
}

export { setupNewGame }