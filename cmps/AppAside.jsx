
export function AppAside({ buttons = [], dynamicClass }) {
    return (
        <aside className={`app-aside ${dynamicClass}`}>
            {buttons.map((button, index) => (
                <button
                    className={`${button.class}`}
                    key={index}
                    onClick={button.onClick}
                >

                    <span className={dynamicClass}> {button.icon}</span>
                    <span className="text">{button.text}</span>
                </button>
            ))}
        </aside>
    )
}
