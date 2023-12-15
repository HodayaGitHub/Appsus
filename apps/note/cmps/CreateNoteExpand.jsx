


export function CraeteNoteExpand(props) {

    return (
        <div className="create-note-expand">
            <div
                className="title-input"
                contentEditable
                onFocus={() => console.log('focus')}
                onInput={() => console.log('input')}
                onChange={() => console.log('change')}
                onBlur={() => console.log('blur')}
            >
                Hello, world!
            </div>
            <div
                className="text-input"
                contentEditable
            >
                I am content editable!
            </div>
        </div>
    )
}