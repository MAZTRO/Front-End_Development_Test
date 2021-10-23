import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

import './login.css'
import 'antd/dist/antd.css'

let Login = (props) => {
  let { history } = props
  const [loanding, setLoanding] = useState(false)

  useEffect(() => {

    document.title = "To DO list | Login"

    return () => { /* Unmount */ }
  }, [])

  const onFinish = (values) => {
    setLoanding(true)
    console.log('Success:', values);

    setTimeout(() => {
      setLoanding(false)
      history.push("/welcome")
    }, 1000);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <div className="LoginCont">
      <h1>To DO list Login</h1>
      <Form
        name="loginForm"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="userEmail"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" loading={loanding} htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default withRouter(Login)
