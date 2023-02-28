import type { Component } from 'solid-js'

import logo from './logo.svg'
import './app.css'
import { Grid } from './components/Grid'

const App: Component = () => {
  return (
    <div class='flex justify-center items-center min-h-screen'>
      <Grid />
    </div>
  )
}

export default App
