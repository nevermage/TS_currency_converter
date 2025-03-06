export class ApiUrlNotDefinedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiUrlNotDefinedError';
    }
}