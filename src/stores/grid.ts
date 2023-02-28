import { createSignal } from 'solid-js'

interface IBlock {
  active: boolean
  filled: boolean
  color?: string
}

const width = 10
const height = 20

export const dimensions = {
  width: 10,
  height: 20,
}

const createGrid = (): IBlock[][] =>
  Array.from(Array<IBlock>(height), () => {
    return new Array<IBlock>(width).fill({
      active: false,
      filled: false,
    })
  })

export const [grid, setGrid] = createSignal(createGrid())
