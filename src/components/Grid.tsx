import { Component, For } from 'solid-js'
import { grid } from '../stores/grid'
import { Block } from './Block'

export const Grid: Component = () => {
  return (
    <For each={grid()} fallback={<div>Loading...</div>}>
      {item => (
        <div class='flex'>
          <For each={item} fallback={<div>Loading...</div>}>
            {() => <Block color='white' />}
          </For>
        </div>
      )}
    </For>
  )
}
