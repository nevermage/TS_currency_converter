import dotenv from "dotenv";
import {CurrencyManager} from "./modules/currencyManager";

main();

async function main() {
    dotenv.config();
    const currencyManager = new CurrencyManager();

    console.log(await currencyManager.getRate('AUD', 'PHP'));
    console.log(await currencyManager.convert(65, 'PLN', 'INR'));
}

