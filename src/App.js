import React, { useState} from 'react';
import {Panel, PanelHeader, Epic, Tabbar, TabbarItem, View, Div} from '@vkontakte/vkui';

import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import '@vkontakte/vkui/dist/vkui.css';

import Schedule from './views/schedule/Schedule';
import Profile from './views/Profile/Profile';

const App = () => {
	let [activeStory,setActiveStory]=useState('feed');

    const onStoryChange = (event)=> {
        setActiveStory(event.currentTarget.dataset.story);
    }

 // bridge.send("VKWebAppStorageSet", {"key":"GROUP_ID", "value": "34915"});
	return (
		<Epic  activeStory={activeStory} tabbar={
            <Tabbar >
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
            
            <Profile id="profile"/>
          </Epic>

	);
}

export default App;

