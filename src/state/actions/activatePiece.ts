import cloneDeep from 'lodash.clonedeep'

const activatePiece = (context: Chess.Context, event: Chess.Event) => {
  if (event.type === 'SELECT_PIECE') {
    const newContext: Chess.Context = cloneDeep(context)
    
    newContext.board.forEach(square => {
      if (!square.piece) {
        return
      }

      if (square.piece.isActive) {
        square.piece.isActive = false
      } else {
        square.piece.isActive = square.location === event.squareLocation ? true : false
      }
    })

    return newContext
  }
}

export { activatePiece }