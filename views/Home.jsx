import { AppHeader } from "../cmps/AppHeader.jsx"
import { AppAside } from "../cmps/AppAside.jsx"

export function Home() {
    return (
        <React.Fragment>
            <AppHeader />
            <AppAside />
            <main className="home">
                <h1>Welcome to home page!</h1>
            </main>
        </React.Fragment>
    )
}