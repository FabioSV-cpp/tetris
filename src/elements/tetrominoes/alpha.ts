import { Block } from '../block'
import { Tetromino } from './tetromino'

export class Alpha extends Tetromino {
  constructor(Context: CanvasRenderingContext2D) {
    const size = 40

    super(Context, [
      new Block(Context, size, 'orange', { x: 80, y: 0 }),
      new Block(Context, size, 'orange', { x: 120, y: 0 }),
      new Block(Context, size, 'orange', { x: 120, y: size }),
      new Block(Context, size, 'orange', { x: 120, y: 2 * size }),
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
