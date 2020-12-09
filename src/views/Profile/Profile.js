import React,{useState, useEffect} from 'react';
import classes from './Profile';
import bridge from '@vkontakte/vk-bridge';
import {View, Panel, PanelHeader} from '@vkontakte/vkui';
import axios from 'axios';

const getGroups = async () => {
    const result = await axios({url:
      'https://edu.donstu.ru/api/raspGrouplist?year=2020-2021',crossDomain: true}
    );

    return result.data;
}

const Profile = () => {

    bridge.send("VKWebAppStorageGet", {"keys": ["GROUP_ID"]}).then((res)=>{
        console.log(res)
    }) 
    return(

        <View id="profile" activePanel="active">
            <Panel id="active">
                <PanelHeader separator={false}> Профиль </PanelHeader>
                

            </Panel>
        </View>
    )

}

export default Profile;