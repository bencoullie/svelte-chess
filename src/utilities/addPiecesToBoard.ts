const addPiecesToBoard = (board: Chess.Board): Chess.Board => {
  const boardWithPieces = board.map(square => {
    // Pawns
    const isWhitePawnStartingLocation = square.location.includes('2')
    const isBlackPawnStartingLocation = square.location.includes('7')

    if (isWhitePawnStartingLocation || isBlackPawnStartingLocation) {
      const piece: Chess.Piece = {
        type: 'pawn',
        color: isWhitePawnStartingLocation ? 'white' : 'black',
        availableMoves: [],
        isActive: false
      }

      return {
        ...square,
        piece,
      }
    }

    // Rooks
    const isWhiteRookStartingLocation = square.location === 'a1' || square.location === 'h1'
    const isBlackRookStartingLocation = square.location === 'a8' || square.location === 'h8'

    if (isWhiteRookStartingLocation || isBlackRookStartingLocation) {
      const piece: Chess.Piece = {
        type: 'rook',
        color: isWhiteRookStartingLocation ? 'white' : 'black',
        availableMoves: [],
        isActive: false
      }

      return {
        ...square,
        piece,
      }
    }

    // Knights
    const isWhiteKnightStartingLocation = square.location === 'b1' || square.location === 'g1'
    const isBlackKnightStartingLocation = square.location === 'b8' || square.location === 'g8'

    if (isWhiteKnightStartingLocation || isBlackKnightStartingLocation) {
      const piece: Chess.Piece = {
        type: 'knight',
        color: isWhiteKnightStartingLocation ? 'white' : 'black',
        availableMoves: [],
        isActive: false
      }

      return {
        ...square,
        piece,
      }
    }

    // Bishops
    const isWhiteBishopStartingLocation = square.location === 'c1' || square.location === 'f1'
    const isBlackBishopStartingLocation = square.location === 'c8' || square.location === 'f8'

    if (isWhiteBishopStartingLocation || isBlackBishopStartingLocation) {
      const piece: Chess.Piece = {
        type: 'bishop',
        color: isWhiteBishopStartingLocation ? 'white' : 'black',
        availableMoves: [],
        isActive: false
      }

      return {
        ...square,
        piece,
      }
    }


    // Queens
    const isWhiteQueenStartingLocation = square.location === 'd1'
    const isBlackQueenStartingLocation = square.location === 'd8'

    if (isWhiteQueenStartingLocation || isBlackQueenStartingLocation) {
      const piece: Chess.Piece = {
        type: 'queen',
        color: isWhiteQueenStartingLocation ? 'white' : 'black',
        availableMoves: [],
        isActive: false
      }

      return {
        ...square,
        piece,
      }
    }

    // Kings
    const isWhiteKingStartingLocation = square.location === 'e1'
    const isBlackKingStartingLocation = square.location === 'e8'

    if (isWhiteKingStartingLocation || isBlackKingStartingLocation) {
      const piece: Chess.Piece = {
        type: 'king',
        color: isWhiteKingStartingLocation ? 'white' : 'black',
        availableMoves: [],
        isActive: false
      }

      return {
        ...square,
        piece,
      }
    }
    
    return square
  })

  return boardWithPieces
}

export { addPiecesToBoard }
