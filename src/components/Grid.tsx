import { Component, For, onMount } from 'solid-js'
import { blocks } from '../stores/blocks'
import { Game } from '../stores/game'
import { grid } from '../stores/grid'
import { Block } from './Block'

export const Grid: Component = () => {
  Game.start()

  onMount(() => Game.attachGameListeners())

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
