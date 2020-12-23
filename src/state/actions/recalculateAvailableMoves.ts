import { getAvailableMoves } from "../../utilities/getAvailableMoves";

const recalculateAvailableMoves = (context: Chess.Context) => ({
  board: getAvailableMoves(context.board, context.player)
})

export { recalculateAvailableMoves }