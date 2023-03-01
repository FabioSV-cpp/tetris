import { createSignal } from 'solid-js'

interface IBlock {
  active: boolean
  filled: boolean
  color?: string
}

export const dimensions = {
  width: 10,
  height: 18,
}

const createGrid = (): IBlock[][] =>
  Array.from(Array<IBlock>(dimensions.height), () => {
    return new Array<IBlock>(dimensions.width).fill({
      active: false,
      filled: false,
    })
  })

export const [grid, setGrid] = createSignal(createGrid())
