import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
  PageHeader,
  Button,
  Avatar,
  Modal,
  Form,
  Input,
  Checkbox,
  TimePicker,
  Select,
  Alert,
  Card,
  Switch,
  Tag,
  Space,
  Empty
} from 'antd'
import { UserOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

import './toDo.css'

const TODO = (props) => {
  const { history } = props
  const [modal, setModal] = useState(false)
  const [loanding, setLoanding] = useState(false)
  const [error, setError] = useState(false)
  const [todos, setTodos] = useState([])

  const { Option } = Select

  useEffect(() => {

    document.title = "To DO list | my list"

    axios.get('https://crudcrud.com/api/7bec873a5e7b451f8c7e0c1911a0d36d/todos')
      .then(res => {
        if (res.satus  === 200) {
          setTodos(res.data)
        }
      })
      .catch(err => {
        console.log(err);
      })

    return () => { /* Unmount */ }
  }, [])

  const onFinish = async (values) => {
    setLoanding(true)
    console.log(values);
    console.log(values.time._d.toString());

    const options = {
      data: {
        taskName: values.taskName,
        startTime: values.time._d.toString(),
        isFinished: values.finished,
        categories: values.category
      },
      method: "POST",
      url: "https://crudcrud.com/api/7bec873a5e7b451f8c7e0c1911a0d36d/todos",
      headers: { "Content-Type": "application/json" }
    }

    try {
      const res = await axios.request(options)

      console.log(res);
      if (res.status === 201) {
        setModal(false)
      }

      setLoanding(false)
    } catch (err) {
      setLoanding(false)
      setError(true)
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const updateToDo = (type, id, values) => {
    console.log(type, id, values);
    let options = {}
    if (type === "DELETE") {
      options = {
        method: "DELETE",
        url: `https://crudcrud.com/api/7bec873a5e7b451f8c7e0c1911a0d36d/todos/${id}`,
        headers: { "Content-Type": "application/json" }
      }
    } else if (type === "UPDATE") {
      options = {
        data: {
          taskName: values.taskName,
          startTime: values.startTimet,
          isFinished: values.isFinished,
          categories: values.categories
        },
        method: "PUT",
        url: `https://crudcrud.com/api/7bec873a5e7b451f8c7e0c1911a0d36d/todos/${id}`,
        headers: { "Content-Type": "application/json" }
      }
    }

    axios.request(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        setError(true)
        console.log(err);
      })
  }

  return (
    <div className="todoCont">
      <PageHeader
        className="to-do-header"
        onBack={() => history.push('/welcome')}
        title="My list"
        subTitle="John Doe"

        extra={[
          <Button key="1" type="text">Jhon Doe</Button>,
          <Avatar key="2" size="large" icon={<UserOutlined />} />
        ]}
      />

      {
        error &&
        <Alert
          message="Ups!, try again please"
          type="error"
          closable
          onClose={() => {setError(false)}}
        />
      }

      <div className="listCont">
        {
          todos.length <= 0 &&
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                Empty list
              </span>
            }
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {setModal(true)}}>New task</Button>
          </Empty>
        }
        {
          todos.map((ele, idx) => {
            return (
              <Card
                title={ele.taskName}
                extra={
                  <Button
                    type="primary"
                    onClick={() => {updateToDo("DELETE", ele._id)}}
                    icon={<DeleteOutlined />}
                    danger
                  />
                }
                style={{ width: 300, margin: "10px" }} key={idx}
                actions={[
                  <Space align="baseline" key="2">
                    <p>Completed</p>
                    <Switch
                      onChange={(e) => {updateToDo("UPDATE", ele._id, {
                        taskName: ele.taskName,
                        startTime: ele.startTime,
                        isFinished: e,
                        categories: ele.categories
                      })}}
                    />
                  </Space>
                ]}
              >
                <p> <strong>Start time:</strong> {ele.startTime}</p>
                <Space style={{ width: "100%" }} direction="vertical" align="end">
                  <Space>
                    {
                      ele.categories.map((el, i) => {
                        return(
                          <Tag color="#2db7f5" key={i}>{el}</Tag>
                        )
                      })
                    }
                  </Space>
                </Space>
              </Card>
            )
          })
        }
      </div>

      <div className="modalCont">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => {setModal(true)}}>
          New task
        </Button>

        <Modal
          title="New task"
          visible={modal}
          footer={[]}
          onCancel={() => {
            setError(false)
            setModal(false)
          }}
        >
          {
            error &&
            <Alert
              message="Ups!, try again please"
              type="error"
              closable
              onClose={() => {setError(false)}}
            />
          }
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ finished: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Task name"
              name="taskName"
              rules={[{ required: true, message: 'Please input the task name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Start"
              name="time"
              valuePropName="time"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              rules={[{ required: true, message: 'Please input the start time!' }]}
            >
              <TimePicker />
            </Form.Item>

            <Form.Item name="finished" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
              <Checkbox>Finished</Checkbox>
            </Form.Item>

            <Form.Item name="category" valuePropName="category" wrapperCol={{ offset: 6, span: 16 }}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select category"
              >
                <Option key="0" value="work">#Work</Option>
                <Option key="1" value="study">#Study</Option>
                <Option key="2" value="home">#Home</Option>
                <Option key="3" value="party">#Party</Option>
                <Option key="4" value="vacations">#Vacations</Option>
                <Option key="5" value="games">#Games</Option>
                <Option key="6" value="sport">#Sport</Option>
                <Option key="7" value="gym">#Gym</Option>
              </Select>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" loading={loanding} htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <PageHeader
        className="todo-footer"
        title="TO-DO list mini APP"
        footer
      />
    </div>
  )
}

export default withRouter(TODO)
