import Nav from "./Nav";
import classes from "./DashboardLayout.module.scss"

const DashboardLayout = (props) => {

    const links = ["logout"]

    return (
        <div className={classes.dashLayoutContainer}>
            <Nav links={links} />
            <div className={classes.dashContainer}>
                {props.children}
            </div>
        </div>
    );
};

export default DashboardLayout;