interface User {
    _id: string;
    name: string;
    emial: string;
    password: string;
    phoneNumber: string;
    review?: {
        client: number,
        provider: number
    };
    activate: boolean;
    regulationsAcceptance: boolean;
}

export default User;