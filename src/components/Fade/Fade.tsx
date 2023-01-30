import cn from 'classnames/bind'
import { useRef } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import styles from './index.module.css'
const cx = cn.bind(styles)

const TRANSITION_CLASSNAMES = {
  enter: cx('enter'),
  enterActive: cx('enterActive'),
  exit: cx('exit'),
  exitActive: cx('exitActive'),
}

interface FadeProps {
  children: JSX.Element
  transitionKey: string
}

export const Fade = ({ children, transitionKey }: FadeProps) => {
  const nodeRef = useRef<HTMLElement | null>(null)
  return (
    <SwitchTransition mode={'out-in'}>
      <CSSTransition
        key={transitionKey}
        timeout={300}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        classNames={TRANSITION_CLASSNAMES}
      >
        <span ref={nodeRef}>{children}</span>
      </CSSTransition>
    </SwitchTransition>
  )
}
