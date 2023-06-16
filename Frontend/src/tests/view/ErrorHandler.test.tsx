import ErrorHandler from '../../view/ErrorHandler';

describe('ErrorHandler', () => {
    describe('getErrorMessage', () => {
        it('should return "Nie znaleziono użytkownika Error: 401" when statusCode is 401', () => {

            const statusCode = 401;

            const errorMessage = ErrorHandler.getErrorMessage(statusCode);

            expect(errorMessage).toBe('Nie znaleziono użytkownika Error: 401');
        });

        it('should return "Brak dostępu Error: 403" when statusCode is 403', () => {
            const statusCode = 403;

            const errorMessage = ErrorHandler.getErrorMessage(statusCode);

            expect(errorMessage).toBe('Brak dostępu Error: 403');
        });

        it('should return "Nie znaleziono Error: 404" when statusCode is 404', () => {
            const statusCode = 404;

            const errorMessage = ErrorHandler.getErrorMessage(statusCode);

            expect(errorMessage).toBe('Nie znaleziono Error: 404');
        });

        it('should return "Nieznany błąd Error: 500" when statusCode is not 401, 403, or 404', () => {
            const statusCode = 500;

            const errorMessage = ErrorHandler.getErrorMessage(statusCode);

            expect(errorMessage).toBe('Nieznany błąd Error: 500');
        });
    });
});
