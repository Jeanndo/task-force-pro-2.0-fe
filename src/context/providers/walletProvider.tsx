import { Children } from '@/lib/Interfaces'
import { FC, useState } from 'react'
import { WalletContext } from '../walletContext'

const WalletProvider: FC<Children> = ({ children }) => {

    const [collapsed, setCollapsed] = useState<boolean>(false)

    const toggleMenu = () => {
        setCollapsed((prev) => !prev)
    }

    return (
        <WalletContext.Provider value={{ collapsed, toggleMenu }}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider