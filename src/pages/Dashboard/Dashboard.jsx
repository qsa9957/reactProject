import React from 'react';
import { Card } from 'antd';
import HeaderCom from './components/headerCom';

const Dashboard = () => {
  const personalInfo = {
    name: '张三',
    age: 0,
    email: 'zhangsan@example.com',
  };
  const personalInfo2 = {
    name: '李四',
    age: 30,
    email: 'lisi@example.com',
  };
  return (
    <div>
      <HeaderCom component={component1} info={personalInfo} info2={personalInfo2} />
    </div>
  );
};
const component1 = () => {
  return (
    <div>
      我是一个组件
    </div>
  );
}
export default Dashboard;