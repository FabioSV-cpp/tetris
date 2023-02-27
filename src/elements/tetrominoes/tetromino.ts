import { gridDimensions } from '../../main'
import { Block, Position } from '../block'

export abstract class Tetromino {
  Context
  blocks: Block[]

  constructor(Context: CanvasRenderingContext2D, blocks: Block[]) {
    this.Context = Context
    this.blocks = blocks
  }

  abstract canRotate(): boolean
  abstract rotate(): void

  move(callBack: (block: Block) => Position) {
    this.blocks.forEach(block => block.erase())

    this.blocks.forEach(block => {
      block.position = callBack(block)
      block.draw()
    })
  }

  moveLeft() {
    if (!this.canMoveLeft()) {
      return
    }

    this.move(block => ({
      x: block.position.x - block.size - 2,
      y: block.position.y,
    }))
  }

  moveRight() {
    if (!this.canMoveRight()) {
      return
    }

    this.move(block => ({
      x: block.position.x + block.size + 2,
      y: block.position.y,
    }))
  }

  moveDown() {
    if (!this.canMoveDown()) {
      return
    }

    this.move(block => ({
      x: block.position.x,
      y: block.position.y + block.size + 2,
    }))
  }

  canMoveLeft(): boolean {
    const leftMostBlock = this.blocks.reduce<Block | null>((prev, curr) => {
      if (prev === null || prev.position.x > curr.position.x) {
        return curr
      }

      return prev
    }, null)

    if (leftMostBlock === null) {
      throw new Error('Could not find left most block. Aborting...')
    }

    return leftMostBlock.position.x > 0
  }

  canMoveRight(): boolean {
    const rightMostBlock = this.blocks.reduce<Block | null>((prev, curr) => {
      if (prev === null || prev.position.x < curr.position.x) {
        return curr
      }

      return prev
    }, null)

    if (rightMostBlock === null) {
      throw new Error('Could not find right most block. Aborting...')
    }

    const gridRight = gridDimensions.x * gridDimensions.size
    const rightBlockRightEdge = rightMostBlock.position.x + rightMostBlock.size + 2

    return gridRight > rightBlockRightEdge
  }

  canMoveDown(): boolean {
    const lowestBlock = this.blocks.reduce<Block | null>((prev, curr) => {
      if (prev === null || prev.position.y < curr.position.y) {
        return curr
      }

      return prev
    }, null)

    if (lowestBlock === null) {
      throw new Error('Could not find lowest block. Aborting...')
    }

    const gridHeight = gridDimensions.y * gridDimensions.size
    const lastBlockBottom: number = lowestBlock.position.y + lowestBlock.size + 2

    return gridHeight > lastBlockBottom
  }
}
