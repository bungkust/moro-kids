import React from 'react'
import { Routes, Route } from 'react-router-dom'
import QuizScreen from '@/pages/QuizScreen'
import Playground from '@/pages/Playground'
import GameScreen from '@/pages/GameScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizScreen />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/game" element={<GameScreen />} />
    </Routes>
  )
}

export default App
