import { Suspense, useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import Three from './component/three'
import Cursor from "./component/Cursor"

function App() {
  return (
    <div>
      <Canvas id="three-canvas-container" shadows>
        <Suspense fallback={null}>
          <Three></Three>
        </Suspense>
      </Canvas>
      <Cursor />
    </div>
  )
}

export default App
