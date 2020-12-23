import { assign, Machine } from 'xstate'
import { alertBadMove } from '../utilities/alertBadMove'
import { setupNewGame } from '../utilities/setupNewGame'
import { activatePiece } from './actions/activatePiece'
import { movePiece } from './actions/movePiece'
import { recalculateAvailableMoves } from './actions/recalculateAvailableMoves'
import { swapPlayer } from './actions/swapPlayer'

const machine = Machine<Chess.Context, Chess.StateSchema, Chess.Event>(
  {
    id: 'Machine',
    initial: 'setup',
    context: {
      board: [],
      player: 'white',
    },
    states: {
      setup: {
        invoke: {
          id: 'createChessBoard',
          src: 'createChessBoard',
          onDone: {
            target: 'play',
            actions: assign({
              board: (context, event) => event.data
            }),
          }
        },
      },
      play: {
        on: {
          CHECKMATE: 'gameOver',
          RESET: 'setup',
          MOVE: {
            target: 'play',
            cond: 'isLegalMove',
            actions: ['movePiece', 'swapPlayer', 'recalculateAvailableMoves'],
          },
          SELECT_PIECE: {
            target: 'play',
            // TODO: use a condition here to make sure you're selecting correct piece
            actions: ['activatePiece'],
          },
        },
      },
      gameOver: {
        on: {
          PLAY_AGAIN: 'setup',
        },
      },
    },
  },
  {
    actions: {
      swapPlayer: assign(swapPlayer),
      activatePiece: assign(activatePiece),
      movePiece: assign(movePiece),
      recalculateAvailableMoves: assign(recalculateAvailableMoves),
    },
    services: {
      createChessBoard: () => new Promise(resolve => resolve(setupNewGame())),
    },
    guards: {
      isLegalMove: (context, event) => {
        // alertBadMove()
        return true
      }
    }
  },
)

export { machine }