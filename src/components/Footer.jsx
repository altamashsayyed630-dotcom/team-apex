import { Link } from 'react-router-dom'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <span className="footer-title">TEAM APEX</span>
          <Link to="/about">About Apex</Link>
          <Link to="/about#story">Jersey Story</Link>
          <a href="/" className="disabled-link">Team Roster</a>
        </div>

        <div className="footer-col">
          <span className="footer-title">CUSTOMER SUPPORT</span>
          <Link to="/contact">Contact Us</Link>
          <a href="/" className="disabled-link">Size Guide</a>
          <a href="/" className="disabled-link">Order Support</a>
        </div>

        <div className="footer-col">
          <span className="footer-title">QUICK LINKS</span>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/customize-jersey">Customize Jersey</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <span className="footer-title">FOLLOW TEAM APEX</span>
          <a href="https://www.youtube.com/@Team.ApexGaming" target="_blank" rel="noreferrer">
            <span className="social-link">YouTube</span>
          </a>
          <a href="https://www.instagram.com/team.apexgaming" target="_blank" rel="noreferrer">
            <span className="social-link">Instagram</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <span className="social-link">X (Twitter)</span>
          </a>
        </div>
      </div>
      <div className="footer-note">
        <span>© {new Date().getFullYear()} Team Apex. All rights reserved.</span>
      </div>
    </footer>
  )
}
