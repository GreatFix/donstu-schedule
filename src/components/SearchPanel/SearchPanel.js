import React, { useState } from 'react';
import bridge from "@vkontakte/vk-bridge";
import {PanelHeader, PanelHeaderBack, Search, List, SimpleCell} from '@vkontakte/vkui';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';

const SearchPanel = ({groups, faculty, kurs, goBack, onFiltersClick}) => {

  let [search, setSearch] = useState('');

    const onChange = (event) => setSearch(event.target.value);
    console.log(groups)
    const result = () => {
      return groups.filter((group) =>{
        return( 
          (group.name.toLowerCase().indexOf(search.toLowerCase()) === 0)
          && (faculty ? group.facul===faculty : true)
          && (kurs > 0 ? group.kurs===kurs : true)
        )
      });
    }

    const HandleClickGroup = (e) => {
      let cell = e.target;                    //Да, страшное зрелище, позже придумаю получше
      console.log(cell)
      while(!cell.classList.contains('SimpleCell')) 
        cell = cell.parentNode
      const group = groups[cell.id]
      console.log('id:'+cell.id+'group'+group)
      const id = group.id;
      const facul = group.facul;
      const name = group.name;

      bridge.send("VKWebAppStorageSet",{"key":"GROUP_ID", "value":id});
      sessionStorage.setItem("GROUP_ID", id);

      bridge.send("VKWebAppStorageSet",{"key":"FACULTY", "value":facul});
      sessionStorage.setItem("FACULTY", facul);

      bridge.send("VKWebAppStorageSet",{"key":"GROUP_NAME", "value":name});
      sessionStorage.setItem("GROUP_NAME", name);

      sessionStorage.setItem('SCHEDULE', '');

      goBack()
    }
      return (
        <>
          <PanelHeader left={<PanelHeaderBack onClick={goBack} />} separator={false}>
            <Search
              value={search}
              onChange={onChange}
              icon={<Icon24Filter />}
              onIconClick={onFiltersClick}
            />
          </PanelHeader>
          <List>
            {(search || kurs || faculty ) && result().map((group) => (
              <SimpleCell
                target={1}
                onClick={HandleClickGroup}
                id={group.key}//ключ элемента массива
                key={group.id}
                indicator={group.facul}
              >
                <span>{group.name}</span>
              </SimpleCell>
            ))}
          </List>
        </>
      );
    }

export default SearchPanel;