import { locations } from "./utilities/createChessBoard";

// Just easier and a little cleaner than importing types all over the show
declare global {
  declare type Color = 'white' | 'black'

  declare type pieceType = 'pawn'

  declare type SquareLocation = typeof locations[number]

  declare interface Piece {
    color: Color,
    type: pieceType
  }
  
  declare interface Square {
    color: Color
    location: SquareLocation
    piece?: Piece
  }
  
  declare type Board = Square[]
}

