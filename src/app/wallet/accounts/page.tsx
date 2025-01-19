'use client'
import AccountsList from '@/components/accountsList/AccountsList'
import BreadCrumbs from '@/components/BreadCrumb/BreadCrumb'
import AddAccountModal from '@/components/modals/AddAccountModal'
import React, { FC, useState } from 'react'

const Accounts: FC = () => {
    const [accountAdded,setAccountAdded] = useState<boolean>(false)
    return (
        <div className="max-w-3xl 2xl:max-w-5xl mx-auto my-auto">
            <div className="flex justify-around items-center mb-10">
                <BreadCrumbs data={[
                    { title: 'DASHBOARD', href: '/wallet' },
                    { title: 'MY WALLET' }]} />
                <AddAccountModal setAccountAdded={setAccountAdded}/>
            </div>
            <AccountsList accountAdded={accountAdded}/>

        </div>
    )
}

export default Accounts