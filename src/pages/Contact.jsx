import '../styles/Contact.css'

export default function Contact() {
  return (
    <section className="section-shell contact-page">
      <div className="section-header">
        <span className="eyebrow">Connect with Apex</span>
        <h2>Ready to claim your gear?</h2>
      </div>
      <form className="form-card">
        <label>
          Name
          <input type="text" placeholder="Enter your name" />
        </label>
        <label>
          Email
          <input type="email" placeholder="Enter your email" />
        </label>
        <label>
          Message
          <textarea rows="5" placeholder="Tell us what you need" />
        </label>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </section>
  )
}
