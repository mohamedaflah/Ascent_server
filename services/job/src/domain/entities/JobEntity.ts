import mongoose from "mongoose";

export class Job {
  constructor(
    public readonly jobTitle: string,
    public readonly employment: string,
    public readonly description: string,
    public readonly category: mongoose.Types.ObjectId,
    public readonly joblocation: string,
    public readonly salaryrange: { status: boolean; from: number; to: number },
    // public readonly experiencelevel: string,
    public readonly vacancies: {
      status: boolean;
      available: number;
      filled: number;
    },
    public readonly responsibilities: string,
    public readonly qualification?: string[],
    public readonly skills?: string[],
    public readonly experince?: number,
    public readonly companyId?: mongoose.Types.ObjectId,
    public readonly _id?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly expiry?: Date,
    public readonly completdJobAdd?: "first" | "second",
    public readonly status?: boolean,
    public readonly expired?: boolean,
    public readonly applicants?: {
      applicantId: string;
      appliedDate: Date;
      hiringstage: "Applied"|"Inreview"|"Shortlisted"|"Interview";
      resume: string;
    }[]
  ) {}
}

// jobTitle: string;
//   employment: string;
//   description: string;
//   category: string;
//   joblocation: string;
//   salaryrange: {
//     status: boolean;
//     from: number;
//     to: number;
//   };
//   vacancies: {
//     available: number;
//     filled: number;
//   };
//   responsibilities: string;
//   qualification?: string[];
//   skills?: string[];
//   experience?: string;
//   companyId?: string;
//   _id?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   expiry?: Date;
//   completdJobAdd: "first" | "second";
