import React, {useState, useEffect} from 'react'
import { View, Caption,PanelSpinner,PullToRefresh, Title, HorizontalScroll,FixedLayout,Tabs,PanelHeader,TabsItem,Panel,List, Snackbar} from '@vkontakte/vkui';
import axios from 'axios'
import Lesson from '../../components/Lesson/Lesson'
import classes from './Schedule.module.css'
import Icon28CancelCircleFillRed from '@vkontakte/icons/dist/28/cancel_circle_fill_red';
//const osName = platform();

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

      if(!days[key].day) {
        days[key].date = key ;
        days[key].day = dateToDay(key)
      }
      if(!days[key].lessons[`${data.rasp[les].начало}-${data.rasp[les].конец}`])
         days[key].lessons[`${data.rasp[les].начало}-${data.rasp[les].конец}`] = {}
        ;
      
      let type = ''
       switch(data.rasp[les].дисциплина.split(' ')[0]){
        case 'лек': type = 'Лекция'; break;
        case 'лаб': type = 'Лабораторная'; break;
        case 'пр.': type = 'Практика'; break;
        default: type = '';
      }

      
      days[key].lessons[`${data.rasp[les].начало}-${data.rasp[les].конец}`][data.rasp[les].код]={
        start: data.rasp[les].начало,
        end: data.rasp[les].конец,
        name: data.rasp[les].дисциплина.split(' ').slice(1).join(' '),
        aud: data.rasp[les].аудитория,
        teacher: data.rasp[les].преподаватель,
        type: type
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
          'https://edu.donstu.ru/api/Rasp?idGroup=34915&sdate=2020-12-7',crossDomain: true}
        );
        if(result.status===200){
            let tempData = dataToState(result.data.data);
            setData(tempData);
            localStorage.setItem('SCHEDULE', JSON.stringify(tempData));
        } else {
            setErrorFetch('Неудачный запрос к API');
        }
        setInitFetching(false);
        setFetching(false);
    };

    useEffect(()=>{
        

      if(localStorage.getItem('SCHEDULE')){
        setData(JSON.parse(localStorage.getItem('SCHEDULE')));
        setInitFetching(false);
    }
      else 
        getSchedule();
    },[])

    console.log(data)
    return(

        <View id="shedule" activePanel="active">
              <Panel   id="active">
              <PanelHeader separator={false}> Расписание </PanelHeader>
                {initFetching
                ?   <PanelSpinner />
                :<PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
                    {errorFetch
                    ?  <Snackbar
                            layout="vertical"
                            onClose={()=> {}}
                            action="Повторить загрузку"
                            onActionClick={() => {onRefresh(); setErrorFetch(null)}}
                            before={<Icon28CancelCircleFillRed/>}
                        >
                            Error:{errorFetch}
                        </Snackbar>
                    :<div>
                    <Title level="3" weight="semibold" style={{ margin: 0, padding:10,textAlign: 'center' }}>{data.days[curDay].dayWeek}</Title>
                    <List className={classes.PanelPadding} style={{overflow: 'visible'}}>
                        {Object.keys(data.days[curDay].lessons).map((item, index) => {
                        return (
                            <div key={`key-${Math.random()}`} style={{ 
                                border: "2px solid #2975cc",
                                borderRadius: "5px",
                                boxSizing:'border-box',
                                margin: "5px"
                            }}>
                                <Lesson lesson={data.days[curDay].lessons[item]} />
                            </div>

                        )
                        })}
                    </List> 
                    </div>}
                </PullToRefresh>
                 }
              
                 <FixedLayout className={classes.Fixed} vertical="bottom">
                <Tabs>
                <HorizontalScroll>
                      {data.days 
                        ? Object.keys(data.days).map((date)=> {
                            return (
                              <TabsItem
                                key={Math.random()}
                                onClick={() =>  setCurDay(data.days[date].date) }
                                selected={curDay === data.days[date].date}
                              >
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
