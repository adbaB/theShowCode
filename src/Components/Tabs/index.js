import React, { isValidElement, useEffect, useState } from "react";

export const Tab = ({ children, active = 0 }) => {
  const [activeTab, setActiveTab] = useState(active);
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    let data = [];
    React.Children.forEach(children, (element) => {
      if (!isValidElement(element)) return;

      const {
        props: { tab, children },
      } = element;

      data.push({ tab, children });
    });
    setTabsData(data);
  }, [children]);
  return (
    <div className="tab">
      <ul>
        {tabsData.map(({ tab }, index) => (
          <li className="active" key={index}>
            <button
              onClick={() => {
                setActiveTab(index);
              }}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div>{tabsData[activeTab] && tabsData[activeTab].children}</div>
    </div>
  );
};

const TabPane = ({ children }) => {
  return { children };
};

Tab.TabPane = TabPane;
