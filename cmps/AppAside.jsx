
export function AppAside({ buttons = [], dynamicClass }) {
    return (
        <aside className={`app-aside ${dynamicClass}`}>
            {buttons.map((button, index) => (
                <button
                    className={`${button.classes}`}
                    key={index}
                    onClick={button.onClick}
                    >{button.content}
                </button>
            ))}
        </aside>
    )
}
