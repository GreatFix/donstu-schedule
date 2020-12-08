import React, { useState} from 'react';
//import bridge from '@vkontakte/vk-bridge';
import {Panel, PanelHeader, Epic, Tabbar, TabbarItem, View, Div} from '@vkontakte/vkui';

import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import '@vkontakte/vkui/dist/vkui.css';

import Schedule from './views/schedule/Schedule';

const App = () => {
	let [activeStory,setActiveStory]=useState('schedule');

    const onStoryChange = (event)=> {
        setActiveStory(event.currentTarget.dataset.story);
    }

	return (
		<Epic activeStory={activeStory} tabbar={
            <Tabbar>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'feed'}
                data-story="feed"
                text="Новости"
              ><Icon28NewsfeedOutline /></TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'schedule'}
                data-story="schedule"
                text="Расписание"
              ><Icon20CalendarOutline /></TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'profile'}
                data-story="profile"
                text="Профиль"
              ><Icon28UserCircleOutline /></TabbarItem>
            </Tabbar>
          }>
            <View id="feed" activePanel="feed">
              <Panel id="feed">
                <PanelHeader>Новости</PanelHeader>
                <Div>В разработке...</Div>
              </Panel>
            </View>

            <Schedule id="schedule" />
            
            <View id="profile" activePanel="profile">
              <Panel id="profile">
                <PanelHeader>Профиль</PanelHeader>
                <Div>В разработке...</Div>
              </Panel>
            </View>
          </Epic>

	);
}

export default App;

