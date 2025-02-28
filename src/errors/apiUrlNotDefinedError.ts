export class ApiUrlNotDefinedError extends Error {
    constructor() {
        super('API url not defined');
        this.name = 'ApiUrlNotDefinedError';
    }
}