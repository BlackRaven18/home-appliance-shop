import UserDataManager from '../../UserDataManager/UserDataManager';

describe('UserDataManager', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('returns empty string for getUserId when id is not set', () => {
        const userId = UserDataManager.getUserId();
        expect(userId).toEqual('');
    });

    it('returns empty string for getUsername when username is not set', () => {
        const username = UserDataManager.getUsername();
        expect(username).toEqual('');
    });

    it('returns empty string for getPassword when password is not set', () => {
        const password = UserDataManager.getPassword();
        expect(password).toEqual('');
    });

    it('sets and retrieves the id correctly', () => {
        const id = '12345';
        UserDataManager.setId(id);

        const retrievedId = UserDataManager.getUserId();
        expect(retrievedId).toEqual(id);
    });

    it('sets and retrieves the username correctly', () => {
        const username = 'john_doe';
        UserDataManager.setUsername(username);

        const retrievedUsername = UserDataManager.getUsername();
        expect(retrievedUsername).toEqual(username);
    });

    it('sets and retrieves the password correctly', () => {
        const password = 'pass123';
        UserDataManager.setPassword(password);

        const retrievedPassword = UserDataManager.getPassword();
        expect(retrievedPassword).toEqual(password);
    });

    it('clears all data', () => {
        UserDataManager.setId('123');
        UserDataManager.setUsername('john_doe');
        UserDataManager.setPassword('pass123');

        UserDataManager.clearData();

        expect(UserDataManager.getUserId()).toEqual('');
        expect(UserDataManager.getUsername()).toEqual('');
        expect(UserDataManager.getPassword()).toEqual('');
    });

    it('returns false for isLogged when id is not set', () => {
        const isLogged = UserDataManager.isLogged();
        expect(isLogged).toBe(false);
    });

    it('returns true for isLogged when id is set', () => {
        UserDataManager.setId('123');
        const isLogged = UserDataManager.isLogged();
        expect(isLogged).toBe(true);
    });
});
