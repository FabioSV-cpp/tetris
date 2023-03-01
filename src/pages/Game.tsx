import { useNavigate } from '@solidjs/router'
import { Component, createEffect, For, onMount } from 'solid-js'
import { Block } from '../components/Block'
import { Grid } from '../components/Grid'
import { blocks } from '../stores/blocks'
import { Game as GameObject } from '../stores/game'

export const Game: Component = () => {
  const navigate = useNavigate()
  GameObject.start()

  onMount(() => GameObject.attachGameListeners())

  createEffect(() => {
    if (GameObject.gameState() === GameObject.GameState.over) {
      navigate('/over', { replace: true })
    }
  })

  return (
    <div class='absolute bottom-2 m-auto flex justify-center items-center w-full'>
      <article id='grid' class='relative w-[90%] max-w-full max-h-[100vh] border border-gray-300'>
        <Grid />

        <For each={blocks()}>{block => <Block color={block.color} x={block.x} y={block.y} />}</For>
      </article>
    </div>
  )
}
