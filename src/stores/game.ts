import { createSignal } from 'solid-js'
import { detachGameListeners, attachGameListeners } from '../utils/events'
import { isActive, setBlocks, tick } from './blocks'
import { Tetromino } from './tetrominoes'

enum GameState {
  default = 0,
  playing = 1,
  over = 2,
}

const [gameState, setGameState] = createSignal<GameState>(GameState.default)

const reset = () => {
  setGameState(GameState.default)
  setBlocks([])
  detachGameListeners()
}

const start = () => {
  setGameState(GameState.playing)
  Tetromino.create()

  const interval = setInterval(() => {
    if (gameState() === GameState.over) {
      clearInterval(interval)
      reset()
      return
    }

    if (isActive()) tick()
    else Tetromino.create()
  }, 300)
}

export const Game = { start, reset, attachGameListeners, gameState, setGameState, GameState }
