import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrownLogo} from "../../assets/crown.svg";

import '../navigation/navigation.styles.scss'

const Navigation = ()=>{

return(

    <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <div><CrownLogo className='logo' /></div>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    <div>Shop</div>
                </Link>
                <Link className="nav-link" to='/sign-in'>
                    <div>Sign In</div>
                </Link>
            </div>
        </div>
        <Outlet></Outlet>
    </Fragment>

)

}

export default Navigation;