import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import About from './About.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Exp from './Exp.tsx'
import Stories from './Stories.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/experience" element={<Exp />} />
        <Route path="/stories" element={<Stories />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
