import React, {useState, useEffect, useCallback} from 'react'
import { View,PanelSpinner,PullToRefresh,FixedLayout,PanelHeader,Panel, Snackbar} from '@vkontakte/vkui';
import axios from 'axios'

import SheduleDay from '../../components/SheduleDay/SheduleDay'
import classes from './Schedule.module.css'
import Icon28CancelCircleFillRed from '@vkontakte/icons/dist/28/cancel_circle_fill_red';

import { useSwipeable } from "react-swipeable";
import DayWeekTabs from '../../components/DayWeekTabs/DayWeekTabs';



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
    let [url, setUrl] = useState(false);
    let [errorFetch, setErrorFetch] = useState('')
    let [curWeekNum, setCurWeekNum] = useState(false);

    let [groupId, setGroupId] = useState(localStorage.getItem('GROUP_ID'));



  

    useEffect(()=>{
        setUrl(`https://edu.donstu.ru/api/Rasp?idGroup=${groupId}&sdate=${curDay}`);
    },[groupId,curWeekNum])


    const getSchedule = useCallback(
        () => {
            setFetching(true);
            axios({
                url:url,
                crossDomain: true,
                timeout:20000
            }).then(res =>{
                if(res.data.data.info.group.groupID==groupId && groupId){// eslint-disable-next-line
                        let tempData = dataToState(res.data.data);
                        setData(tempData);
                        sessionStorage.setItem('SCHEDULE', JSON.stringify(tempData));
                        setErrorFetch(null);
                        setInitFetching(false);
                        setFetching(false);
                } else if(!groupId){
                        setErrorFetch('Выберите свою группу в "Профиль"');
                    } 
            },(err => {
                setErrorFetch('Неудачный запрос к API');
                throw new Error(err)
            })
        ,[url]);
    })

    useEffect(()=>{
        if(url!=false){// eslint-disable-next-line
            if(curWeekNum){
                getSchedule();// eslint-disable-next-line
                setCurWeekNum(false)// eslint-disable-next-line
            }
            else 
                getSchedule();// eslint-disable-next-line
        }
    },[url])
 

            
    const onRefresh = ()=>{
        setFetching(true);
        getSchedule();
    }

    const onChangeCurDay=(date)=>{
        setCurDay(date)
    }



    const handlers = useSwipeable({
        onSwipedRight: () => {
            setCurDay((prev)=>{return toDate(new Date(+new Date(prev)-(+SEVEN_DAYS)))})
            setCurWeekNum(true)
        },
        onSwipedLeft: () => {
            setCurDay((prev)=>{return toDate(new Date(+new Date(prev)+(+SEVEN_DAYS)))})
            setCurWeekNum(true)
        }
    });


    return(
        <View id="shedule" activePanel="active">
            <Panel id="active">
                <PanelHeader> Расписание </PanelHeader>
                {initFetching
                    ?   <PanelSpinner />
                    :   <PullToRefresh  onRefresh={onRefresh} isFetching={fetching}>
                            <SheduleDay dayData={data.days[curDay]}/>
                        </PullToRefresh>
                }

                {!errorFetch 
                    ?   <div className={classes.SwiperWeek}  {...handlers} >
                            <FixedLayout vertical="bottom">
                                <DayWeekTabs days={data.days} onChangeCurDay={onChangeCurDay} curDay={curDay} />
                            </FixedLayout>
                        </div>
                    :  <Snackbar
                            layout="vertical"
                            onClose={()=> {setInitFetching(true); }}
                            action="Повторить загрузку"
                            onActionClick={() => {onRefresh(); }}
                            before={<Icon28CancelCircleFillRed/>}
                            duration="60000"
                        >
                            Error:{errorFetch}
                        </Snackbar>
                    }

            </Panel>
        </View>
    )
}

export default Schedule;
