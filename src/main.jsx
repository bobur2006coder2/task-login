import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import "./index.css"
import 'virtual:windi.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
