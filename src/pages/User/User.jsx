import React from 'react';
import { Card, List, Typography } from 'antd';
import { useParams, Link } from 'react-router-dom';

const { Title } = Typography;

const User = () => {
  const { id } = useParams();
  const users = [
    { id: '1', name: 'Tom', age: 28, email: 'tom@example.com', role: '管理员' },
    { id: '2', name: 'Bill', age: 32, email: 'bill@example.com', role: '用户' },
    { id: '3', name: 'Alex', age: 45, email: 'alex@example.com', role: '用户' },
  ];

  // 如果有id参数，显示单个用户详情
  if (id) {
    const user = users.find(u => u.id === id);

    if (!user) {
      return (
        <Card title="用户详情" variant="outlined">
          <Title level={4}>用户不存在</Title>
        </Card>
      );
    }

    return (
      <Card title="用户详情" variant="outlined">
        <List
          bordered
          dataSource={[
            { label: '用户名', value: user.name },
            { label: '年龄', value: user.age },
            { label: '邮箱', value: user.email },
            { label: '角色', value: user.role },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<span style={{ fontWeight: 'bold', marginRight: '10px' }}>{item.label}:</span>}
                description={<span>{item.value}</span>}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }

  // 否则显示用户列表
  return (
    <Card title="用户管理" variant="outlined">
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`/user/${user.id}`}>{user.name}</Link>}
              description={
                <>
                  <p>年龄: {user.age}</p>
                  <p>邮箱: {user.email}</p>
                  <p>角色: {user.role}</p>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default User;