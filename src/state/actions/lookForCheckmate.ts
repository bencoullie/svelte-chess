import { isKingCheckmated } from '../../utilities/isKingCheckmated'

const lookForCheckmate = (context: Chess.Context, event: Chess.Event) => {
  let isCheckmate = false

  if (event.type === 'MOVE') {
    const playersKingSquare = context.board.find(
      (square) =>
        square.piece?.type === 'king' && square.piece?.color === context.player
    )

    isCheckmate = isKingCheckmated(playersKingSquare, context)
  }

  return { isCheckmate }
}

export { lookForCheckmate }
