import axios, { AxiosResponse } from "axios";
import ICryptoData from '../interfaces/crypto-data';

export default class CoinBaseApiService {
	private api = axios.create({
		baseURL: "https://www.coinbase.com/api/v2/assets/"
	});

	public async GetLatestCryptoCurrenciesPrice(
		currency: string = "AUD"
	): Promise<ICryptoData> {
		try {
			const response = this.api.get("search", {
				params: {
					base: currency,
					filter: "listed",
					include_prices: "false",
					limit: "10",
					order: "asc",
					resolution: "day",
					sort: "rank"
				}
			});
			return (await response).data;
		} catch (error) {
			console.error("failed to load", error);
		}
	}
}
