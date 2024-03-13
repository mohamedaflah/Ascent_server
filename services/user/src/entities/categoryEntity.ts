export class Category {
  constructor(
    public readonly categoryname: string,
    public readonly _id?: string,
    public readonly categoryImage?: string,
    public readonly categoryDescription?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly status?: boolean
  ) {}
}
