import {CurrencyRates} from "../types";
import {FetchingError} from "../errors";

export async function fetchData(url: string): Promise<CurrencyRates> {
    try {
        const response: Response = await fetch(url);

        if (!response.ok) {
            throw new FetchingError(`HTTP error! Status: ${response.status}`);
        }

        const data: { data: CurrencyRates } = await response.json();
        return data.data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
}