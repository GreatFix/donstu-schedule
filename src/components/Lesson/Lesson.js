import React, {useState} from 'react';
import { Div} from '@vkontakte/vkui';
import classes from './Lesson.module.css'

const COLORS= {
  "1":'#32BE32',//'#00FF00',
  "2":'#CDC236',//'#40E0D0',
  "3":'#CD4036',//'#0FC0FC',
  "4":'#BE31B7',//'#BA55D3',
  "5":'#20319D',//'#008080',
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
    <Div
      //size="l" 
      className={classes.Lesson}
      // asideContent={length!==1 
      //   ? <div className={classes.Aside}>
      //       <button onClick={()=>{ setCurLesson('left') } } >
      //           <Icon24ChevronLeft width={12} height={12}/>
      //       </button>
      //       <button onClick={()=>{ setCurLesson('right') } } style={{ marginLeft: "8px" }}>
      //         <Icon24ChevronRight width={12} height={12}/>
      //       </button>
      //     </div>
      //   : null
      // }
    >
      <span className={classes.Aud} >{lesson.aud}</span>
  
      <span className={classes.Type}>{lesson.type}</span>
      <span className={classes.Start}>{lesson.start}</span>
      <span className={classes.End}>{lesson.end}</span>
      <span className={classes.Name}>{lesson.name}</span>
      <span className={classes.Teacher}>{lesson.teacher}</span>
      <div className={classes.Rect} style={{backgroundColor: COLORS[lesson.number]}}>
        <span className={classes.Number}>{lesson.number}</span>
      </div>
      <div className={classes.Line} style={{backgroundColor: COLORS[lesson.number]}}></div>  
    </Div>
  )

}
export default Lesson;