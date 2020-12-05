import {assign, Machine} from 'xstate'
import { setupNewGame } from './setupNewGame'

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

// The context (extended state) of the machine
interface ChessContext {
  board: [] | Board
}

const machine = Machine<ChessContext, ChessStateSchema, ChessEvent>(
  {
    id: 'Machine',
    initial: 'setup',
    context: {
      board: [],
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
          RESET: 'setup'
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
    services: {
      createChessBoard: () => new Promise(resolve => resolve(setupNewGame())),
    },
  },
)

export { machine }