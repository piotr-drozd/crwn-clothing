import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";


import { signOutUser } from '../../utils/firebase.utils'

import '../navigation/navigation.styles.scss'


const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <div><CrownLogo className='logo' /></div>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        <div>SHOP</div>
                    </Link>

                    {currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className="nav-link" to='/auth'>
                            <div>SIGN IN</div>
                        </Link>
                    )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown></CartDropdown>}
            </div>
            <Outlet></Outlet>
        </Fragment>
    )
}

export default Navigation;

