import React from "react";
import { Tabs, Title, TabsItem } from "@vkontakte/vkui";

import DayWeekTabsItem from "./DayWeekTabsItem/DayWeekTabsItem";

const DayWeekTabs = ({ data, dispatchDate, curDate, style }) => {
  return (
    <Tabs style={{ ...style }}>
      {data.received ? (
        Object.keys(data.days).map((date, index) => {
          return (
            <DayWeekTabsItem
              key={index}
              dayWeek={data.days[date]}
              dispatchDate={dispatchDate}
              curDate={curDate}
            />
          );
        })
      ) : (
        <TabsItem>
          <Title level="3" weight="semibold">
            На этой неделе пар нет :)
          </Title>
        </TabsItem>
      )}
    </Tabs>
  );
};

export default DayWeekTabs;
