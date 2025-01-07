import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Navbar/Navbar.jsx'
import Table from './Table/Table.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Table/>
      <footer>
        <p>2025 Gabriel Gutierrez</p>
      </footer>
    </>
  )
}

export default App
