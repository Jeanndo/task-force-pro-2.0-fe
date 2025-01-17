'use client'
import React, { FC } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AccountsList from '../accountsList/AccountsList';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Accounts',
        children: <AccountsList />,
    },
    {
        key: '2',
        label: 'Linked Accounts',
        children: 'Your Linked Account will be shown here',
    }
];

const WalletTabs: FC = () => {
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    )
}

export default WalletTabs;