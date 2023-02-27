import { Block } from '../block'
import { Tetromino } from './tetromino'

export class Psi extends Tetromino {
  constructor(Context: CanvasRenderingContext2D) {
    const size = 40

    super(Context, [
      new Block(Context, size, 'purple', { x: 120, y: 0 }),
      new Block(Context, size, 'purple', { x: 80, y: size }),
      new Block(Context, size, 'purple', { x: 120, y: size }),
      new Block(Context, size, 'purple', { x: 160, y: size }),
    ])
  }

  // TODO this mf
  canRotate(): boolean {
    return true
  }

  // TODO this mf
  rotate() {
    if (!this.canRotate()) {
      return
    }

    console.log('rotating this mf')
  }
}
