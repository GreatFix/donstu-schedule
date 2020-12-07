import React, {useState} from 'react'
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import List from '@vkontakte/vkui/dist/components/List/List';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import HorizontalScroll from '@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll';
import { View } from '@vkontakte/vkui';

//const osName = platform();

const Shedule = (props) => {
    let [activeTab, setActiveTab] = useState(1);
    return(
      <>
        <View id="shedule" activePanel="shedule">
          <Panel id="shedule">
          <PanelHeader separator={false}> Расписание </PanelHeader>

              <List>
                <Cell>Мультимедиа</Cell>
                <Cell>Мультимедиа</Cell>
                <Cell>Мультимедиа</Cell>
              </List>


            </Panel>
            <Panel id="2">
            <Tabs>
            <HorizontalScroll>
                  {["1","2","3","4","5","6",'7',"8","9"].map(element => {
                      return (<TabsItem
                      key={Math.random()}
                      onClick={() =>  setActiveTab(element) }
                      selected={activeTab === element}
                      >
                      {element}
                      </TabsItem>)
                  })}
              </HorizontalScroll>
            </Tabs>
            </Panel>
          </View>
        </>
    )
}

export default Shedule;
