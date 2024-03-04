import myImg from '../assets/img/icons/hodaya1.png'
import linkedinIcon from '../assets/img/icons/linkedin.svg'
import gitIcon from '../assets/img/icons/square-github.svg'
import evelopeIcon from '../assets/img/icons/envelope-solid.svg'

export function CreatedBy() {

    return (
        <>
            <section className="created-by-container">

                <h1>About The Developer</h1>

                <section className="created-by">

                    <img src={myImg} />
                    <span className="created-by-desc">
                        <h4>This web app was created by Hodaya Ovadia</h4>
                        <span>
                            A passionate full-stack developer seeking a challenging role to utilize diverse skills
                            in front-end and back-end development
                        </span>
                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/hodaya-ovadia-8402889a/" target="_blank" rel="noopener noreferrer">
                                <img src={linkedinIcon} alt="LinkedIn" />
                            </a>
                            <a href="https://github.com/HodayaGitHub" target="_blank" rel="noopener noreferrer">
                                <img src={gitIcon} alt="GitHub" />
                            </a>
                            <a href="mailto:devHodaya@gmail.com">
                                <img src={evelopeIcon} alt="Email" />
                            </a>
                        </div>
                    </span>
                </section>
            </section>
        </>
    )
}