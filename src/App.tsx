import type { Component } from 'solid-js'
import { A, Route, Router, Routes } from '@solidjs/router'
import { Game, GameOver } from './pages'
import './app.css'

const App: Component = () => {
  return (
    <div class='flex justify-center items-center min-h-screen bg-slate-200 font-mono'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <div class='flex flex-col justify-around items-center min-h-screen text-center'>
                <h1 class='text-6xl tracking-widest'>TETRIS</h1>
                <A href='/play' class='text-2xl border-gray-300 border-2 rounded-md w-fit py-2 px-8'>
                  Play
                </A>
              </div>
            }
          />
          <Route path='/play' component={Game} />
          <Route path='/over' component={GameOver} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
