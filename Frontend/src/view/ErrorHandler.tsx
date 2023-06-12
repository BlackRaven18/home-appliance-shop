

class ErrorHandler {
    static getErrorMessage(statusCode: number): string {
        let message: string;
        switch(statusCode){
            case 401: message = "Nie znaleziono użytkownika"; break;
            case 403: message = "Brak dostępu"; break;
            case 404: message = "Nie znaleziono"; break;
            default: message = "Nieznany błąd"
        }

        message += " Error: " + statusCode;

        return message;
    }
}

export default ErrorHandler