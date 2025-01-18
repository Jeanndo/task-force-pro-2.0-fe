import AccountsList from '@/components/accountsList/AccountsList'
import BreadCrumbs from '@/components/BreadCrumb/BreadCrumb'
import AddAccountModal from '@/components/modals/AddAccountModal'
import React, { FC } from 'react'

const Accounts: FC = () => {
    return (
        <div className="max-w-3xl 2xl:max-w-5xl mx-auto my-auto">
            <div className="flex justify-around items-center mb-10">
                <BreadCrumbs data={[
                    { title: 'DASHBOARD', href: '/wallet' },
                    { title: 'MY WALLET' }]} />
                <AddAccountModal />
            </div>
            <AccountsList/>

        </div>
    )
}

export default Accounts