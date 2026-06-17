import '../styles/About.css'

export default function About() {
  return (
    <>
      <section className="section-shell about-page">
        <div className="section-header">
          <span className="eyebrow">About Team Apex</span>
          <h2>More Than A Team. A Movement.</h2>
        </div>
        <div className="content-grid">
          <p>
            Team Apex Gaming is a rapidly growing esports organization built on passion, dedication, and the pursuit of greatness. From competitive battlegrounds to a thriving community of supporters, Team Apex represents players who refuse to settle for average.
          </p>
          <p>
            With hundreds of thousands of followers across social platforms and a loyal fan base known as the TAG Army, Team Apex continues to inspire the next generation of gamers and creators.
          </p>
          <p className="about-quote">"We Start At The Top And Go Beyond."</p>
        </div>
      </section>

      <section className="section-shell section-alt mission-shell">
        <div className="section-header">
          <span className="eyebrow">Our Mission</span>
        </div>
        <div className="content-grid">
          <p>
            To build a powerful esports culture where talent, hard work, and ambition come together. Every player, creator, and supporter is part of a journey focused on growth, excellence, and unforgettable moments.
          </p>
        </div>
      </section>

      <section className="section-shell jersey-story-shell">
        <div className="section-header">
          <span className="eyebrow">Official Team Apex Jersey</span>
          <h2>Every Stitch Represents The Journey</h2>
        </div>
        <div className="content-grid">
          <p>
            The Team Apex Jersey is more than apparel — it's a symbol of dedication, teamwork, and competitive spirit.
          </p>
          <p>
            Inspired by the journey of our players and community, every detail of this jersey reflects the determination required to compete at the highest level.
          </p>
          <ul className="jersey-story-list">
            <li>Every stitch tells a story.</li>
            <li>Every color carries a legacy.</li>
            <li>Every jersey represents the TAG Army.</li>
          </ul>
        </div>
      </section>

      <section className="section-shell section-alt performance-shell">
        <div className="section-header">
          <span className="eyebrow">Built For Performance</span>
        </div>
        <div className="content-grid">
          <p>
            Designed for gamers, creators, and fans alike, the Team Apex Jersey combines comfort, style, and performance.
          </p>
          <ul className="performance-list">
            <li>Premium Lightweight Fabric</li>
            <li>Breathable &amp; Comfortable Fit</li>
            <li>Esports Inspired Design</li>
            <li>Durable High-Quality Print</li>
            <li>Perfect For Gaming &amp; Everyday Wear</li>
          </ul>
          <p>
            Whether you're competing in tournaments, creating content, or supporting the team, this jersey is built to keep you at the top of your game.
          </p>
        </div>
      </section>
    </>
  )
}