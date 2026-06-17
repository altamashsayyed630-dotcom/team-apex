import { Link } from 'react-router-dom'
import ScrollAnimation from './ScrollAnimation.jsx'
import '../styles/HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <ScrollAnimation />
      <div className="hero-overlay" />
      <div className="hero-copy">
        <span className="hero-tag">Official Team Apex Jersey</span>
        <h1>
          TAG <span>ON</span> TOP
        </h1>
        <p>
          Every stitch represents the journey. Every color carries the legacy. Join the TAG Army and represent Team Apex with the official esports jersey designed for champions.
        </p>
        <div className="hero-actions">
          <Link to="/customize-jersey" className="btn btn-primary">
            Shop Now
          </Link>
          <a href="#about-apex" className="btn btn-secondary">
            About Apex
          </a>
        </div>
      </div>
    </section>
  )
}