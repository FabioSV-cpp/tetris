import { createSignal } from 'solid-js'
import { Game } from './game'
import { dimensions } from './grid'

enum Color {
  red = '#ff9292',
  orange = '#ffbf92',
  green = '#caff92',
  blue = '#92d6ff',
  purple = '#cf92ff',
  yellow = '#f8feb7 ',
  pink = '#ffb7e8',
}

interface IBlock {
  x: number
  y: number
  active: boolean
  color: Color
}

const [blocks, setBlocks] = createSignal<IBlock[]>([])

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
  if (activeBlocks.length === 0) {
    return false
  }

  const leftest = activeBlocks.reduce((prev, curr) => {
    if (curr.x < prev.x) {
      return curr
    }

    return prev
  })

  return leftest.x > 0
}

const hasSpaceToRight = (activeBlocks: IBlock[]) => {
  if (activeBlocks.length === 0) {
    return false
  }

  const rightest = activeBlocks.reduce((prev, curr) => {
    if (curr.x > prev.x) {
      return curr
    }

    return prev
  })

  return rightest.x < dimensions.width - 1
}

const detectCollisionLeft = (blockSet: IBlock[]): boolean => {
  const activeBlocks = blocks().filter(b => b.active)

  return (
    blockSet.find(staticBlock => {
      return activeBlocks.find(activeBlock => staticBlock.x === activeBlock.x - 1 && staticBlock.y === activeBlock.y)
    }) !== undefined
  )
}

const detectCollisionRight = (blockSet: IBlock[]): boolean => {
  const activeBlocks = blocks().filter(b => b.active)

  return (
    blockSet.find(staticBlock => {
      return activeBlocks.find(activeBlock => staticBlock.x === activeBlock.x + 1 && staticBlock.y === activeBlock.y)
    }) !== undefined
  )
}

const detectCollisionBelow = (blockSet: IBlock[]): boolean => {
  const activeBlocks = blocks().filter(b => b.active)

  return (
    blockSet.find(staticBlock => {
      return activeBlocks.find(activeBlock => staticBlock.y === activeBlock.y + 1 && staticBlock.x === activeBlock.x)
    }) !== undefined
  )
}

const isTouchingTop = (): boolean =>
  blocks()
    .filter(b => b.active)
    .find(b => b.y === 0) !== undefined

const clearFullLines = () => {
  let filteredBlocks = blocks()

  for (let h = 0; h < dimensions.height; h++) {
    const rowCount = blocks().reduce<number>((accum, curr) => {
      if (curr.y === h) {
        accum += 1
      }

      return accum
    }, 0)

    if (rowCount === dimensions.width) {
      filteredBlocks = filteredBlocks
        .filter(b => b.y !== h)
        .map(b => {
          if (b.y < h) {
            return {
              ...b,
              y: b.y + 1,
            }
          }

          return b
        })
    }
  }

  setBlocks(filteredBlocks)
}

const tick = () => {
  const newBlocks: IBlock[] = blocks().filter(block => !block.active)
  const isCollidingBelow = detectCollisionBelow(newBlocks)
  if (isCollidingBelow && isTouchingTop()) {
    setBlocks(blocks => blocks.map(b => ({ ...b, active: false })))

    Game.setGameState(Game.GameState.over)
    return
  }
  if (isCollidingBelow) {
    setBlocks(blocks => blocks.map(b => ({ ...b, active: false })))
    clearFullLines()
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
  clearFullLines()
}

const isActive = (): boolean => blocks().find(block => block.active) !== undefined

const moveLeft = (): boolean => {
  const activeBlocks = blocks().filter(b => b.active)

  if (!hasSpaceToLeft(activeBlocks) || detectCollisionLeft(blocks().filter(b => !b.active))) {
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

const moveRight = (): boolean => {
  const activeBlocks = blocks().filter(b => b.active)

  if (!hasSpaceToRight(activeBlocks) || detectCollisionRight(blocks().filter(b => !b.active))) {
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

const moveDown = () => tick()

export const rotate = () => {
  const active = blocks().filter(b => b.active)

  const focus = active[2] // the 3rd block is the pivot point
  const rotatedBlocks = active.map(b => ({
    ...b,
    x: b.y + focus.x - focus.y,
    y: focus.x + focus.y - b.x - 1,
  }))

  setBlocks([...blocks().filter(b => !b.active), ...rotatedBlocks])
}

export type { IBlock }
export { Color, blocks, setBlocks, tick, isActive, moveLeft, moveRight, moveDown }
