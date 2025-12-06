import React from 'react'
import { Routes, Route } from 'react-router-dom'
import QuizScreen from '@/pages/QuizScreen'
import Playground from '@/pages/Playground'

function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizScreen />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  )
}

export default App
