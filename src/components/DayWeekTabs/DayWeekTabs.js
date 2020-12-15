import React from 'react'
import {Tabs, Title, TabsItem} from '@vkontakte/vkui';

import DayWeekTabsItem from './DayWeekTabsItem/DayWeekTabsItem';

const DayWeekTabs = ({data, onChangeCurDay, curDay}) => {

    return(
        <Tabs>
            {data.received 
                ?   Object.keys(data.days).map((date, index)=> {
                        return(
                            <DayWeekTabsItem 
                                key={index} 
                                dayWeek={data.days[date]} 
                                onChangeCurDay={onChangeCurDay} 
                                curDay={curDay} 
                            />
                        )
                    })
                :   <TabsItem>
                        <Title level="3" weight="semibold">
                            На этой неделе пар нет :)
                        </Title>
                    </TabsItem>     
            }
        </Tabs>
    )
    
}

export default DayWeekTabs;