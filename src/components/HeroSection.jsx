import { Link } from 'react-router-dom'
import ScrollAnimation from './ScrollAnimation.jsx'
import '../styles/HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <ScrollAnimation />
      <div className="hero-overlay" />
      <div className="hero-copy">
        <span className="hero-tag">The Apex Predator Series</span>
        <h1>
          TAG <span>ON</span> TOP
        </h1>
        <p>
          Command the stage with Team Apex's signature competitive streetwear. Built for champions who move fast, think sharp, and own every arena.
        </p>
        <div className="hero-actions">
          <Link to="/customize-jersey" className="btn btn-primary">
            Customize Your Jersey
          </Link>
          <a href="#about-apex" className="btn btn-secondary">
            About Apex
          </a>
        </div>
      </div>
    </section>
  )
}
