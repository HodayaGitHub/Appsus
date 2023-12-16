
const { useState, useEffect } = React

export function CraeteNoteExpand(props) {
    const [numElementsInFocus, setNumElementsInFocus] = useState(0)
    const [isInFocus, setIsInFocus] = useState(false)

    useEffect(() => {
        console.log('effect')
        setIsInFocus(0 < numElementsInFocus)
    }, [numElementsInFocus])

    return (
        <div className="create-note-expand">
        {
            isInFocus &&
            <div className="input-container">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onFocus={() => setNumElementsInFocus(prev => prev + 1)}
                    onInput={() => console.log('input')}
                    onChange={() => console.log('change')}
                    onBlur={() => setNumElementsInFocus(prev => prev - 1)}
                />
            </div>
        }
            <div className="input-container">
                <input
                    type="text"
                    name="text"
                    placeholder="Take a note..."
                    onFocus={() => setNumElementsInFocus(prev => prev + 1)}
                    onInput={() => console.log('input')}
                    onChange={() => console.log('change')}
                    onBlur={() => setNumElementsInFocus(prev => prev - 1)}
                />
            </div>
        </div>
    )
}