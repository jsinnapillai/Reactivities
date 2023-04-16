import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilter = () => {
  return (
    <React.Fragment>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 30 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm Going" />
        <Menu.Item content="I'a Hosting" />
      </Menu>
      <Header />
      <Calendar />
    </React.Fragment>
  );
};

export default ActivityFilter;
