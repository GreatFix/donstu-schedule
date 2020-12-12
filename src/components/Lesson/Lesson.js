import React, {useState} from 'react';
import { Div} from '@vkontakte/vkui';
import classes from './Lesson.module.css'

const COLORS= {
  "1":'#32BE32',//'#00FF00',
  "2":'#CDC236',//'#40E0D0',
  "3":'#CD4036',//'#0FC0FC',
  "4":'#70CE9B',//'#BA55D3',
  "5":'#937ACC',//'#008080',
  "6":'#00BE96',//'#D40000',
}


const Lesson = (props) =>{
  let [curLesson,setCurLesson]= useState('left');
  let keys = Object.keys(props.lesson);
  let length = keys.length;
  let lesson = {}

  curLesson==='left'
  ?lesson= props.lesson[keys[0]]
  :lesson= props.lesson[keys[1]];

  return (
    <Div className={classes.Lesson}>
      <div className={classes.Rect} style={{backgroundColor: COLORS[lesson.number]}}>
        <span className={classes.Number}>{lesson.number}</span>
      </div>
      
      <span className={classes.Type}>{lesson.type}</span>

      <span className={classes.Aud} >{lesson.aud}</span>

      <div className={classes.Description}>
        <span className={classes.Name}>{lesson.name}</span>
        <span className={classes.Teacher}>{lesson.teacher}</span>
      </div>

      <div className={classes.Time}>
        <span className={classes.Start}>{lesson.start}</span>
        <div className={classes.Line} style={{backgroundColor: COLORS[lesson.number]}}></div>
        <span className={classes.End}>{lesson.end}</span>
      </div>  
    </Div>
  )

}
export default Lesson;