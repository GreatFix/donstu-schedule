import React from 'react'
import { Icon56MoonOutline } from '@vkontakte/icons'

import classes from './ToggleTheme.module.css'

const ToggleTheme = ({ onChangeTheme }) => {
  return (
    <Icon56MoonOutline className={classes.Icon} onClick={onChangeTheme} width={28} height={28} />
  )
}

export default React.memo(ToggleTheme)
