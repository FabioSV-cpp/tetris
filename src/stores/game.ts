import { createSignal } from 'solid-js'
import { isActive, moveDown, moveLeft, moveRight, rotate, tick } from './blocks'
import { Tetromino } from './tetrominoes'

enum GameState {
  default = 0,
  playing = 1,
  over = 2,
}

const [gameState, setGameState] = createSignal<GameState>(GameState.default)

const start = () => {
  setGameState(GameState.playing)
  Tetromino.create()

  const interval = setInterval(() => {
    if (gameState() === GameState.over) {
      console.log('game over')
      clearInterval(interval)
      return
    }

    if (isActive()) tick()
    else Tetromino.create()
  }, 300)
}

const attachGameListeners = () => {
  document.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.key === 'ArrowLeft') {
      moveLeft()
      return
    }

    if (ev.key === 'ArrowRight') {
      moveRight()
      return
    }

    if (ev.key === 'ArrowDown') {
      moveDown()
      return
    }

    if (ev.key === ' ') {
      rotate()
      return
    }
  })
}

export const Game = { start, attachGameListeners, gameState, setGameState, GameState }
