import '../styles/Signup.css'

export default function Signup() {
  return (
    <div className="auth-header">
      <section className="auth-box">
        <h2>Sign Up</h2>
        <form>
          <div className="auth-form-group">
            <input type="text" placeholder="Enter Name" />
          </div>
          <div className="auth-form-group">
            <input type="email" placeholder="Enter Email ID" />
          </div>
          <div className="auth-form-group">
            <input type="password" placeholder="Password" />
          </div>
          <div className="auth-form-group">
            <input type="password" placeholder="Confirm Password" />
          </div>
          <input type="submit" value="Sign Up" />
          <p>Already have an account? <a href="/login">Login Here</a></p>
        </form>
      </section>
    </div>
  )
}