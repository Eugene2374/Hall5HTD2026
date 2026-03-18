import './App.css'
import { HashRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Home from './pages/Home'
import Registration from './pages/QRCode'
import QRScanner from './pages/Scanner'
import Zone from './pages/Zone'

function App() {
  return(
    <Router>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='QRCODE' element={<Registration />}/>
            <Route path='Scanner' element={<QRScanner />}/>
            <Route path='Zone' element={<Zone />}/>
          </Route>
      </Routes>
    </Router>
  )
}

// Create this new (or rename your current Home to Layout)
function Layout() {
  return (
      <main id='center'>
        <Outlet />
      </main>
  )
}

export default App
