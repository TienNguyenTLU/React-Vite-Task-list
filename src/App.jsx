import Navbar from './Components/Navbar'
import { useState } from 'react'
import Table from './Components/Table'
import AddModalComponent from './Components/AddModal'
function App() {
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }
  return (
    <>

      <Navbar handleInputChange={handleInputChange} />
      <Table InputValue={input} />
    </> 
  )
}

export default App
