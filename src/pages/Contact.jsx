import '../styles/Contact.css'

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message sent! We will get back to you soon.')
  }

  return (
    <section className="section-shell contact-page">
      <div className="section-header">
        <span className="eyebrow">Connect with Apex</span>
        <h2>Ready to claim your gear?</h2>
        <p>Got questions about our jerseys, team, or collabs? Drop us a message and our squad will get back to you.</p>
      </div>

      <div className="contact-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" placeholder="Enter your name" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="Enter your email" required />
          </label>
          <label>
            Message
            <textarea rows="5" placeholder="Tell us what you need" required />
          </label>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>

        <div className="social-card">
          <h3>Follow Team Apex</h3>
          <div className="social-row">
            <a href="https://www.youtube.com/@Team.ApexGaming" target="_blank" rel="noreferrer" className="social-pill">YouTube</a>
            <a href="https://www.instagram.com/team.apexgaming" target="_blank" rel="noreferrer" className="social-pill">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-pill">X (Twitter)</a>
          </div>
        </div>
      </div>
    </section>
  )
}