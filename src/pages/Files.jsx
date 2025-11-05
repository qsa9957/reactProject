import React from 'react';
import { Card, List } from 'antd';

const Files = () => {
  const files = [
    { name: '文档1.docx', size: '2.5MB' },
    { name: '图片2.jpg', size: '1.8MB' },
    { name: '表格3.xlsx', size: '3.2MB' },
  ];

  return (
    <Card title="文件管理" variant="outlined">
      <List
        dataSource={files}
        renderItem={(file) => (
          <List.Item>
            <List.Item.Meta
              title={<span>{file.name}</span>}
              description={`大小: ${file.size}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Files;