export interface Job {
    id?: string;
    type: JobTypes;
    title: string;
    description: string;
    location: string;
    salary: string;
    company: Company;
}

export enum JobTypes {
    FullTime,
    PartTime,
    Remote
}

export interface Company {
    name: string;
    description: string;
    email: string;
    phone: string;
}

export const defaultPageSize = 4;