export class Theme {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public createdAt: Date,
    public status: string,
    public studentId: number,
    public studentFullName: string,
    public advisorId: number,
    public advisorFullName: string
  ) {}
}
