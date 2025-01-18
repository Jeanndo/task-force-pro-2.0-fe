
interface moneyProps{
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
