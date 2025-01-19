import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios"
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

interface moneyProps {
    amount: number;
    currency: string;
    locale: string;
}

export function formatMoney({ amount, currency = 'USD', locale = 'en-US' }: moneyProps) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
}


instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

        /**
         * Get the token from local storage
         */
        const token = localStorage.getItem("token");

        /**
         * Check if the request is not the login request
         */

        if (token && !config.url?.includes("/login")) {
            /**
             * Add the token to the Authorization header
             */
            config.headers = AxiosHeaders.from(config.headers); /****Convert existing headers to AxiosHeaders****/
            config.headers.set("Authorization", `Bearer ${token}`);
        }

        return config;
    },
    (error) => {
        /**
         * Handle request error here
         */
        return Promise.reject(error);
    }
);

export default instance