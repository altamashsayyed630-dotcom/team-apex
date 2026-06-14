import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../assets/tag.png'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Login', path: '/login' },
]

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="brand-bar">
        <img src={logo} alt="Team Apex" className="brand-logo" />
      </div>

      <nav className="site-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end={item.path === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}