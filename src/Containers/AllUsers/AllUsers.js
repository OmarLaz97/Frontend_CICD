import React from "react";
import axios from "../../axios-user";
import { List, message } from "antd";

import "./AllUsers.css";

class allUsers extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios.get("/api/orientation/allusers").then((data) => {
      this.setState({ users: data.data });
    });
  }

  deletehandler = (data) => {
    axios
      .delete("/api/orientation/deleteuser", {
        params: {
          username: data.userName,
        },
      })
      .then((data) => {
        message.success(data.data);
        axios.get("/api/orientation/allusers").then((newUsers) => {
          this.setState({ users: newUsers.data });
        });
      })
      .catch((err) => {
        message.error(err.message.data);
      });
  };

  render() {
    return (
      <React.Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.state.users}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  onClick={(event) => this.deletehandler(item)}
                  className="delKey"
                  key="list-loadmore-edit"
                >
                  Delete
                </a>,
              ]}
            >
              <List.Item.Meta
                title={item.userName}
                description={
                  "Age: " +
                  item.age +
                  "  Gender: " +
                  (item.gender === false ? "Male" : "Female")
                }
              />
              {item.description}
            </List.Item>
          )}
        />
      </React.Fragment>
    );
  }
}

export default allUsers;
