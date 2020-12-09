import { getAvailableMoves } from "../../utilities/getAvailableMoves";

const recalculateAvailableMoves = (context: Chess.Context): Chess.Context => ({
  ...context,
  board: getAvailableMoves(context.board, context.player)
})

export { recalculateAvailableMoves }