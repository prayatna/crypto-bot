import CoinBaseApiService from "./coinbase.service";
import LatestCryptoPrice from "../models/latest-crypto-price";
import ICryptoData from "../interfaces/crypto-data";
import ICryptoDetails from "../interfaces/crypto-data";

export default class CryptoBotService {

    constructor(private coinbaseService: CoinBaseApiService) {}

    public async GetLatestCryptoCurrenciesPrice(currency: string): Promise<string>{
        let cryptoData = await this.coinbaseService.GetLatestCryptoCurrenciesPrice(currency);
        let finalString = this.FormatBotTextReply(cryptoData);
        
        return finalString;
    }

    private FormatBotTextReply(cryptoData: ICryptoData): string {
        let finalStringMessage = '';

        cryptoData.data.forEach((data: ICryptoDetails) => {
            const crypto = new LatestCryptoPrice(data.name, data.symbol, data.latest, data.percent_change);

            var message = crypto.name + ' ' + crypto.symbol + ' ' + crypto.latestPrice + ' ' + crypto.percentChange + '\n';
            finalStringMessage = finalStringMessage + message;
        });

       return finalStringMessage;
    }
}