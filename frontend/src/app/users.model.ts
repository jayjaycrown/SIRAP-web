export class User {
  constructor(
    public id: string,
    public name: string,
    public matric: string,
    public passport: string,
    public phone: number,
    public expiryDate: Date,
    public admission: Date,
    public faculty: string,
    public department: string
  ) { }
}
