import React, {useState, useEffect} from 'react'
import { View, Caption,PanelSpinner,PullToRefresh, Headline,Title,FixedLayout,Tabs,PanelHeader,TabsItem,Panel,List, Snackbar, Subhead} from '@vkontakte/vkui';
import axios from 'axios'
//import bridge from '@vkontakte/vk-bridge';
import Lesson from '../../components/Lesson/Lesson'
import classes from './Schedule.module.css'
import Icon28CancelCircleFillRed from '@vkontakte/icons/dist/28/cancel_circle_fill_red';
import Icon28ChevronUpOutline from '@vkontakte/icons/dist/28/chevron_up_outline';
import Icon28ChevronDownOutline from '@vkontakte/icons/dist/28/chevron_down_outline';
import { useSwipeable } from "react-swipeable";


const DAYS_WEEK = ['none',"Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const MONTH = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const TYPES_WEEK = ['none',"Верхняя", "Нижняя"];
const SEVEN_DAYS = 604800000;

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
    let received = false;
    lessons.length === 0 ?  received = false : received = true; //Проверка на наличие данных в расписании
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
        case '19:30': number = 7; break;
        case '21:15': number = 8; break;
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
      days: {...days},
      received: received,
      dateTimeFetch: toTime(new Date())
    }

    return temp;  
  }
}

function toTime(date){
  let h = date.getHours();
  let mm = date.getMinutes();
  if (mm < 10) mm = '0' + mm;
  let ss = date.getSeconds();
  if (ss < 10) ss = '0' + ss;

  return `${h}:${mm}:${ss}`;
}

function toDate(date){
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}


const Schedule = (props) => {
    let [curDay, setCurDay] = useState(toDate(new Date()));
    let [data, setData] = useState({})
    let [fetching, setFetching] = useState(false)
    let [initFetching, setInitFetching] = useState(true);
    let [errorFetch, setErrorFetch] = useState(null);
    let [curWeekNum, setCurWeekNum] = useState({});



    
    const onRefresh = ()=>{
        setFetching(true);
        getSchedule();
    }

    const getSchedule = async () => {
        setFetching(true);
        let GROUP_ID = localStorage.getItem('GROUP_ID');
        const result = await axios({url:
          `https://edu.donstu.ru/api/Rasp?idGroup=${GROUP_ID}&sdate=${curDay}`,crossDomain: true}
        );
        if(result.data.data.rasp && GROUP_ID){
            let tempData = dataToState(result.data.data);
            setData(tempData);
            sessionStorage.setItem('SCHEDULE', JSON.stringify(tempData));
            setErrorFetch(null);
        } else if(GROUP_ID){
          setErrorFetch('Неудачный запрос к API');
        } else {
          setErrorFetch('Выберите свою группу в "Профиль"');
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
        getSchedule();// eslint-disable-next-line
    },[])

    let typeWeek = classes.TypeWeek;
    data.WeekID===1
    ? typeWeek = classes.TypeWeek + ' ' + classes.TypeWeekTop
    : typeWeek = classes.TypeWeek + ' ' + classes.TypeWeekBottom;
    
    useEffect(()=>{
        getSchedule(); // eslint-disable-next-line
    },[curWeekNum])


    const handlers = useSwipeable({
      onSwipedRight: () => {
        setCurDay((prev)=>{return toDate(new Date(+new Date(prev)-(+SEVEN_DAYS)))})
        setCurWeekNum({})
      },
      onSwipedLeft: () => {
        setCurDay((prev)=>{return toDate(new Date(+new Date(prev)+(+SEVEN_DAYS)))})
        setCurWeekNum({})
      }
    });
    return(
        <View id="shedule" activePanel="active">
              <Panel id="active">
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
                      ? <div >
                          <Title level="3" weight="semibold" className={classes.Title}> 
                            {/* <div className={classes.DataTimeFetch}>Данные от: {data.dateTimeFetch}</div> проверка времени запроса          */}
                            {data.days[curDay].dayWeek}
                            <div className={typeWeek}>
                              { data.WeekID===1
                                ? <Icon28ChevronUpOutline width={20} height={20}/>
                                : <Icon28ChevronDownOutline width={20} height={20}/>
                              }
                              <Subhead >{TYPES_WEEK[data.WeekID]}</Subhead>
                            </div>
                          </Title>
                          
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
                      :<Title level="3" weight="semibold" style={{ margin: 0, padding:10,textAlign: 'center' }}>В этот день пар нет :)</Title>
                    
                 
                    }
                </PullToRefresh>
                 }
                <div className={classes.SwiperWeek}  {...handlers} >
                  <FixedLayout vertical="bottom">
                    <Tabs>
                        {data.received
                          ? Object.keys(data.days).map((date, index)=> {
                                let month = MONTH[new Date(data.days[date].date).getMonth()]
                              return (
                                <TabsItem
                                  key={index}
                                  onClick={() =>  setCurDay(data.days[date].date) }
                                  selected={curDay === data.days[date].date}
                                  className={classes.TabsItem}
                                >
                                  <Headline weight="medium" style={{ marginBottom: 8 }}>{DAYS_WEEK[data.days[date].dayWeekNum]}</Headline>
                                  <Caption level="4" weight="bold" caps>{data.days[date].day}</Caption>
                                  <Caption level="4" weight="regular">{month}</Caption>
                                </TabsItem>
                              )
                            })
                          :!errorFetch && <TabsItem> <Title level="3" weight="semibold">На этой неделе пар нет :)</Title></TabsItem>
                        }
                    </Tabs>
                  </FixedLayout>
                </div>
              </Panel>
          </View>
    )
}

export default Schedule;
