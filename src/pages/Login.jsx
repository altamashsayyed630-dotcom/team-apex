import '../styles/Login.css'

export default function Login() {
  return (
    <div className="auth-header">
      <section className="auth-box">
        <h2>Login</h2>
        <form>
          <div className="auth-form-group">
            <input type="email" placeholder="Enter Email ID" />
          </div>
          <div className="auth-form-group">
            <input type="password" placeholder="Enter Password" />
          </div>
          <input type="submit" value="Login" />
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </form>
      </section>
    </div>
  )
}