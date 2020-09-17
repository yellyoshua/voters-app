import React, { ReactNode, useState } from "react";
import Tab from "react-rainbow-components/components/Tab";
import Tabset from "react-rainbow-components/components/Tabset";

type PropsTabs = {
  children: ReactNode;
  tabs: {
    id: string;
    name: string;
    icon: ReactNode;
  }[];
  onSelectTab: (val: string) => void;
};

export default function Tabs(props: PropsTabs) {
  const [currentTab, setCurrentTab] = useState<string>(`${props.tabs[0] && props.tabs[0].id}`);

  const navigateTab = (_e: React.MouseEvent<HTMLElement, MouseEvent>, tabName: string) => {
    props.onSelectTab(tabName);
    return setCurrentTab(tabName);
  }

  return (
    <>
      <Tabset
        fullWidth
        onSelect={navigateTab}
        activeTabName={currentTab}
        className="rainbow-p-horizontal_x-large"
      >
        {
          props.tabs.map((tab, index) => (
            <Tab
              key={index}
              name={tab.id}
              label={
                <span>
                  {tab.icon} {tab.name.toLocaleUpperCase()}
                </span>
              }
            />
          ))
        }
      </Tabset>
    </>
  )
}