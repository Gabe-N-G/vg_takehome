import Navbar from './Navbar/Navbar.jsx'
import Table from './Table/Table.jsx'
import './App.css'

function App() {

  return (
    <div class="flex flex-col min-h-screen">
     <Navbar />

    <div>
      <Table />
    </div>

    <footer class="bg-black text-white text-left p-6 mt-auto">
      <p>2025 Gabriel Gutierrez</p>
    </footer>
</div>
  )
}

export default App
