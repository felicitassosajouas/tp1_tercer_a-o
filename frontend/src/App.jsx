import { useState } from 'react'
import logo from './images/logo.png'
import Footer from './components/footer.jsx'
import Client from './components/Client/client.jsx'
import Vehicle from './components/Vehicle/vehicle.jsx'
import Repair from './components/Repair/repair.jsx'
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={logo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>TALLER AUTOFIX</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <Repair/>
        <Footer />
        <Client />

        <Vehicle/>
      </div>
    </>
  )
}

export default App
