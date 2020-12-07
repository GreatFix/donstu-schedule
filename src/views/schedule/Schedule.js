import React, {useState, useEffect} from 'react'
import { View, Div, Text, HorizontalScroll,FixedLayout,Tabs,PanelHeader,TabsItem,Panel,List, Cell} from '@vkontakte/vkui';
import axios from 'axios'

//const osName = platform();

const dataToState = (_data) =>{
  if(_data){
    let days ={};
    let lessons = Object.keys(_data.rasp)
    lessons.forEach(les => {
      let key = _data.rasp[les].дата.split('T')[0];
      if(!days[key]){
        days[key]={
          dayWeek:'',
          day:'',
          lessons:[]
        }
      }
      if(!days[key].dayWeek)  
        days[key].dayWeek = _data.rasp[les].день_недели ;

      if(!days[key].day) 
        days[key].day = key ;

      days[key].lessons.push({
        start: _data.rasp[les].начало,
        end: _data.rasp[les].конец,
        name: _data.rasp[les].дисциплина,
        aud: _data.rasp[les].аудитория,
        teacher: _data.rasp[les].преподаватель
      }) 

    })

    let temp = {
      WeekID: _data.info.selectedNumNed,
      Day: _data.info.curNumNed,
      Semester: _data.info.curSem,
      Year: _data.info.year,
      GroupName: _data.info.group.name,
      days: {...days}
    }

    return temp;  
  }
}

const curDate=(date)=>{
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}


const Schedule = (props) => {
    let [activeTab, setActiveTab] = useState(1);
    let [curDay, setCurDay] = useState(curDate(new Date()));
    let [data, setData] = useState({})
    let [query, setQuery] = useState(false)

  


    useEffect(()=>{
      const getSchedule = async () => {
        const result = await axios({url:
          'https://edu.donstu.ru/api/Rasp?idGroup=34915&sdate=2020-12-7',crossDomain: true}
        );

        setData(dataToState(result.data.data))
        setQuery(true)

      };
      getSchedule();
    },[])

    return(

        <View id="shedule" activePanel="active">
              <Panel  id="active">
              <PanelHeader separator={false}> Расписание </PanelHeader>
              {query
              ?<List>
                  {data.days[curDay].lessons.map((item, index) => {
                    return (
                      <Cell key={`key-${Math.random()}`}>
                        <Div>
                          {item.start}-{item.end}
                        </Div>
                        <Div>
                        <p >{item.name}</p>
                          {item.teacher}
                        </Div>
                      </Cell>
                    )
                  })}
              </List> 
              : null }

                 {/* <FixedLayout vertical="bottom">
                <Tabs>
                <HorizontalScroll>
                      {for(let el of data.days) {
                        retur<TabsItem
                        key={Math.random()}
                        onClick={() =>  setActiveTab(el.id) }
                        selected={activeTab === el.id}
                        >
                        {el.dayWeek}
                        </TabsItem>
                        }
                      }
                      
                      
                  </HorizontalScroll>
                </Tabs>
                </FixedLayout > */}
                </Panel>
          </View>
    )
}

export default Schedule;
