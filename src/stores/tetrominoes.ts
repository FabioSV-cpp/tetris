import { blocks, Color, IBlock, setBlocks } from './blocks'

const addLine = () => {
  const newBlocks: IBlock[] = blocks()
  newBlocks.push(
    { x: 3, y: 0, active: true, color: Color.blue },
    { x: 4, y: 0, active: true, color: Color.blue },
    { x: 5, y: 0, active: true, color: Color.blue },
    { x: 6, y: 0, active: true, color: Color.blue }
  )

  setBlocks(newBlocks)
}

const addSquare = () => {
  const newBlocks: IBlock[] = blocks()
  newBlocks.push(
    { x: 4, y: 0, active: true, color: Color.green },
    { x: 4, y: 1, active: true, color: Color.green },
    { x: 5, y: 0, active: true, color: Color.green },
    { x: 5, y: 1, active: true, color: Color.green }
  )

  setBlocks(newBlocks)
}

const addLeft = () => {
  const newBlocks: IBlock[] = blocks()
  newBlocks.push(
    { x: 3, y: 0, active: true, color: Color.orange },
    { x: 3, y: 1, active: true, color: Color.orange },
    { x: 4, y: 0, active: true, color: Color.orange },
    { x: 5, y: 0, active: true, color: Color.orange }
  )

  setBlocks(newBlocks)
}

const addRight = () => {
  const newBlocks: IBlock[] = blocks()
  newBlocks.push(
    { x: 3, y: 0, active: true, color: Color.pink },
    { x: 3, y: 1, active: true, color: Color.pink },
    { x: 4, y: 1, active: true, color: Color.pink },
    { x: 5, y: 1, active: true, color: Color.pink }
  )

  setBlocks(newBlocks)
}

const addSnake = () => {
  const newBlocks: IBlock[] = blocks()
  newBlocks.push(
    { x: 4, y: 0, active: true, color: Color.purple },
    { x: 5, y: 0, active: true, color: Color.purple },
    { x: 3, y: 1, active: true, color: Color.purple },
    { x: 4, y: 1, active: true, color: Color.purple }
  )

  setBlocks(newBlocks)
}

const addZnake = () => {
  const newBlocks: IBlock[] = blocks()
  newBlocks.push(
    { x: 3, y: 0, active: true, color: Color.red },
    { x: 4, y: 0, active: true, color: Color.red },
    { x: 4, y: 1, active: true, color: Color.red },
    { x: 5, y: 1, active: true, color: Color.red }
  )

  setBlocks(newBlocks)
}

const addEpsilon = () => {
  const newBlocks: IBlock[] = blocks()
  newBlocks.push(
    { x: 4, y: 0, active: true, color: Color.yellow },
    { x: 3, y: 1, active: true, color: Color.yellow },
    { x: 4, y: 1, active: true, color: Color.yellow },
    { x: 5, y: 1, active: true, color: Color.yellow }
  )

  setBlocks(newBlocks)
}

export const Tetromino = {
  create: () => {
    const random = Math.floor(Math.random() * 7)

    const creators = [addLine, addSquare, addRight, addLeft, addSnake, addZnake, addEpsilon]

    creators[random]()
  },
}
