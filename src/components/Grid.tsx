import { Component, For, onMount } from 'solid-js'
import { blocks, isActive, moveLeft, moveRight, tick } from '../stores/blocks'
import { grid } from '../stores/grid'
import { Tetromino } from '../stores/tetrominoes'
import { Block } from './Block'

export const Grid: Component = () => {
  Tetromino.create()

  setInterval(() => {
    if (isActive()) tick()
    else Tetromino.create()
  }, 300)

  onMount(() => {
    document.addEventListener('keydown', (ev: KeyboardEvent) => {
      if (ev.key === 'ArrowLeft') {
        moveLeft()
        return
      }

      if (ev.key === 'ArrowRight') {
        moveRight()
        return
      }
    })
  })

  return (
    <article id='grid' class='relative w-11/12 max-w-full max-h-[100vh]'>
      <For each={grid()} fallback={<div>Loading...</div>}>
        {item => (
          <div class='flex'>
            <For each={item} fallback={<div>Loading...</div>}>
              {() => <Block color='white' />}
            </For>
          </div>
        )}
      </For>

      <For each={blocks()}>{block => <Block color={block.color} x={block.x} y={block.y} />}</For>
    </article>
  )
}
