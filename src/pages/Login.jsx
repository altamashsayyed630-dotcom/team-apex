import '../styles/Login.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Login successful!')
  }

  return (
    <div className="auth-header">
      <section className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <input type="email" placeholder="Enter Email ID" required />
          </div>
          <div className="auth-form-group">
            <input type="password" placeholder="Enter Password" required />
          </div>
          <input type="submit" value="Login" />
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </form>
      </section>
    </div>
  )
}