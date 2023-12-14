const { useState } = React

export function LongTxt({ txt , length}) {
  const [isLongTxtShown, setIsLongTxtShown] = useState(false)

  function onToggleLongTxt () {
    setIsLongTxtShown((prev) => !prev)
  }

  function getTxtToShow (isLongTxtShown, txt) {
    if (txt.length < length) return txt
    return isLongTxtShown ? txt : txt.substring(0, length) + '...'
  }

  const txtToShow = getTxtToShow(isLongTxtShown, txt)
  return (
    <section className='longTxt'>
      <p>{txtToShow}</p>
      {/* {txt.length > 100 && (
        <button onClick={onToggleLongTxt}>
          {isLongTxtShown ? 'Less...' : 'More...'}
        </button>
      )} */}
    </section>
  )
}
