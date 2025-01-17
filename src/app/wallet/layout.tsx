'use client'
import { FC } from "react";
import {
    legacyLogicalPropertiesTransformer,
    StyleProvider,
} from "@ant-design/cssinjs";
import WalletProviders from "@/context/providers/WalletProviders";
import { Children } from "@/lib/Interfaces";
import { Layout, theme } from "antd";
import LayoutHeader from "@/components/layout/Header";
import WalletSideBar from "@/components/layout/SideBar";

const { Content, Footer } = Layout;

const WalletLayout: FC<Children> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
            <WalletProviders>
                <Layout className="w-full">
                    <LayoutHeader />
                    <Layout>
                        <WalletSideBar />
                        <Content
                            className="h-screen overflow-hidden overflow-y-scroll my-24 mx-0 sm:mx-24  p-4"
                            style={{
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {children}
                        </Content>
                    </Layout>
                    <Footer className="text-center uppercase !text-blue-500 !font-bold">
                        Powered By Jeanndo
                    </Footer>
                </Layout>
            </WalletProviders>
        </StyleProvider>
    );
};

export default WalletLayout;
