import React, {useState, useEffect} from 'react'
import { View, Caption,PanelSpinner,PullToRefresh, Headline,Title, HorizontalScroll,FixedLayout,Tabs,PanelHeader,TabsItem,Panel,List, Snackbar} from '@vkontakte/vkui';
import axios from 'axios'
//import bridge from '@vkontakte/vk-bridge';
import Lesson from '../../components/Lesson/Lesson'
import classes from './Schedule.module.css'
import Icon28CancelCircleFillRed from '@vkontakte/icons/dist/28/cancel_circle_fill_red';
//const osName = platform();

const DAYS_WEEK = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]
const dataToState = (data) =>{

  const dateToDay=(date)=>{
    let temp = date.split('-')[2]
    if(/^0/.test(temp))
      return temp.split('')[1];
    else
      return temp;
  }

  if(data){
    let days ={};
    let lessons = Object.keys(data.rasp)

    lessons.forEach(les => {
      let key = data.rasp[les].дата.split('T')[0];
      if(!days[key]){
        days[key]={
          dayWeek:'',
          day:'',
          lessons:{}
        }
      }
      if(!days[key].dayWeek)  
        days[key].dayWeek = data.rasp[les].день_недели ;
        
        if(!days[key].dayWeekNum)  
        days[key].dayWeekNum = data.rasp[les].деньНедели ;

      if(!days[key].day) {
        days[key].date = key ;
        days[key].day = dateToDay(key)
      }

      const start = data.rasp[les].начало.replace('-',':');
      const end = data.rasp[les].конец.replace('-',':');
      if(!days[key].lessons[`${start}-${end}`])
         days[key].lessons[`${start}-${end}`] = {}
        ;
      
      let type = ''
       switch(data.rasp[les].дисциплина.split(' ')[0]){
        case 'лек': type = 'Лекция'; break;
        case 'лаб': type = 'Лабораторная'; break;
        case 'пр.': type = 'Практика'; break;
        default: type = '';
      }
      let number =0;
      switch(start){
        case '8:30': number = 1; break;
        case '10:15': number = 2; break;
        case '12:00': number = 3; break;
        case '14:15': number = 4; break;
        case '16:00': number = 5; break;
        case '17:45': number = 6; break;
        default: number = 0;
      }

      const name= data.rasp[les].дисциплина.split(' ').slice(1).join(' ');
      const aud= data.rasp[les].аудитория;
      const teacher= data.rasp[les].преподаватель;
      
      days[key].lessons[`${start}-${end}`][data.rasp[les].код]={
        start,
        end,
        name,
        aud,
        teacher,
        type,
        number
      }

    })

    let temp = {
      WeekID: data.info.selectedNumNed,
      Day: data.info.curNumNed,
      Semester: data.info.curSem,
      Year: data.info.year,
      GroupName: data.info.group.name,
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
let GROUP_ID = localStorage.getItem('GROUP_ID');



    let [curDay, setCurDay] = useState(curDate(new Date()));
    let [data, setData] = useState({})
    let [fetching, setFetching] = useState(false)
    let [initFetching, setInitFetching] = useState(true);
    let [errorFetch, setErrorFetch] = useState(null);


    
    const onRefresh = ()=>{
        setFetching(true);
        getSchedule();
    }

    const getSchedule = async () => {
        const result = await axios({url:
          `https://edu.donstu.ru/api/Rasp?idGroup=${GROUP_ID}&sdate=${curDay}`,crossDomain: true}
        );
        if(result.data.data.rasp && GROUP_ID){
            let tempData = dataToState(result.data.data);
            setData(tempData);
            sessionStorage.setItem('SCHEDULE', JSON.stringify(tempData));
            setErrorFetch(null);
        } else {
            setErrorFetch('Неудачный запрос к API');
        }
        setInitFetching(false);
        setFetching(false);
    };

    useEffect(()=>{
      if(sessionStorage.getItem('SCHEDULE')){
        setData(JSON.parse(sessionStorage.getItem('SCHEDULE')));
        setInitFetching(false);
    }
      else 
        getSchedule();
    },[])


    return(

        <View id="shedule" activePanel="active">
              <Panel className={classes.Panel__in} id="active">
              <PanelHeader > Расписание </PanelHeader>
                {initFetching
                ?   <PanelSpinner />
                :<PullToRefresh  onRefresh={onRefresh} isFetching={fetching}>
                    {errorFetch && !initFetching
                    ?  <Snackbar
                            layout="vertical"
                            onClose={()=> {setInitFetching(true); }}
                            action="Повторить загрузку"
                            onActionClick={() => {onRefresh(); }}
                            before={<Icon28CancelCircleFillRed/>}
                            duration="60000"
                        >
                            Error:{errorFetch}
                        </Snackbar>
                    :data.days[curDay] 
                      ? <div>
                          <Title level="3" weight="semibold" style={{ padding:8,textAlign: 'center', backgroundColor: '#FFFFFF' }}>{data.days[curDay].dayWeek}</Title>
                          <List className={classes.List} style={{overflow: 'visible'}}>
                            {
                              Object.keys(data.days[curDay].lessons).map((item, index) => {
                                return (
                                        <Lesson key={index} lesson={data.days[curDay].lessons[item]} />
                                )
                              })
                            }
                          </List> 
                        </div>
                      :<Title level="3" weight="semibold" style={{ margin: 0, padding:10,textAlign: 'center' }}>Сегодня пар нет - раслабься)</Title>
                    
                 
                    }
                </PullToRefresh>
                 }
              
                 <FixedLayout  vertical="bottom">
                <Tabs>
                <HorizontalScroll>
                      {data.days 
                        ? Object.keys(data.days).map((date)=> {
                            return (
                              <TabsItem
                                key={Math.random()}
                                onClick={() =>  setCurDay(data.days[date].date) }
                                selected={curDay === data.days[date].date}
                                className={classes.TabsItem}
                              >
                                <Headline weight="medium" style={{ marginBottom: 16 }}>{DAYS_WEEK[data.days[date].dayWeekNum]}</Headline>
                                <Caption level="4" weight="bold" caps>{data.days[date].day}</Caption>
                              </TabsItem>
                            )
                          })
                        : null
                      }
                  </HorizontalScroll>
                </Tabs>
                </FixedLayout >
                </Panel>
          </View>
    )
}

export default Schedule;
