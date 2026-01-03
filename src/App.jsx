import './App.css'
import CardsPotrait from './components/CardsPotrait'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
  //  <main>
    <>
      <CardsPotrait/>
      <Analytics />
    </>
  //  </main>
  )
}

export default App
