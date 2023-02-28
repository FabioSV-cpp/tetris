import { Component } from 'solid-js'
import className from 'classnames'

interface BlockProps {
  color?: string
  x?: number
  y?: number
}

export const Block: Component<BlockProps> = ({ color = 'white', x, y }) => {
  const divClass = className('border bg-white w-10 h-10', {
    absolute: x !== undefined && y !== undefined,
  })

  return (
    <div
      class={divClass}
      style={{
        background: color,
        left: `${(x || 0) * 40}px`,
        top: `${(y || 0) * 40}px`,
      }}
    />
  )
}
