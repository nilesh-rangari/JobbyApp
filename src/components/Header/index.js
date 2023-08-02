import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <ul className="header-items-container">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="login-website-logo"
              alt="website logo"
            />
          </Link>
        </li>
        <li>
          <ul className="home-jobs-container">
            <Link to="/">
              <li className="home-jobs-item">Home</li>
            </Link>
            <Link to="/jobs">
              <li className="home-jobs-item">Jobs</li>
            </Link>
          </ul>
        </li>
        <li>
          <button type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
