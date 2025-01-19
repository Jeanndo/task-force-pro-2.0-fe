import '@ant-design/v5-patch-for-react-19'; // to avoid compatibility issues
import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Montserrat } from "next/font/google";
import { StoreProvider } from "@/redux/provider/StoreProvider";
import { MessageProvider } from "@/context/providers/ToastMessageProvider";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: false,
  display: 'swap',
})

export const metadata: Metadata = {
  title: "E-WALLET",
  description: "Effortless financial record tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased dark:bg-gray-950`}
      >
        <AntdRegistry>
          <MessageProvider>
            <StoreProvider>
              <ConfigProvider
                theme={{
                  token: {
                    fontFamily: montserrat.style.fontFamily,
                    borderRadius: 0
                  },
                  components: {
                    Breadcrumb: {
                      lastItemColor: "#010813",
                      linkColor: "#3b82f6"
                    },
                    Slider: {
                      handleActiveColor: "#F00",
                      trackBg: "#F00",
                      trackHoverBg: "#F00",
                      railBg: "#1677ff",
                      railHoverBg: "#1677ff",
                      dotBorderColor: "#F00",
                      dotActiveBorderColor: "#F00",
                    },
                  },
                }}
              >
                {children}
              </ConfigProvider>
            </StoreProvider>
          </MessageProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
