import React from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import axios from "../../axios-user";

import "./NewUser.css";

class newUser extends React.Component {

  state = {
    name: {
      value: "",
    },
    username: {
      value: "",
    },
    age: {
      value: "",
    },
    gender: {
      value: "",
    },
    description: {
      value: "",
    },
    errors: {
      username: "",
    },
  };

  layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  onFinish = (values) => {
    const cloneState = {
      ...this.state,
    };

    const deepClone = {
      ...cloneState["age"],
    };

    deepClone.value = values.user.age;
    this.setState({ ["age"]: deepClone }, () => {
      const clone = { ...this.state };
      const data = {
        name: clone.name.value,
        userName: clone.username.value,
        age: clone.age.value,
        description: clone.description.value,
        gender: clone.gender.value,
      };
      axios
        .post("/api/orientation/newuser", data)
        .then(() => {
          message.success("New User Was Created", 1.5, () => this.props.changeTab());
        })
        .catch((err) => {
          err.response.data.message == null
            ? message.error(Object.values(err.response.data)[0])
            : message.error(err.response.data.message);
        });
    });
  };

  onChangeHandler = (event, label) => {
    const cloneState = {
      ...this.state,
    };

    const deepClone = {
      ...cloneState[label],
    };

    deepClone.value = event.target.value;
    this.setState({ [label]: deepClone });
  };

  onGenderChange = (value) => {
    const cloneState = {
      ...this.state,
    };

    const deepClone = {
      ...cloneState["gender"],
    };

    switch (value) {
      case "male":
        deepClone.value = 0;
        this.setState({ ["gender"]: deepClone });
        return;
      case "female":
        deepClone.value = 1;
        this.setState({ ["gender"]: deepClone });
        return;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Form
          {...this.layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={this.validateMessages}
          labelAlign="left"
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[{ required: true }]}
          >
            <Input onChange={(event) => this.onChangeHandler(event, "name")} />
          </Form.Item>
          <Form.Item
            name={["user", "username"]}
            label="UserName"
            rules={[{ required: true }]}
          >
            <Input
              onChange={(event) => this.onChangeHandler(event, "username")}
            />
          </Form.Item>
          <Form.Item
            name={["user", "age"]}
            label="Age"
            rules={[{ type: "number", min: 0, max: 99 }, { required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={["user", "gender"]}
            label="Gender"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.onGenderChange}
              allowClear
            >
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={["user", "Description"]}
            label="Description"
            rules={[
              {
                min: 10,
                message: "Description must be minimum 10 characters.",
              },
              { required: true },
            ]}
          >
            <Input.TextArea
              onChange={(event) => this.onChangeHandler(event, "description")}
              allowClear
              showCount
              maxLength={500}
              autoSize={{ minRows: 5, maxRows: 10 }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

export default newUser;
