import { Block } from '../block'
import { Tetromino } from './tetromino'

export class LongBoy extends Tetromino {
  constructor(Context: CanvasRenderingContext2D) {
    const size = 40

    super(Context, [
      new Block(Context, size, 'blue', { x: 80, y: 0 }),
      new Block(Context, size, 'blue', { x: 80, y: size }),
      new Block(Context, size, 'blue', { x: 80, y: 2 * size }),
      new Block(Context, size, 'blue', { x: 80, y: 3 * size }),
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
