import classes from './Nav.module.scss'
import { Link } from "react-router-dom";

const Nav = (props) => {
    return (
        <nav>
            <div className={classes.navContainer}>
                <div className={classes.logo}>
                    <p>FLah<span>Tect</span></p>
                </div>
                <ul className={classes.links}>
                    {props.links.map(element => {
                        return <li> <Link to={`/${element}`} key={element}> {element} </Link> </li>
                    })}
                </ul>
            </div>


        </nav>
    );
};

export default Nav;