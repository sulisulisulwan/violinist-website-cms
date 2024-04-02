import * as React from 'react'
import App from './App'
import * as ReactDom from 'react-dom/client'
import "./main.css"

const container = document.getElementById('app')
const root = ReactDom.createRoot(container)

root.render(<App/>)