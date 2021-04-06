import React, { useCallback } from 'react'
import './SliderSwitch.css'

const SliderSwitch = ({ title_1, title_2, value_1, value_2, onSwitch, value }) => {
  const handleClickButton_1 = useCallback(() => {
    onSwitch(value_1 ?? title_1)
  }, [onSwitch, title_1, value_1])

  const handleClickButton_2 = useCallback(() => {
    onSwitch(value_2 ?? title_2)
  }, [onSwitch, title_2, value_2])

  return (
    <div className="SliderSwitch">
      <input
        className="SliderSwitch--Input-1"
        hidden
        type="radio"
        name="SwitchInput"
        checked={value === (value_1 ?? title_1)}
        readOnly
      />
      <input
        className="SliderSwitch--Input-2"
        hidden
        type="radio"
        name="SwitchInput"
        checked={value === (value_2 ?? title_2)}
        readOnly
      />
      <button className="SliderSwitch--Item-1" onClick={handleClickButton_1}>
        <span>{title_1}</span>
      </button>

      <div className="SliderSwitch--MidleBorder" />

      <button className="SliderSwitch--Item-2" onClick={handleClickButton_2}>
        <span>{title_2}</span>
      </button>
    </div>
  )
}

export default SliderSwitch
