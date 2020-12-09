const swapPlayer = (context: Chess.Context): Chess.Context => ({
  ...context,
  player: context.player === 'white' ? 'black' : 'white'
})

export { swapPlayer }