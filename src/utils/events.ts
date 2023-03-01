import { moveDown, moveLeft, moveRight, rotate } from '../stores/blocks'
import { handleTouchMove, handleTouchStart } from './swipe'

const keyListeners = (ev: KeyboardEvent) => {
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
}

export const attachGameListeners = () => {
  document.addEventListener('touchstart', handleTouchStart, false)
  document.addEventListener('touchmove', handleTouchMove, false)

  document.addEventListener('click', rotate)

  document.addEventListener('keydown', keyListeners)
}

export const detachGameListeners = () => {
  document.removeEventListener('touchstart', handleTouchStart)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('click', rotate)
  document.removeEventListener('keydown', keyListeners)
}
