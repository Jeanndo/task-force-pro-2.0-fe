import { FC } from 'react';
import { Breadcrumb } from 'antd';
import { BreadCrumbsData } from '@/lib/Interfaces';

const BreadCrumbs: FC<BreadCrumbsData> = ({data}) => (
    
    <Breadcrumb
        className='!text-blue-500'
        separator="/"
        items={data}
        
    />
);

export default BreadCrumbs;