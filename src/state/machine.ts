import { assign, Machine } from 'xstate'
import { activatePiece } from './actions/activatePiece'
import { castle } from './actions/castle'
import { lookForCheckmate } from './actions/lookForCheckmate'
import { movePiece } from './actions/movePiece'
import { recalculateAvailableMoves } from './actions/recalculateAvailableMoves'
import { swapPlayer } from './actions/swapPlayer'
import { canCastle } from './guards/canCastle'
import { isLegalMove } from './guards/isLegalMove'
import { createChessBoard } from './services/createChessBoard'

// TODO: store context state in local so it can be retrieved on page load
// TODO: Implement reset button which resets board + deletes local state
const machine = Machine<Chess.Context, Chess.StateSchema, Chess.Event>(
  {
    id: 'Machine',
    initial: 'setup',
    context: {
      isCheckmate: false,
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
              board: (context, event) => event.data,
            }),
          },
        },
      },
      play: {
        on: {
          CHECKMATE: 'gameOver',
          DRAW: 'gameOver',
          RESET: 'setup',
          MOVE: {
            target: 'play',
            cond: 'isLegalMove',
            actions: [
              'movePiece',
              'swapPlayer',
              'recalculateAvailableMoves',
              'lookForCheckmate',
            ],
          },
          CASTLE: {
            target: 'play',
            cond: 'canCastle',
            actions: ['castle', 'swapPlayer', 'recalculateAvailableMoves'],
          },
          SELECT_PIECE: {
            target: 'play',
            // TODO: use a guard here to make sure you're selecting correct piece
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
      castle: assign(castle),
      recalculateAvailableMoves: assign(recalculateAvailableMoves),
      lookForCheckmate: assign(lookForCheckmate),
    },
    services: {
      createChessBoard,
    },
    guards: {
      isLegalMove,
      canCastle,
    },
  }
)

export { machine }
