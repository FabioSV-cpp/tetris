import { Grid } from './elements'
import { Alpha, Omicron, Psi, Square, Zeta } from './elements/tetrominoes'
import './style.css'

const Canvas = document.querySelector<HTMLCanvasElement>('#gamecanvas')

if (!Canvas) {
  throw new Error('No Canvas in Document. Aborting...')
}

const Context = Canvas.getContext('2d')

if (!Context) {
  throw new Error('Canvas context not recovered. Aborting...')
}

Canvas.width = window.innerWidth - 10
Canvas.height = window.innerHeight - 10

export const gridDimensions = {
  x: 10,
  y: 20,
  size: 40,
}

Grid(Context, gridDimensions)

const testShape = new Omicron(Context)

document.addEventListener('keydown', (ev: KeyboardEvent) => {
  ev.preventDefault()

  if (ev.key === 'ArrowDown') {
    testShape.moveDown()
    return
  }

  if (ev.key === 'ArrowLeft') {
    testShape.moveLeft()
    return
  }

  if (ev.key === 'ArrowRight') {
    testShape.moveRight()
    return
  }

  if (ev.key === ' ') {
    testShape.rotate()
    return
  }
})
