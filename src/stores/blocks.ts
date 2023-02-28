import { createSignal } from 'solid-js'
import { dimensions } from './grid'

export enum Color {
  red = '#ff3333',
  orange = '#ff5733',
  green = '#7dff33',
  blue = '#339cff',
  purple = '#a233ff',
  yellow = '#f6ff33',
  pink = '#ff33be',
}

export interface IBlock {
  x: number
  y: number
  active: boolean
  color: Color
}

export const [blocks, setBlocks] = createSignal<IBlock[]>([])

const hasSpaceBeneath = (activeBlocks: IBlock[]) => {
  const lowest = activeBlocks.reduce((prev, curr) => {
    if (curr.y > prev.y) {
      return curr
    }

    return prev
  })

  return lowest.y < dimensions.height - 1
}

const hasSpaceToLeft = (activeBlocks: IBlock[]) => {
  const leftest = activeBlocks.reduce((prev, curr) => {
    if (curr.x < prev.x) {
      return curr
    }

    return prev
  })

  return leftest.x > 0
}

const hasSpaceToRight = (activeBlocks: IBlock[]) => {
  const rightest = activeBlocks.reduce((prev, curr) => {
    if (curr.x > prev.x) {
      return curr
    }

    return prev
  })

  return rightest.x < dimensions.width - 1
}

const detectCollision = (blockSet: IBlock[]): boolean => {
  return (
    blockSet.find(staticBlock => {
      const activeBlocks = blocks().filter(b => b.active)

      return activeBlocks.find(activeBlock => staticBlock.y === activeBlock.y + 1 && staticBlock.x === activeBlock.x)
    }) !== undefined
  )
}

export const tick = () => {
  const newBlocks: IBlock[] = blocks().filter(block => !block.active)

  if (detectCollision(newBlocks)) {
    setBlocks(blocks => blocks.map(b => ({ ...b, active: false })))
    return
  }

  blocks()
    .filter(b => b.active)
    .forEach((block, i, active) => {
      const canGoDown = hasSpaceBeneath(active)

      newBlocks.push({
        x: block.x,
        y: canGoDown ? block.y + 1 : block.y,
        active: canGoDown,
        color: block.color,
      })
    })

  setBlocks(newBlocks)
}

export const isActive = (): boolean => blocks().find(block => block.active) !== undefined

// TODO: Doesn't detect collisions
export const moveLeft = (): boolean => {
  const activeBlocks = blocks().filter(b => b.active)

  if (!hasSpaceToLeft(activeBlocks)) {
    return false
  }

  setBlocks(
    blocks().map(b => {
      if (!b.active) {
        return b
      }

      return {
        ...b,
        x: b.x - 1,
      }
    })
  )

  return true
}


// TODO: Detect collisions to objects that are to the right
export const moveRight = (): boolean => {
  const activeBlocks = blocks().filter(b => b.active)

  if (!hasSpaceToRight(activeBlocks)) {
    return false
  }

  setBlocks(
    blocks().map(b => {
      if (!b.active) {
        return b
      }

      return {
        ...b,
        x: b.x + 1,
      }
    })
  )

  return true
}
