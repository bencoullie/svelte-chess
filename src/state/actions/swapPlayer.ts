const swapPlayer = (context: Chess.Context): { player: Chess.Color } => ({
  player: context.player === 'white' ? 'black' : 'white'
})

export { swapPlayer }