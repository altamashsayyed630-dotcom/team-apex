import '../styles/Signup.css'

export default function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Account created!')
  }

  return (
    <div className="auth-header">
      <section className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <input type="text" placeholder="Enter Name" required />
          </div>
          <div className="auth-form-group">
            <input type="email" placeholder="Enter Email ID" required />
          </div>
          <div className="auth-form-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="auth-form-group">
            <input type="password" placeholder="Confirm Password" required />
          </div>
          <input type="submit" value="Sign Up" />
          <p>Already have an account? <a href="/login">Login Here</a></p>
        </form>
      </section>
    </div>
  )
}