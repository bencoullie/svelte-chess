import { addPiecesToBoard } from "./addPiecesToBoard"
import { createChessBoard } from "./createChessBoard"

const setupNewGame = () => {
  const emptyBoard = createChessBoard()
  const boardWithPieces = addPiecesToBoard(emptyBoard)

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(boardWithPieces)
    }, 1000)
  })

  // return boardWithPieces
}

export { setupNewGame }