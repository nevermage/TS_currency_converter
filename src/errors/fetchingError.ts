export class FetchingError extends Error {
    constructor(statusCode: number) {
        super(`HTTP error! Status: ${statusCode}`);
        this.name = 'FetchingError';
    }
}