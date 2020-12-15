import React, { useState, useEffect } from 'react';
import { Div } from '@vkontakte/vkui';
import classes from './Lesson.module.css'
import Icon16UserOutline from '@vkontakte/icons/dist/16/user_outline';
import Icon28BookOutline from '@vkontakte/icons/dist/28/book_outline';
import Icon16Place from '@vkontakte/icons/dist/16/place';
import { useSwipeable } from "react-swipeable";

import { Transition  } from 'react-transition-group'

const COLORS= {
  "1":'#32BE32',
  "2":'#CDC236',
  "3":'#DF5248',
  "4":'#70CE9B',
  "5":'#937ACC',
  "6":'#00BE96',
  "7":'#87C859',
  "8":'#1C4FBB'
}


const Lesson = (props) =>{
  let [curLesson,setCurLesson]= useState('left');
  const [anim, setAnim] = useState(true)
    
    
  useEffect(()=>{
      setAnim(false);
      setTimeout(()=>setAnim(true),150)
  },[curLesson])


  let keys = Object.keys(props.lesson);
  let length = keys.length
  let lesson = {}

  let pagItem_1 = ''
  let pagItem_2 = ''

  if(length===2){
    if(curLesson==='left'){
      lesson = props.lesson[keys[0]];
      pagItem_1=classes.Active;
    }else{
      lesson = props.lesson[keys[1]];
      pagItem_2=classes.Active;
    }
  }
  else{
    lesson = props.lesson[keys[0]]
  }

  const handlers = useSwipeable({
    onSwipedRight: () => {
      if(length===2) 
        setCurLesson('left')
    },
    onSwipedLeft: () => {
      if(length===2)
        setCurLesson('right')
    }
  });

  const defaultStyle = {
    transition: `opacity 150ms linear`,
    opacity: 0,
  }
  
  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0.6 },
    exited:  { opacity: 0.6 },
  };

  return (
    <div {...handlers}>
      <Transition  in={anim} timeout={50} classNames="node">{state=>(
        <Div style={{...defaultStyle, ...transitionStyles[state]}} className={classes.Lesson}>
          <div className={classes.Rect} style={{backgroundColor: COLORS[lesson.number]}}>
            <span className={classes.Number}>{lesson.number}</span>
          </div>
          
          <span className={classes.Type}>{lesson.type}</span>

          <div className={classes.Aud}>
            <Icon16Place/>
            <span>{lesson.aud}</span>
          </div>
          

          <div className={classes.Description}>
            <div className={classes.Name}>
              <Icon28BookOutline width={16} height={16}/>
              <span>{lesson.name}</span>
            </div>

            <div className={classes.Teacher}>
              <Icon16UserOutline/>
              <span>{lesson.teacher}</span>
            </div>
          </div>

          <div className={classes.Time}>
            <span className={classes.Start}>{lesson.start}</span>
            <div className={classes.Line} style={{backgroundColor: COLORS[lesson.number]}}></div>
            <span className={classes.End}>{lesson.end}</span>
          </div>
          {length===2 
            ? <div className={classes.Pagination}>
                <div className={pagItem_1}></div>
                <div className={pagItem_2}></div>   
              </div> 
            : null
          } 
        </Div>)}
      </Transition>
    </div>
  )

}
export default Lesson;