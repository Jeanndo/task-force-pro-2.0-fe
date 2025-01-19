'use client'
import { message } from "antd";
import { MessageContext } from "../ToastContext";
import { Children } from "@/lib/Interfaces";

export const MessageProvider: React.FC<Children> = ({ children }) => {

    const [api, contextHolder] = message.useMessage();

    return (
        <MessageContext.Provider value={{ messenger: api }}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};