import {fetchData} from "./apiClient";
import {CurrencyRates} from "../types";
import {InvalidCurrencyError, ApiUrlNotDefinedError, FetchingError, CurrencyConvertingError} from "../errors";

export class CurrencyManager {
    #currencyRates: CurrencyRates = {};

    private async fetchCurrencyRates(): Promise<void> {
        const url = process.env.API_URL;
        if (!url) {
            throw new ApiUrlNotDefinedError('API url not defined');
        }

        try {
            this.#currencyRates = await fetchData(url);
        } catch (error) {
            throw new FetchingError("Failed to initialize currency rates: " + error);
        }
    }

    async getRate(base: string, target: string): Promise<number> {
        await this.fetchCurrencyRates();

        if (!(base in this.#currencyRates)) {
            throw new InvalidCurrencyError(`Invalid currency "${base}"`);
        }
        if (!(target in this.#currencyRates)) {
            throw new InvalidCurrencyError(`Invalid currency "${target}"`);
        }

        return this.#currencyRates[target] / this.#currencyRates[base];
    }

    async convert(amount: number, base: string, target: string): Promise<number> {
        try {
            const rate = await this.getRate(base, target);
            return amount * rate;
        } catch (e) {
            throw new CurrencyConvertingError('Could not convert currency rate. Message: ' + e);
        }
    }
}