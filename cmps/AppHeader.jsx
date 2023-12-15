import { AppSearch } from "./AppSearch.jsx"

const { NavLink } = ReactRouterDOM

export function AppHeader(props) {

    return (
        <header className="app-header full-width">
            <label className="hamburger-menu">
                <span>Menu</span>
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
            <button className="support-menu">
                Support
            </button>
            <button className="settings-menu">
                Settings
            </button>
            <button className="apps-memu">
                Apps
            </button>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink className="user-img-container" to="/">
                <img className="user-img" src="assets/img/icons/user-img.png" alt="" />
            </NavLink>
        </header>
    )
}