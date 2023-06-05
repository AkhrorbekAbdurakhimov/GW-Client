export class Performing {
  constructor(
    public id: number,
    public title: string,
    public details: {
      id: number,
      type: string,
      status: string,
      done: number,
      link: string | null,
      comment: string,
      filename: string,
      created_date: Date
    }[]
  ) {}
}
