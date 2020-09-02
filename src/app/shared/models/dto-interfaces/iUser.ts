export interface IUser {

    id: string;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    authorities: string[];
    token?: string;

}
