import { Card } from 'antd';
import { useState } from 'react';
const HeaderCom = (props) => {
    const list = [
        {
            id: 1,
            name: '张三',
            age: 25,
            email: 'zhangsan@example.com',
        },
        {
            id: 2,
            name: '李四',
            age: 30,
            email: 'lisi@example.com',
        },
    ]
    const [num, setNum] = useState({
        count: 0,
    });
    const clickFn = () => {
        setNum({
            count: num.count + 1,
        });
    }
    return (
        <div>
            <Card title="欢迎来到仪表盘页面" style={{ width: '100%' }}>
                {list.map(item =>
                    <div key={item.id}>
                        <p>姓名：{item.name}</p>
                        <p>年龄：{item.age > 0 && item.age}</p>
                        <p>邮箱：{item.email}</p>
                    </div>
                )}
                <button type="primary" onClick={clickFn}>+1</button>
                <p>当前计数：{num.count}</p>
                <p>姓名：{props.info.name}</p>
                <button onClick={() => setPersonalInfo(props.info2)}>切换姓名</button>
            </Card>
            {props.component()}
        </div>
    );
};
export default HeaderCom;