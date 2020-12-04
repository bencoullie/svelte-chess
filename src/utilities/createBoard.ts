export type Color = 'white' | 'black'

const locations = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6', 'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', 'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1' ] as const

export type Location = typeof locations[number]

export interface Square {
  color: Color
  location: Location
}

export type Board = Square[]

const createChessBoard = () => {
  const board: Board = []
  let colorDirection = false

  for (var i = 0; i < 64; i++) {
    const square: Square = { color: 'white', location: 'a1' }
    const shouldChangeStartingColor = i % 8 === 0

    // Assign correct location on board
    square.location = locations[i]

    if (shouldChangeStartingColor) {
      colorDirection = !colorDirection
    }

    if (colorDirection) {
      square.color = i % 2 === 0 ? 'white' : 'black'
    } else {
      square.color = i % 2 === 0 ? 'black' : 'white'
    }

    board.push(square)
  }

  return board
}

export { createChessBoard }
