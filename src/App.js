import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';
import View from '@vkontakte/vkui/dist/components/View/View';
import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import Icon20Users3Outline from '@vkontakte/icons/dist/20/users_3_outline';
import '@vkontakte/vkui/dist/vkui.css';

import Shedule from './views/schedule/Schedule';

const App = () => {
	let [activeStory,setActiveStory]=useState('feed');

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
                selected={activeStory === 'shedule'}
                data-story="shedule"
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
              </Panel>
            </View>
            <View id="shedule" activePanel="shedule">
				<Panel id="shedule">
              		<Shedule/>
			  	</Panel>
            </View>
            <View id="profile" activePanel="profile">
              <Panel id="profile">
                <PanelHeader>Профиль</PanelHeader>
              </Panel>
            </View>
          </Epic>

	);
}

export default App;

