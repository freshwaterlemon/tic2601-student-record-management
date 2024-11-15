import './Login.css'

const Login = () => {
  return (
    <div className='loginform'>
      <form className="form">
        <p className="heading">Login</p>
        <input className="input" placeholder="Email" type="email" />
        <input className="input" placeholder="Password" type="text" />
        <button className="btn">Submit</button>
        <p className="reset-link">
          Forget Password? <a href="/">Reset</a>
        </p>
      </form>
    </div>
  )
}

export default Login