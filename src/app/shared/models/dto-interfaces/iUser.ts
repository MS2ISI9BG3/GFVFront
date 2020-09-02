export interface IUser {

    id: string;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    authorities: string[];
    activated: boolean;
    archived: boolean;
    phoneNumber?: string;
    token?: string;

}
