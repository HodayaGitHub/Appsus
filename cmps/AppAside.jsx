
export function AppAside({ buttons = [], dynamicClass }) {
    return (
        <aside className={`app-aside ${dynamicClass}`}>
            {buttons.map((button, index) => (
                <button key={index} onClick={button.onClick}>
                    <img
                        className="email-btn"
                        src={button.icon}
                        alt={button.alt}
                    />
                    {button.label}
                </button>
            ))}
        </aside>
    )
}
