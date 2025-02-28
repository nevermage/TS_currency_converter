export class InvalidCurrencyError extends Error {
    constructor(currency: string) {
        super(`Invalid currency "${currency}"`);
        this.name = 'InvalidCurrencyError';
    }
}