import React from 'react';
import { Card, List } from 'antd';

const Team = () => {
  const teams = [
    { name: 'Team 1', members: 10 },
    { name: 'Team 2', members: 15 },
  ];

  return (
    <Card title="团队管理" variant="outlined">
      <List
        dataSource={teams}
        renderItem={(team) => (
          <List.Item>
            <List.Item.Meta
              title={<span>{team.name}</span>}
              description={`成员数量: ${team.members}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Team;