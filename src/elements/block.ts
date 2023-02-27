type Color = 'red' | 'green' | 'blue' | 'orange' | 'yellow' | 'purple' | 'pink'

export type Position = {
  x: number
  y: number
}

interface IBlock {
  size: number
  color: Color
  position: Position
}

export class Block implements IBlock {
  Context: CanvasRenderingContext2D
  size: number
  color: Color
  position: Position

  constructor(ctx: CanvasRenderingContext2D, size: number, color: Color, position: Position) {
    this.Context = ctx
    this.size = size - 2
    this.color = color
    this.position = position

    this.draw()
  }

  moveDown() {
    this.moveTo(this.position.x, this.position.y + this.size + 2)
  }

  moveTo(x: number, y: number) {
    this.erase()

    this.position = { x, y }

    this.draw()
  }

  erase() {
    this.Context.fillStyle = 'white'
    this.Context.fillRect(this.position.x + 1, this.position.y + 1, this.size, this.size)
  }

  draw() {
    this.Context.fillStyle = this.color
    this.Context.fillRect(this.position.x + 1, this.position.y + 1, this.size, this.size)
  }
}
