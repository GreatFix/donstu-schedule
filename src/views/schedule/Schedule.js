import React, {useState} from 'react'
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import List from '@vkontakte/vkui/dist/components/List/List';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import HorizontalScroll from '@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll';
import { View, Div, Text } from '@vkontakte/vkui';


//const osName = platform();

const Shedule = (props) => {
    let [activeTab, setActiveTab] = useState(1);
    let [array, setArray] = useState({
      days:[{
        id:'1',
        day:1,
        lessons:[
           {
            start: '8:30',
            end: '10:00',
            teacher: 'Ядровская',
            name: 'Мультимедиа'
          },
          {
            start: '10:15',
            end: '11:50',
            teacher: 'Калайда',
            name: 'База данных'
          }
        ]
      },{
        id:'2',
        day:2,
        lessons:[
          {
           start: '8:30',
           end: '10:00',
           teacher: 'Ядровская',
           name: 'Мультимедиа'
         }
       ]
      },{
        id:'3',
        day:3,
        lessons:[
          {
           start: '8:30',
           end: '10:00',
           teacher: 'Ядровская',
           name: 'Мультимедиа'
         },
         {
           start: '10:15',
           end: '11:50',
           teacher: 'Калайда',
           name: 'База данных'
         },
         {
           start: '12:00',
           end: '13:35',
           teacher: 'Кизим',
           name: 'Серверные интернет технологии'
         }
       ]
      },{
        id:'4',
        day:4,
        lessons:[
          {
           start: '8:30',
           end: '10:00',
           teacher: 'Ядровская',
           name: 'Мультимедиа'
         },
         {
           start: '10:15',
           end: '11:50',
           teacher: 'Калайда',
           name: 'База данных'
         }
       ]
      },{
        id:'5',
        day:5,
        lessons:[]
      },{
        id:'6',
        day:6,
        lessons:[]
      },{
        id:'7',
        day:7,
        lessons:[]
      },{
        id:'8',
        day:8,
        lessons:[]
      },{
        id:'9',
        day:9,
        lessons:[]
      }]

    });
    return(
      <>
        <View id="shedule" activePanel={activeTab.toString()}>
          {array.days.map(day =>{
            return (
              <Panel key={`key-${Math.random()}`} id={day.id}>
              <PanelHeader separator={false}> Расписание </PanelHeader>

              <List>
                  {day.lessons.map((item, index) => {
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
                  
                    

                <FixedLayout vertical="bottom">
                <Tabs>
                <HorizontalScroll>
                      {array.days.map(el => {
                          return (<TabsItem
                          key={Math.random()}
                          onClick={() =>  setActiveTab(el.id) }
                          selected={activeTab === el.id}
                          >
                          {el.day}
                          </TabsItem>)
                      })}
                  </HorizontalScroll>
                </Tabs>
                </FixedLayout >
                </Panel>
              )
              }
            )}
          </View>
          
        </>
    )
}

export default Shedule;
