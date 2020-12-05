import {assign, Machine} from 'xstate'
import { setupNewGame } from '../utilities/setupNewGame'

// Schema for all possible states
interface ChessStateSchema {
  states: {
    setup: {},
    play: {},
    gameOver: {},
  }
}

// The events that the machine handles
type ChessEvent =
  | { type: 'CHECKMATE' }
  | { type: 'RESET' }
  | { type: 'PLAY_AGAIN' }
  | { type: 'MOVE' }

// The context (extended state) of the machine
interface ChessContext {
  board: [] | Chess.Board
  player: Chess.Color
}

const machine = Machine<ChessContext, ChessStateSchema, ChessEvent>(
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
            actions: 'swapPlayer',
          }
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
      swapPlayer: assign(ctx => ({
        ...ctx,
        player: ctx.player === 'white' ? 'black' : 'white'
      })),
    },
    services: {
      createChessBoard: () => new Promise(resolve => resolve(setupNewGame())),
    },
  },
)

export { machine }