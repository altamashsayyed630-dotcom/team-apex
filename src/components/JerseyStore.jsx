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

export default function JerseyStore() {
  return (
    <>
      <section className="section-shell about-shell" id="about-apex">
        <div className="section-header">
          <span className="eyebrow">ABOUT TEAM APEX</span>
          <h2>Team Apex Gaming is a rapidly growing Indian esports organization focused on competitive BGMI and content creation.</h2>
          <p>With over 313K+ subscribers on YouTube and millions of views across platforms, Team Apex represents dedication, performance, and the pursuit of excellence.</p>
          <p className="section-tagline">"We start at the top and go beyond."</p>
        </div>
      </section>

      <section className="section-shell stats-shell">
        <div className="section-header">
          <span className="eyebrow">TEAM APEX IN NUMBERS</span>
          <h2>TEAM APEX IN NUMBERS</h2>
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

      <section className="section-shell section-alt story-shell">
        <div className="section-header">
          <span className="eyebrow">THE STORY BEHIND THE KIT</span>
          <h2>THE STORY BEHIND THE KIT</h2>
        </div>

        <div className="story-grid">
          <div className="story-copy">
            <p>Every stitch represents the journey. Every color represents the grind. Built for Team Apex athletes competing at the highest level.</p>
            <p>The Team Apex jersey combines comfort, performance, and identity for players who strive to perform under pressure.</p>
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
