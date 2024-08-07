import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import TrickyQuestion from './TrickyQuestion.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TrickyQuestion />
    </BrowserRouter>
  </React.StrictMode>,
)
