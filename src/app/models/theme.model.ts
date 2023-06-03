export class Theme {
  constructor(
    public id: number,
    public processId: number,
    public title: string,
    public description: string,
    public createdAt: Date,
    public status: string,
    public studentId: number,
    public studentFullName: string,
    public studentAvatar: string,
    public advisorId: number,
    public advisorFullName: string,
    public advisorAvatar: string
  ) {}
}
