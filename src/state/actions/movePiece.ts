import cloneDeep from 'lodash.clonedeep'

const movePiece = (context: Chess.Context, event: Chess.Event) => {
  if (event.type === 'MOVE') {
    const { newLocation } = event
    const newContext: Chess.Context = cloneDeep(context)
    const currentlyActiveSquare = newContext.board.find(square => square.piece?.isActive)
    const destinationSquare = newContext.board.find(square => square.location === newLocation)

    // Add piece to destination square
    destinationSquare.piece = currentlyActiveSquare.piece

    // Remove piece from active square
    delete currentlyActiveSquare.piece

    return newContext
  }
}

export { movePiece }