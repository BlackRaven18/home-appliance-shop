

class UserDataManager {


    static TEST_printData(): void {
        console.log("user.id: "+ localStorage.getItem("user.id"));
        console.log("user.username: "+ localStorage.getItem("user.username"));
        console.log("user.password: "+ localStorage.getItem("user.password"));
    }

    static getUserId(): string {
        return localStorage.getItem("user.id") ?? "";
    }

    static getUsername(): string {
        return localStorage.getItem("user.username") ?? "";
    }

    static getPassword(): string {
        return localStorage.getItem("user.password") ?? "";
    }

    static setId(id: string): void {
        localStorage.setItem("user.id", id)
    }

    static setUsername(username: string): void {
        localStorage.setItem("user.username", username)
    }


    static setPassword(password: string): void {
        localStorage.setItem("user.password", password)
    }

    static clearData(): void {
        localStorage.removeItem("user.id");
        localStorage.removeItem("user.username");
        localStorage.removeItem("user.password");
    }

    static isLogged(): boolean {
        //console.log(this.getUserId() !== null ? true : false);

        return this.getUserId() !== "" ? true : false;
    }

}

export default UserDataManager;