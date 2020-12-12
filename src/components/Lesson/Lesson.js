import React, {useState} from 'react';
import { Div} from '@vkontakte/vkui';
import classes from './Lesson.module.css'
import Icon16UserOutline from '@vkontakte/icons/dist/16/user_outline';
import Icon28BookOutline from '@vkontakte/icons/dist/28/book_outline';
import Icon16Place from '@vkontakte/icons/dist/16/place';

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
    </Div>
  )

}
export default Lesson;