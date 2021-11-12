import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import style from './style.module.css';

const Navigation = () => {

    const handleLogout = () => {
        Auth.isLoggedOut();
    }

    return(
        <>
            <nav className={style.nav}>
                <ul>
                    { Auth.isLoggedIn(Auth.getToken()) ? <li><Link to = '/' onClick={handleLogout }>Logout</Link></li> : null }
                </ul>
            </nav>
        </>
    )
}

export default Navigation;