import React from 'react'
import Icon56MoonOutline from '@vkontakte/icons/dist/56/moon_outline'

import classes from './ToggleTheme.module.css'

const ToggleTheme = ({ onClickToggleTheme }) => {
  return <Icon56MoonOutline className={classes.Icon} onClick={onClickToggleTheme} width={28} height={28} />
}

export default ToggleTheme
