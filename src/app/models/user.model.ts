export class User {
  constructor(
    public id: number,
    public username: string,
    public role: string,
    public avatar: string,
    public capacity: number,
    public fullName: string,
    public faculty: string,
    public gpa: number,
    public skills: string[],
    public linkedin: string,
    public position: string,
    public joinedAt: Date,
  ) {}
}
