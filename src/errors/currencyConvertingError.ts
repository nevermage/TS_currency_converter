export class CurrencyConvertingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CurrencyConvertingError';
    }
}