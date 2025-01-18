import { ThemeContext } from "@/context/themeContext";
import { WalletContext } from "@/context/walletContext";
import { useContext } from "react";

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