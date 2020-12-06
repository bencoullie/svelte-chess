import { locations } from "./utilities/createChessBoard";

// Just easier and a little cleaner than importing types all over the show
declare global {
  namespace Chess {
    declare type Color = 'white' | 'black'

    declare type PieceType = 'pawn'

    declare type Location = typeof locations[number]

    declare interface Piece {
      color: Color
      type: PieceType
    }
    
    declare interface Square {
      color: Color
      location: Location
      piece?: Piece
      availableMoves: Square[]
    }
    
    declare type Board = Square[]
  }
}

