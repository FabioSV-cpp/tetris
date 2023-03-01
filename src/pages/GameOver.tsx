import { A } from '@solidjs/router'
import { Component } from 'solid-js'

export const GameOver: Component = () => {
  return (
    <article class='flex flex-col justify-around items-center min-h-screen text-center'>
      <h1 class='text-4xl tracking-widest'>Game over!</h1>

      <A href='/play' class='text-lg border-gray-300 border-2 rounded-md w-fit py-2 px-8'>
        Try again?
      </A>
    </article>
  )
}
