import { useTheme, useWallet } from "@/lib/hooks";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React, { FC } from "react";

const { Header } = Layout;
{/* <MoonOutlined /> */ }
{/* <SunOutlined /> */ }
const LayoutHeader: FC = () => {
    const { collapsed, toggleMenu } = useWallet();
    const { theme, toggleTheme } = useTheme()

    return (
        <Header className="!bg-white shadow-md !px-8  mx-0 w-full flex  justify-between items-center fixed top-0 z-50">
            <Button
                type="text"
                icon={
                    collapsed ? (
                        <MenuUnfoldOutlined className="!text-blue-500 !font-bold" />
                    ) : (
                        <MenuFoldOutlined className="!text-blue-500 !font-bold" />
                    )
                }
                onClick={toggleMenu}
                style={{ fontSize: "16px" }}
            />

            <div className="font-bold text-blue-500">e-Wallet</div>

            <div className="flex justify-center items-center gap-x-8 ">
                <Button
                    type="text"
                    icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
                    onClick={toggleTheme}
                />
                <Button
                    color="danger"
                    variant="solid"
                    className="!rounded-full"
                    icon={<LogoutOutlined />}
                    size="small"
                />
            </div>
        </Header>
    );
};

export default LayoutHeader;
