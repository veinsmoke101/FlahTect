import Nav from "./Nav";
import classes from "./DashboardLayout.module.scss"

const DashboardLayout = (props) => {

    const routes = ["logout"]

    return (
        <div className={classes.dashLayoutContainer}>
            <Nav links={routes} />
            <div className={classes.dashContainer}>
                {props.children}
            </div>
        </div>
    );
};

export default DashboardLayout;