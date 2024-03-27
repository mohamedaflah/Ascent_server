export class User {
  constructor(
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: "user" | "admin" | "company",
    public readonly _id?: string,
    public readonly phonenumber?: string, // made modifiable as it's repeated later
    public readonly blockStatus?: boolean,
    public readonly status?: boolean,
    public readonly resume?: string,
    public readonly skills?: string[],
    public readonly experiences?: {
      title: string;
      description: string;
      image: string;
    }[], // corrected spelling and type
    public readonly personalsite?: string,
    public readonly sociallinks?: string[],
    public readonly coverImage?: string, // added missing optional indicator (?)
    public readonly icon?: string, // added missing optional indicator (?)
    public readonly location?: string, // added missing optional indicator (?)
    public readonly about?: string, // added missing optional indicator (?)
    public readonly education?: {
      image: string;
      university: string; // corrected spelling
      course: string;
      year: { from: Date; to: Date };
      description: string;
    }[],
    public readonly profileCompleted?: boolean,
    public readonly dateofbirth?: Date,
    public readonly currengDesignation?: String
  ) {}
}
