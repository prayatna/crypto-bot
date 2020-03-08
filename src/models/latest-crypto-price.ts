export default class LatestCryptoPrice {
	name: string;
	symbol: string;
	latestPrice: string;
	percentChange: string;

	constructor(
		cryptoName: string,
		cryptoSymbol: string,
		latestPrice: string,
		percentChange: number
	) {
		this.name = cryptoName;
		this.symbol = cryptoSymbol;
		this.latestPrice = latestPrice;
		this.percentChange = this.parsePercentChange(percentChange);
	}

	private parsePercentChange(percentChange: number): string {
		const change = (percentChange * 100).toFixed(2) + '%';

		if (percentChange > 0) {
			return "+" + change;
		} else {
			return change;
		}
	}
}
