
const { useState, useEffect } = React

export function CraeteNoteExpand(props) {
    const [isInFocus, setIsInFocus] = useState()

    function onFocus(ev) {
        setIsInFocus(true)
    }
    
    function onBlur(ev) {
        // setIsInFocus(false)
    }

    return (
        <div className="create-note-expand"
            onBlur={onBlur}
        >
        {
            isInFocus &&
            <div className="input-container">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onFocus={onFocus}
                    onInput={() => console.log('input')}
                    onChange={() => console.log('change')}
                />
            </div>
        }
            <div className="input-container">
                <input
                    type="text"
                    name="text"
                    placeholder="Take a note..."
                    onFocus={onFocus}
                    onInput={() => console.log('input')}
                    onChange={() => console.log('change')}
                />
            </div>
        </div>
    )
}