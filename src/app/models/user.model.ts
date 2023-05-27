export class User {
  constructor(
    public id: number,
    public username: string,
    public role: string,
    public avatar: string,
    public capacity: number,
    public full_name: string,
    public created_at: Date,
  ) {}
}
