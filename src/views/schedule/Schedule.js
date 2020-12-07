import React, {useState} from 'react'
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import List from '@vkontakte/vkui/dist/components/List/List';
import PanelHeaderContext from '@vkontakte/vkui/dist/components/PanelHeaderContext/PanelHeaderContext';
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import HorizontalScroll from '@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll';

//const osName = platform();

const Shedule = (props) => {
    let [activeTab, setActiveTab] = useState(1);
    return(
        <>
        <PanelHeader
        //   left={<PanelHeaderButton><Icon28CameraOutline /></PanelHeaderButton>}
        //   right={<PanelHeaderButton><Icon28AddOutline /></PanelHeaderButton>}
          separator={false}
        >
          <Tabs>
          <HorizontalScroll>
                {["1","2","3","4","5","6",'7',"8","9"].map(element => {
                    return (<TabsItem
                    key={element}
                    onClick={() =>  setActiveTab(element) }
                    selected={activeTab === element}
                    >
                    {element}
                    </TabsItem>)
                })}

            </HorizontalScroll>
          </Tabs>
          <Tabs>
          <HorizontalScroll>
                {["1","2","3","4","5","6",'7',"8","9"].map(element => {
                    return (<TabsItem
                    key={element+'asd'}
                    onClick={() =>  setActiveTab(element) }
                    selected={activeTab === element}
                    >
                    {element}
                    </TabsItem>)
                })}

            </HorizontalScroll>
          </Tabs>
        </PanelHeader>
        {/* <PanelHeaderContext
          opened={contextOpened}
          onClose={() => { this.setState({ contextOpened: false }) }}
        >
          <List>
            <Cell
              before={<Icon28UsersOutline />}
              asideContent={mode === 'all' ? <Icon24Done fill="var(--accent)" /> : null}
              onClick={this.select}
              data-mode="all"
            >
              Communities
            </Cell>
            <Cell
              before={<Icon28SettingsOutline />}
              asideContent={mode === 'managed' ? <Icon24Done fill="var(--accent)" /> : null}
              onClick={this.select}
              data-mode="managed"
            >
              Managed Communities
            </Cell>
          </List>
        </PanelHeaderContext> */}
        </>
    )
}

export default Shedule;
