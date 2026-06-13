import AppRoutes from './routes/AppRoutes.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
