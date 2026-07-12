import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import Details from './components/Details.jsx'
import Articles from './components/Articles.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path='/details' element={<Details />} />
          <Route path='/articles' element={<Articles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
