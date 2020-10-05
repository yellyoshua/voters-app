import React, { ReactNode, useState, memo } from "react";
import Tab from "react-rainbow-components/components/Tab";
import Tabset from "react-rainbow-components/components/Tabset";
import "./index.css";

type PropsTabs = {
  children?: ReactNode;
  tabs: {
    id: string;
    name: string;
    icon?: ReactNode;
  }[];
  initialTab?: number;
  onSelectTab: (tab: number) => void;
};

export default memo(function Tabs(props: PropsTabs) {
  const initialTab = props.initialTab || 0;
  const [currentTab, setCurrentTab] = useState<number>(initialTab);

  const navigateTab = (_e: React.MouseEvent<HTMLElement, MouseEvent>, tabId: string) => {
    const tabIndex = props.tabs.findIndex(tab => tab.id === tabId);
    props.onSelectTab(tabIndex);
    return setCurrentTab(tabIndex);
  };

  return (
    <>
      <Tabset onSelect={navigateTab} activeTabName={props.tabs[currentTab].id} className='rainbow-p-horizontal_x-large'>
        {props.tabs.map((tab, index) => (
          <Tab
            key={index}
            name={tab.id}
            label={
              <span>
                {tab.icon} {tab.name.toLocaleUpperCase()}
              </span>
            }
          />
        ))}
      </Tabset>
      <section className='tab-content'>{props.children}</section>
    </>
  );
});
