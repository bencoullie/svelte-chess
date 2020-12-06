const getBackgroundImage = (piece: Chess.Piece) => {
  return `/images/${piece.color}-${piece.type}.svg`
}

export { getBackgroundImage }