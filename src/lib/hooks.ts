import { ThemeContext } from "@/context/themeContext";
import { WalletContext } from "@/context/walletContext";
import { useContext } from "react";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from "react-redux"
import type { AppDispatch, RootState } from './store'
import { MessageContext } from "@/context/ToastContext";

export const useWallet = () => {

    const context = useContext(WalletContext)
    if (!context) {
        throw new Error("Wallet context must be provided");

    }

    return context
}

export const useTheme = () => {

    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("Provide theme context");

    }

    return context
}

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('Provide message context');
    }
    return context.messenger;
};


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
