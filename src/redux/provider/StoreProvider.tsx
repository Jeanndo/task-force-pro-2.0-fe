'use client'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { Children } from '@/lib/Interfaces'
import { store } from '@/lib/store'

export const StoreProvider: FC<Children> = ({ children }) => {

    return <Provider store={store}>{children}</Provider>
}