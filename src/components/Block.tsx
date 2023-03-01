import { Component, createSignal } from 'solid-js'
import className from 'classnames'
import { dimensions } from '../stores/grid'

interface BlockProps {
  color?: string
  x?: number
  y?: number
}

const getWidth = (): number => Math.min((0.9 * window.innerWidth) / dimensions.width, 40)

const [width, setWidth] = createSignal(getWidth())

window.addEventListener('resize', () => setWidth(getWidth))

export const Block: Component<BlockProps> = ({ color = 'white', x, y }) => {
  const divClass = className('border border-gray-300 bg-slate-200 w-10 h-10', {
    absolute: x !== undefined && y !== undefined,
  })

  return (
    <div
      class={divClass}
      style={{
        background: color === 'white' ? '' : color,
        left: `${(x || 0) * width()}px`,
        top: `${(y || 0) * width()}px`,
        width: `${width()}px`,
        height: `${width()}px`,
      }}
    />
  )
}
