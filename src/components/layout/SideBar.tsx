import { useWallet } from '@/lib/hooks';
import { WalletRoute } from '@/lib/Interfaces';
import { AppstoreOutlined,DollarOutlined,PieChartOutlined,ProductOutlined, RetweetOutlined, WalletOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    backgroundColor: 'white',
    zIndex: 1000
};

const WalletSideBar = () => {

    const pathname = usePathname()
    const { collapsed } = useWallet()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })


    const highlightSelectedItem = () => {

        switch (pathname) {
            case '/wallet':
                return '1'
            case '/wallet/transactions':
                return '2'
            case '/wallet/categories':
                return '3'
            case '/wallet/subcategories':
                return '4'
            case '/wallet/accounts':
                return '5'
            case '/wallet/budgets':
                return '6'
            default:
                return '1'

        }
    }

    return (
        <Sider trigger={null} style={siderStyle} collapsible collapsed={collapsed} collapsedWidth={isTabletOrMobile ? 0 : 80} className="mt-16">
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={[highlightSelectedItem()]}
                items={WalletMenu}
                className='h-full'
            />
        </Sider>
    )
}

const WalletMenu: WalletRoute[] = [
    {
        key: '1',
        icon: <AppstoreOutlined />,
        label: <Link href="/wallet" className="text-white">Dashboard</Link>
    },
    {
        key: '2',
        icon: <RetweetOutlined />,
        label: <Link href="/wallet/transactions" className="text-white">Transactions</Link>
    },
    {
        key: '3',
        icon: <ProductOutlined />,
        label: <Link href="/wallet/categories" className="text-white">Categories</Link>
    },
    {
        key: '4',
        icon: <PieChartOutlined />,
        label: <Link href="/wallet/subcategories" className="text-white">Sub categories</Link>
    },
    {
        key: '5',
        icon: <WalletOutlined />,
        label: <Link href="/wallet/accounts" className="text-white">My Wallet</Link>
    },
    {
        key: '6',
        icon: <DollarOutlined />,
        label: <Link href="/wallet/budgets" className="text-white">Budgets</Link>
    },

]

export default WalletSideBar