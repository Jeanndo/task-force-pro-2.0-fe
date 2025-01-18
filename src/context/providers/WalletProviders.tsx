import { FC } from 'react'
import { Children } from '@/lib/Interfaces'
import WalletProvider from './walletProvider'
import ThemeProvider from './ThemeProvider'

const WalletProviders: FC<Children> = ({ children }) => {
    return (
        <ThemeProvider>
            <WalletProvider>
                {children}
            </WalletProvider>
        </ThemeProvider>
    )
}

export default WalletProviders