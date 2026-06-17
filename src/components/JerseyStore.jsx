import { motion } from 'framer-motion'
import frontImage from '../jersey-front.png'
import backImage from '../jersey-back.png'
import '../styles/JerseyStore.css'

const stats = [
  { value: '313K+', label: 'YouTube Subscribers' },
  { value: '2.6M+', label: 'Total Views' },
  { value: '7+', label: 'Official Videos' },
  { value: 'India', label: 'Based Organization' }
]

const teamMembers = [
  { name: 'Player 1', role: 'IGL / Fragger' },
  { name: 'Player 2', role: 'Support' },
  { name: 'Player 3', role: 'Sniper' },
  { name: 'Player 4', role: 'Entry Fragger' },
]

export default function JerseyStore() {
  return (
    <>
      {/* ── ABOUT SECTION ── */}
      <section className="section-shell about-shell" id="about-apex">
        <div className="about-hero">
          <div className="about-hero-text">
            <span className="eyebrow">About Team Apex</span>
            <h2>We Start at the Top<br /><span className="accent-text">And Go Beyond.</span></h2>
            <p>Team Apex Gaming is a rapidly growing Indian esports organization focused on competitive BGMI and content creation. With over 313K+ subscribers on YouTube and millions of views across platforms, we represent dedication, performance, and the pursuit of excellence.</p>
            <div className="about-tags">
              <span className="tag">🎮 BGMI</span>
              <span className="tag">📹 Content Creation</span>
              <span className="tag">🇮🇳 India</span>
              <span className="tag">🏆 Esports</span>
            </div>
          </div>
          <div className="about-hero-quote">
            <blockquote>
              "We start at the top and go beyond."
            </blockquote>
            — Team Apex Gaming
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="section-shell stats-shell">
        <div className="section-header">
          <span className="eyebrow">Team Apex In Numbers</span>
          <h2>Our Impact</h2>
        </div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <motion.article
              key={stat.label}
              className="stat-card"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── TEAM MEMBERS ── */}
      <section className="section-shell team-shell">
        <div className="section-header">
          <span className="eyebrow">The Squad</span>
          <h2>Meet The Team</h2>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className="member-card"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="member-avatar">
                {member.name.charAt(0)}
              </div>
              <h3>{member.name}</h3>
              <span>{member.role}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── JERSEY SECTION ── */}
      <section className="section-shell section-alt story-shell">
        <div className="section-header">
          <span className="eyebrow">The Story Behind The Kit</span>
          <h2>Built For Champions</h2>
        </div>
        <div className="story-grid">
          <div className="story-copy">
            <p>Every stitch represents the journey. Every color represents the grind. Built for Team Apex athletes competing at the highest level.</p>
            <p>The Team Apex jersey combines comfort, performance, and identity for players who strive to perform under pressure.</p>
            <a href="/customize-jersey" className="btn btn-primary" style={{marginTop: '1rem', display: 'inline-flex'}}>
              Customize Your Jersey
            </a>
          </div>
          <div className="story-cards">
            <motion.div
              className="story-card"
              whileHover={{ scale: 1.02, y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="story-card-label">Front Jersey</div>
              <img src={frontImage} alt="Front Jersey" />
            </motion.div>
            <motion.div
              className="story-card"
              whileHover={{ scale: 1.02, y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="story-card-label">Back Jersey</div>
              <img src={backImage} alt="Back Jersey" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}