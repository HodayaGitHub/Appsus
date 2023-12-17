import { AppSearch } from "./AppSearch.jsx"

const { NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader(props) {

    const [isMenuOpen, setMenuOpen] = useState(false);
    function toggleMenu() {
        setMenuOpen(prevState => !prevState);
    }
    return (
        <header className={`app-header full-width ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="menu-logo-container">

                <label className="hamburger-menu">
                    <div className="hamburger-menu-container" onClick={toggleMenu}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>

                    <input className="hamburger-menu-checkbox" type="checkbox" />
                </label>

                <NavLink className="app-logo" to="/">
                    <img className="logo-img" src="assets/img/icons/google_logo.png" alt="Google" />
                </NavLink>
            </div>
            {
                0 < Object.keys(props).length &&
                <AppSearch
                    SVG_ICONS={props.SVG_ICONS}
                    onSetFilterBy={props.onSetFilterBy}
                    filterBy={props.filterBy}
                />
            }

            <div className="logos-container">

                <NavLink to="/note">
                    <img className="logo-img" src="assets/img/icons/google_keep.png" alt="Note" />
                </NavLink>


                <NavLink to="/mail">
                    <img className="logo-img" src="assets/img/icons/gmail_icon.png" alt="Mail" />
                </NavLink>

                <NavLink to="/">
                    <img className="logo-img user-img" src="assets/img/icons/user_img_i.png" alt="user" />
                </NavLink>


            </div>
        </header>
    )
}