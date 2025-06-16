import Navbar from './Components/Navbar'
import { useState } from 'react'
import Table from './Components/Table'
import AddModalComponent from './Components/AddModal'
function App() {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto p-4">
        <AddModalComponent/>
      </div>
      <Table/>
    </> 
  )
}

export default App
