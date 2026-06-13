import { useState } from 'react'
import { motion } from 'framer-motion'
import frontImage from '../jersey-front.png'
import backImage from '../jersey-back.png'
import '../styles/CustomizeJersey.css'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function CustomizeJersey() {
  const [jerseyName, setJerseyName] = useState('')
  const [jerseyNumber, setJerseyNumber] = useState('')
  const [selectedSize, setSelectedSize] = useState('M')
  const [activeView, setActiveView] = useState('front')

  const handleSubmit = (event) => {
    event.preventDefault()
    window.alert(`Order configured:\nName: ${jerseyName || 'PLAYER'}\nNumber: ${jerseyNumber || '00'}\nSize: ${selectedSize}\nView: ${activeView.toUpperCase()}`)
  }

  return (
    <section className="section-shell section-alt configurator-shell">
      <div className="section-header">
        <span className="eyebrow">CUSTOM JERSEY CONFIGURATOR</span>
        <h2>Customize your Team Apex jersey with live preview and premium fit options.</h2>
        <p>Create your own Team Apex jersey with your name, number and size, then preview front and back before ordering.</p>
      </div>

      <div className="customizer-grid">
        <motion.div
          className="customizer-panel"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <span className="panel-badge">Create your kit</span>
          <div className="panel-head">
            <h3>Personalize every detail.</h3>
            <p>Configure your Team Apex jersey with a name, number and size selection. See your final kit reveal instantly.</p>
          </div>

          <form className="form-card" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                value={jerseyName}
                onChange={(event) => setJerseyName(event.target.value)}
                placeholder="Your in-game name"
                maxLength={12}
              />
            </label>

            <label>
              Jersey Number
              <input
                type="number"
                value={jerseyNumber}
                onChange={(event) => setJerseyNumber(event.target.value)}
                placeholder="00"
                min="0"
                max="99"
              />
            </label>

            <div>
              <span className="eyebrow">Size selector</span>
              <div className="size-selector">
                {sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`size-pill ${selectedSize === option ? 'active' : ''}`}
                    onClick={() => setSelectedSize(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow">Preview mode</span>
              <div className="view-toggle">
                <button
                  type="button"
                  className={`view-button ${activeView === 'front' ? 'active' : ''}`}
                  onClick={() => setActiveView('front')}
                >
                  Front View
                </button>
                <button
                  type="button"
                  className={`view-button ${activeView === 'back' ? 'active' : ''}`}
                  onClick={() => setActiveView('back')}
                >
                  Back View
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary order-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Order Your Jersey
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="preview-shell"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="preview-status">
            <span className="eyebrow">Live preview</span>
            <strong>{activeView === 'front' ? 'Front view' : 'Back view'}</strong>
          </div>

          <div className="jersey-preview">
            <img src={activeView === 'front' ? frontImage : backImage} alt={`${activeView} jersey preview`} />
            <div className="jersey-identity">
              <span>{jerseyName.trim() || 'PLAYER'}</span>
              <strong>{jerseyNumber.trim() ? `#${jerseyNumber}` : '#00'}</strong>
            </div>
          </div>

          <div className="preview-notes">
            <p>Choose your kit details with confidence. Every order is crafted for performance, comfort, and premium esports style.</p>
            <p>Selected size: <strong>{selectedSize}</strong> · {jerseyName.trim() ? 'Personalized name set' : 'Name pending'} · {jerseyNumber.trim() ? 'Number ready' : 'Add your number'}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
