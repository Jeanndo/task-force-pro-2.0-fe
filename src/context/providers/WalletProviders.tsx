import { FC } from 'react'
import { Children } from '@/lib/Interfaces'
import WalletProvider from './walletProvider'

const WalletProviders: FC<Children> = ({ children }) => {
    return (
        <WalletProvider>
            {children}
        </WalletProvider>
    )
}

export default WalletProviders