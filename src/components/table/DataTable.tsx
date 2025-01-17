/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
//#region Imports
import { Table, TableColumnsType, TableProps as AntdTableProps, TablePaginationConfig, Skeleton, Space } from 'antd';
import { createStyles } from 'antd-style';
import { JSX } from 'react';

const useStyle = createStyles(({ css, token }) => {
    //@ts-ignore
    const { antCls } = token;
    return {
        customTable: css`
        ${antCls}-table {
        ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
            }
        }
        }
    `,
    };
});


//#region Constant

interface TableProps<T> {
    columns: TableColumnsType<T>;
    data: T[];
    rowKey: keyof T;
    expandable?: AntdTableProps<T>['expandable'];
    loading?: boolean;
    pagination?: TablePaginationConfig | false;
    onChange?: (pagination: TablePaginationConfig) => void;
    rowSelection?: AntdTableProps<T>['rowSelection'] | undefined;
    showCheckbox?: boolean;
    footer?: string;
    title?: string;
}

interface SkeletonTableProps<T> {
    columns: TableColumnsType<T>
    rows: number;
}


const SkeletonTable = <T,>({ columns, rows }: SkeletonTableProps<T>): JSX.Element => {
    return (
        <div>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <Space key={rowIndex} style={{ display: 'flex', marginBottom: 8 }}>
                    {columns.map((column, colIndex) => (
                        <Skeleton.Input
                            key={colIndex}
                            style={{
                                width: column.width ? `${column.width}px` : '100px',
                                height: 20,
                            }}
                            active
                        />
                    ))}
                </Space>
            ))}
        </div>
    );
};



//#region Table Fuction
const DataTable = <T extends { id: number | string }>({
    columns,
    data, rowKey,
    expandable, loading,
    pagination, onChange,
    rowSelection,
    showCheckbox,
    footer,
    title,
}: TableProps<T>) => {

    const { styles } = useStyle();

    //#region Data Table
    return (
        <div>
            {loading ? <SkeletonTable<T> columns={columns} rows={5} /> :
                <Table<T>
                    columns={columns}
                    dataSource={data}
                    bordered
                    size="small"
                    rowKey={rowKey ? (record) => record[rowKey] as string | number : (record) => record.id}
                    scroll={{ x: 'max-content' }}
                    expandable={expandable}
                    pagination={pagination}
                    onChange={onChange}
                    rowSelection={showCheckbox ? { ...rowSelection } : undefined}
                    footer={() => <span className="ml-20 font-medium text-blue-500 text-sm">{footer}</span>}
                    title={() => <div className="font-bold text-blue-500">{title}</div>}
                    className={styles.customTable}
                />}
        </div>
    );
};

export default DataTable;


