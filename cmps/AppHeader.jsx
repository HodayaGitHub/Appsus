import { AppSearch } from "./AppSearch.jsx"

const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header full-width">
            <label className="hamburger-menu">
                <span>Menu</span>
                <input className="hamburger-menu-checkbox" type="checkbox" />
            </label>
            <NavLink className="app-logo" to="/">
                <span>App Logo</span>
            </NavLink>
            <AppSearch />
            <button className="support-menu">
                Support
            </button>
            <button className="settings-menu">
                Settings
            </button>
            <button className="apps-memu">
                Apps
            </button>
            <NavLink className="user-img-container" to="/">
                <img className="user-img" src="assets/img/icons/user-img.png" alt="" />
            </NavLink>
        </header>
    )
}