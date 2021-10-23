import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { PageHeader, Button, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import './welcome.css'

const Welcome = (props) => {
  const { history } = props

  useEffect(() => {

    document.title = "To DO list | Login"

    return () => { /* Unmount */ }
  }, [])

  return (
    <div className="welcomeCont">
      <PageHeader
        className="welcome-header"
        onBack={() => history.push('/')}
        title="Welcome"

        extra={[
          <Button key="1" type="primary" onClick={() => {history.push('/to-do')}}>
            To DO's
          </Button>,
          <Button key="2" type="text">Jhon Doe</Button>,
          <Avatar key="3" size="large" icon={<UserOutlined />} />
        ]}
      />

      <div className="descriptionCont">
        <div className="description">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam recusandae accusantium placeat, voluptas, delectus tempore perferendis nisi consequuntur, quas doloremque eaque laudantium reprehenderit quisquam iure? Voluptatem corrupti ab deleniti id.</p>
        </div>
        <Button className="mainBtn" type="primary" onClick={() => {history.push('/to-do')}}>To DO's</Button>
      </div>

      <PageHeader
        className="welcome-footer"
        title="TO-DO list mini APP"
        footer
      />
    </div>
  )
}

export default withRouter(Welcome)
