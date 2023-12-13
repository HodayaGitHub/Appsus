const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header full-width">
            <Link className="user-img-container" to="/">
                {/* <h3>LOGO!</h3> */}
                <img className="user-img" src="assets/img/icons/user-img.png" alt="" />
            </Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </header>
    )
}