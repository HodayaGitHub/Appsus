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

        {/* <header className="app-header full-width"> */}
            <label className="hamburger-menu">
                {/* <span>Menu</span> */}
                <div className="hamburger-menu-container" onClick={toggleMenu}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>

                <input className="hamburger-menu-checkbox" type="checkbox" />
            </label>
            <NavLink className="app-logo" to="/">
                <span>App Logo</span>
            </NavLink>
            {
                0 < Object.keys(props).length &&
                <AppSearch
                    SVG_ICONS={props.SVG_ICONS}
                    onSetFilterBy={props.onSetFilterBy}
                    filterBy={props.filterBy}
                />
            }
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink className="user-img-container" to="/">
                <img className="user-img" src="assets/img/icons/user-img.png" alt="" />
            </NavLink>
        </header>
    )
}