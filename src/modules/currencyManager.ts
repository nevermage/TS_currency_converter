import {fetchData} from "./apiClient";
import {CurrencyRates} from "../types";
import {InvalidCurrencyError} from "../errors/invalidCurrencyError";
import {ApiUrlNotDefinedError} from "../errors/apiUrlNotDefinedError";

export class CurrencyManager {
    #currencyRates: CurrencyRates = {};

    private async fetchCurrencyRates(): Promise<void> {
        const url = process.env.API_URL;
        if (!url) {
            throw new ApiUrlNotDefinedError();
        }

        try {
            this.#currencyRates = await fetchData(url);
        } catch (error) {
            console.error("Failed to initialize currency rates:", error);
        }
    }

    async getRate(base: string, target: string): Promise<number> {
        await this.fetchCurrencyRates();

        if (!(base in this.#currencyRates)) {
            throw new InvalidCurrencyError(base);
        }
        if (!(target in this.#currencyRates)) {
            throw new InvalidCurrencyError(target);
        }

        return this.#currencyRates[target] / this.#currencyRates[base];
    }

    async convert(amount: number, base: string, target: string): Promise<number> {
        const rate = await this.getRate(base, target);
        return amount * rate;
    }
}