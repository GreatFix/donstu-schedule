import React, {useState} from 'react';
import {Cell, Caption} from '@vkontakte/vkui';
import Icon24ChevronLeft from '@vkontakte/icons/dist/24/chevron_left';
import Icon24ChevronRight from '@vkontakte/icons/dist/24/chevron_right';
const Lesson = (props) =>{
  let [curLesson,setCurLesson]= useState('left');
  let length = props.lesson.length;
  let lesson = {}

  curLesson==='left'
  ?lesson= props.lesson[0]
  :lesson= props.lesson[1];

  return (
    <Cell 
      size="l" 
      asideContent={length!==1 ?
        <div style={{ display: 'flex', margin: '0px',padding: '0px',justifyContent: 'flex-end' }}>
          <button onClick={()=>{ setCurLesson('left') } } style={{ 
            fontSize: "10px",
            border: "2px",
            boxSizing:'border-box',
            borderRadius: "4px",
            lineHeight: "5px",
            fontWeight: 500,
            padding: "5px 5px",
            color: "#00C0FF" }}
            >
              <Icon24ChevronLeft width={12} height={12}/>
            </button>

            <button onClick={()=>{ setCurLesson('right') } } style={{ 
            fontSize: "10px",
            border: "2px",
            borderRadius: "4px",
            boxSizing:'border-box',
            lineHeight: "5px",
            fontWeight: 500,
            padding: "5px 5px",
            marginLeft: "8px",
            color: "#00C0FF" }}
            >
              <Icon24ChevronRight width={12} height={12}/>
            </button>
        </div>
        : null
      }
    >
        <Caption level="4" weight="bold" style={{ marginBottom: 4 }}>Время: {lesson.start}-{lesson.end}     <span style={{ position: 'absolute',right: 5 }}>{lesson.type}</span></Caption>
        <p style={{ 
            fontSize: "8px",
            fontWeight: 600,
            margin: 0
          }}
        >Преподаватель: {lesson.teacher}
        </p>               
        <p style={{ 
            fontSize: "8px",
            fontWeight: 600,
            margin: 0
          }}
        >Предмет: {lesson.name} </p>
        <span style={{
          position: 'absolute',
          right: 5,
          bottom: 5,
          fontSize: "8px",
          fontWeight: 600,
          margin: 0
          }} > Аудитория: {lesson.aud} </span>
        
    </Cell>
  )

}
export default Lesson;