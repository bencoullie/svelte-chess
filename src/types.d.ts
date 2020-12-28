import { locations } from './utilities/createEmptyChessBoard'

// Just easier and a little cleaner than importing types all over the show
declare global {
  namespace Chess {
    /////////////////////////////////////
    // Chess game types and interfaces //
    /////////////////////////////////////

    declare type Color = 'white' | 'black'

    declare type PieceType =
      | 'pawn'
      | 'rook'
      | 'knight'
      | 'bishop'
      | 'queen'
      | 'king'

    declare type Location = typeof locations[number]

    declare interface Piece {
      color: Color
      type: PieceType
      availableMoves: Square[]
      isActive: boolean
      hasMoved?: boolean
      isVulnerableToEnPassant?: boolean
    }

    declare interface Square {
      color: Color
      location: Location
      piece?: Piece
      // The player who is vulnerable
      enPassantPlayer?: Chess.Color
    }

    declare type Board = Square[]

    //////////////////////////////////
    // Machine types and interfaces //
    //////////////////////////////////

    // Schema for all possible states
    interface StateSchema {
      states: {
        setup: {}
        play: {}
        gameOver: {}
      }
    }

    // The events that the machine handles
    type Event =
      | { type: 'CHECKMATE' }
      | { type: 'DRAW' }
      | { type: 'RESET' }
      | { type: 'PLAY_AGAIN' }
      | { type: 'MOVE'; newLocation: Chess.Location }
      | { type: 'CASTLE'; rookLocation: Chess.Location }
      | { type: 'SELECT_PIECE'; squareLocation: Chess.Location }

    // The context (extended state) of the machine
    interface Context {
      board: Chess.Board
      player: Chess.Color
      isCheckmate: boolean
    }
  }
}
