import classes from './Nav.module.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/UserAuthContext";

const Nav = (props) => {

    const location = useLocation()
    const navigate = useNavigate()

    const {
        setLoggedClientId,
        setLoggedClientRef,
    } = useContext(AuthContext)

    const logoutHandler = () => {
        localStorage.removeItem('clientId')
        localStorage.removeItem('clientRef')
        setLoggedClientId('')
        setLoggedClientRef('')
        navigate('/login')
    }

    return (
        <nav>
            <div className={classes.navContainer}>
                <div className={classes.logo}>
                    <p>FLah<span>Tect</span></p>
                </div>
                <ul className={classes.links}>
                    {props.links.map(element => {
                        if (element === 'logout')
                            return <li onClick={logoutHandler} key={"li_" + element}>{element}  </li>
                        return <li key={"li_" + element}><Link to={`/${element}`} key={element}> {element} </Link>
                        </li>
                    })}
                </ul>
            </div>


        </nav>
    );
};

export default Nav;