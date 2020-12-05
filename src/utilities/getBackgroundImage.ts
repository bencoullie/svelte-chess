const getBackgroundImage = (piece: Piece) => {
  return `/images/${piece.color}-${piece.type}.svg`
}

export { getBackgroundImage }