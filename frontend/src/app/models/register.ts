class NewUserLoginInfo {
    constructor(
    public userId: number,
    public username: string,
    public password: string
    ) { }
}


class Register extends NewUserLoginInfo {
    constructor(
    public userId: number,
    public username: string,
    public password: string,
    public fName: string,
    public lName: string,
    public city: string,
    public street: string
    ) {
        super(
            userId,
            username,
            password
        )
    }
}


export {Register, NewUserLoginInfo}