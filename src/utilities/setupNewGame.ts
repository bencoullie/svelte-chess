import { addPiecesToBoard } from "./addPiecesToBoard"
import { createChessBoard } from "./createChessBoard"
import { getAvailableMoves } from "./getAvailableMoves"

const setupNewGame = () => {
  const emptyBoard = createChessBoard()
  const boardWithPieces = addPiecesToBoard(emptyBoard)
  const boardWithAvailableMoves = getAvailableMoves(boardWithPieces, 'white')

  return boardWithAvailableMoves
}

export { setupNewGame }