import React from "react";
import { Menu } from "antd";

import {
  UserAddOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import NewUser from "../NewUser/NewUser";
import AllUsers from "../AllUsers/AllUsers";

import "./MainPage.css";

class mainPage extends React.Component {
  state = {
    current: "ALL USERS",
  };

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  changeTabHandler() {
    this.setState({current: "ALL USERS"})
    console.log(this.state)
  }

  render() {
    const { current } = this.state;
    return (
      <React.Fragment
        <div className="mainPage">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            theme="light"
            className="menu"
          >
            <Menu.Item key="ALL USERS" icon={<UnorderedListOutlined />}>
              ALL USERS
            </Menu.Item>
            <Menu.Item key="NEW USER" icon={<UserAddOutlined />}>
              NEW USERS
            </Menu.Item>
          </Menu>
          <div className="content">
            {this.state.current === "ALL USERS" ? <AllUsers /> : <NewUser changeTab={() => this.changeTabHandler()}/>}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default mainPage;
