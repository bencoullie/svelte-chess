import { getNextLetter } from './getNextLetter'
import { getPreviousLetter } from './getPreviousLetter'

const getAttackMovesForPawn = (pawnSquare: Chess.Square) => {
  const fileChange = pawnSquare.piece.color === 'white' ? 1 : -1

  const leftAttack =
    getPreviousLetter(pawnSquare.location[0]) +
    (Number(pawnSquare.location[1]) + fileChange)
  const rightAttack =
    getNextLetter(pawnSquare.location[0]) +
    (Number(pawnSquare.location[1]) + fileChange)

  return [leftAttack, rightAttack]
}

export { getAttackMovesForPawn }
