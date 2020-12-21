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

// copped out here and just combined rook and bishop - probs much better way to this 😏
const getMovesForQueen = (requiredContext: RequiredContext) => {
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

  // Get right hand movements
  let currentRankRight = rank
  for (let i = 0; i < 8; i++) {
    // Work out contents of next square in rank to the right
    const nextRankRight = getNextLetter(currentRankRight)
    const newLocation = nextRankRight + file
    currentRankRight = nextRankRight
    const squareWithPiece = board.find(square => square.piece && square.location === newLocation)

    // Rooks can move horizontally until they find a piece
    if (!squareWithPiece) {
      availableLocations.add(newLocation)
    }

    // If they find a piece
    if (squareWithPiece) {
      // And if the piece is an enemy piece
      if (squareWithPiece.piece.color !== player) {
        // Let them take it
        availableLocations.add(newLocation)
      }

      // As they can't keep going through a take, break the loop here
      break
    }
  }

  // Get left hand movements
  let currentRankLeft = rank
  for (let i = 0; i < 8; i++) {
    const nextRankLeft = getPreviousLetter(currentRankLeft)
    const newLocation = nextRankLeft + file
    currentRankLeft = nextRankLeft
    const squareWithPiece = board.find(square => square.piece && square.location === newLocation)

    if (!squareWithPiece) {
      availableLocations.add(newLocation)
    }

    if (squareWithPiece) {
      if (squareWithPiece.piece.color !== player) {
        availableLocations.add(newLocation)
      }

      break
    }
  }
  
  // Get upward movements
  let currentFileUpward = file
  for (let i = 0; i < 8; i++) {
    const nextFileUpward = currentFileUpward + 1
    currentFileUpward = nextFileUpward

    if (nextFileUpward > 8) {
      break
    }

    const newLocation = rank + nextFileUpward
    const squareWithPiece = board.find(square => square.piece && square.location === newLocation)

    if (!squareWithPiece) {
      availableLocations.add(newLocation)
    }

    if (squareWithPiece) {
      if (squareWithPiece.piece.color !== player) {
        availableLocations.add(newLocation)
      }

      break
    }
  }

  // Get downward movements
  let currentFileDownward = file
  for (let i = 0; i < 8; i++) {
    const nextFileDownward = currentFileDownward - 1
    currentFileDownward = nextFileDownward

    if (nextFileDownward <= 0) {
      break
    }

    const newLocation = rank + nextFileDownward
    const squareWithPiece = board.find(square => square.piece && square.location === newLocation)

    if (!squareWithPiece) {
      availableLocations.add(newLocation)
    }

    if (squareWithPiece) {
      if (squareWithPiece.piece.color !== player) {
        availableLocations.add(newLocation)
      }

      break
    }
  }

  return availableLocations
}

export { getMovesForQueen }