import { setupNewGame } from "../../utilities/setupNewGame";

// NOTE: this could be an action (we're not making any async requests)
// But I wanted to use a service to learn how they work and this is a good example
// I.e. we could potentially get player's stored configuration before setting up board etc
const createChessBoard = () => new Promise(resolve => resolve(setupNewGame()))

export { createChessBoard }