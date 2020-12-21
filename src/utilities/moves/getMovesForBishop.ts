import { locations } from "../createChessBoard"
import { getNextLetter } from "../getNextLetter"
import { getPreviousLetter } from "../getPreviousLetter"

interface RequiredContext {
  board: Chess.Board, 
  isWhitePiece: boolean, 
  location: Chess.Location, 
  file: number, 
  rank: string,
  player: Chess.Color
}

const getMovesForBishop = (requiredContext: RequiredContext) => {
  const { board, isWhitePiece, location, file, rank, player } = requiredContext
  const availableLocations = new Set<string>()

  // Get top left diagonal
  let newTopLeftDiagonalLocation = location
  for (let i = 0; i < 8; i++) {
    const newRank = getPreviousLetter(newTopLeftDiagonalLocation[0])
    const newFile = Number(newTopLeftDiagonalLocation[1]) + 1
    newTopLeftDiagonalLocation = newRank + newFile as Chess.Location

    // Exit early, we've reached the end of the board
    if (!locations.includes(newTopLeftDiagonalLocation)) {
      break
    }

    // Get square for next possible move
    const correspondingSquare = board.find(square => square.location === newTopLeftDiagonalLocation)

    // If there is no piece there, we're free to move there
    if (!correspondingSquare.piece) {
      availableLocations.add(newTopLeftDiagonalLocation)
    }

    // If we run into a piece
    if (correspondingSquare.piece) {
      // And the piece is an enemy, we allow the take it
      if (correspondingSquare.piece.color !== player) {
        availableLocations.add(newTopLeftDiagonalLocation)
      }

      // And always break out of loop as we can't charge through other pieces
      break
    }
  }

  // Get top right diagonal
  let newTopRightDiagonalLocation = location
  for (let i = 0; i < 8; i++) {
    const newRank = getNextLetter(newTopRightDiagonalLocation[0])
    const newFile = Number(newTopRightDiagonalLocation[1]) + 1
    newTopRightDiagonalLocation = newRank + newFile as Chess.Location

    if (!locations.includes(newTopRightDiagonalLocation)) {
      break
    }

    const correspondingSquare = board.find(square => square.location === newTopRightDiagonalLocation)

    if (!correspondingSquare.piece) {
      availableLocations.add(newTopRightDiagonalLocation)
    }

    if (correspondingSquare.piece) {
      if (correspondingSquare.piece.color !== player) {
        availableLocations.add(newTopRightDiagonalLocation)
      }

      break
    }
  }

  // Get bottom right diagonal
  let newBottomRightDiagonalLocation = location
  for (let i = 0; i < 8; i++) {
    const newRank = getNextLetter(newBottomRightDiagonalLocation[0])
    const newFile = Number(newBottomRightDiagonalLocation[1]) - 1
    newBottomRightDiagonalLocation = newRank + newFile as Chess.Location

    if (!locations.includes(newBottomRightDiagonalLocation)) {
      break
    }

    const correspondingSquare = board.find(square => square.location === newBottomRightDiagonalLocation)

    if (!correspondingSquare.piece) {
      availableLocations.add(newBottomRightDiagonalLocation)
    }

    if (correspondingSquare.piece) {
      if (correspondingSquare.piece.color !== player) {
        availableLocations.add(newBottomRightDiagonalLocation)
      }

      break
    }
  }

  // Get bottom left diagonal
  let newBottomLeftDiagonalLocation = location
  for (let i = 0; i < 8; i++) {
    const newRank = getPreviousLetter(newBottomLeftDiagonalLocation[0])
    const newFile = Number(newBottomLeftDiagonalLocation[1]) - 1
    newBottomLeftDiagonalLocation = newRank + newFile as Chess.Location

    if (!locations.includes(newBottomLeftDiagonalLocation)) {
      break
    }

    const correspondingSquare = board.find(square => square.location === newBottomLeftDiagonalLocation)

    if (!correspondingSquare.piece) {
      availableLocations.add(newBottomLeftDiagonalLocation)
    }

    if (correspondingSquare.piece) {
      if (correspondingSquare.piece.color !== player) {
        availableLocations.add(newBottomLeftDiagonalLocation)
      }

      break
    }
  }

  return availableLocations
}

export { getMovesForBishop }