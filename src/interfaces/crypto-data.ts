export default interface ICryptoData {
	data: ICryptoDetails[];
}
export default interface ICryptoDetails {
    symbol: string;
    name: string;
	base: string;
    currency: string;
    rank: number;
    latest: string;
    percent_change: number;
	latest_price: ILatestPrice;
}

interface ILatestPrice {
	timestamp: Date;
	percent_change: IPercentChange;
}

interface IPercentChange {
	hour: number;
	day: number;
	week: number;
	month: number;
	year: number;
}