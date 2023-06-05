export default interface PersonInterface {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: {
        state: string;
        city: string;
        street: string;
        postCode: string;
        apartment: string;
    };
    password: string;
}