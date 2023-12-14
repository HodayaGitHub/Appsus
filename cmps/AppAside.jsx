export function AppAside({ buttons = [], dynamicClass }) {
    return (
        <aside className="app-aside">
            {/* div as a placeholder */}
            <div></div>
            {buttons.map((button, index) => (
                <button className="aside-btns" key={index} onClick={button.onClick}>
                    <img

                        src={button.icon}
                        alt={button.alt}
                    />
                    <span className="label">{button.label}</span>
                </button>
            ))}
        </aside>
    )
}
