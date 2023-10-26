export default interface IUserSchema {
    username: string,
    password: string,
    email: string,
    salt: string,
    totalScore: number,
}