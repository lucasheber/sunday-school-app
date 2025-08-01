import { Teacher } from "./teacher";

export interface Schedule {
    id: string;
    name: string;
    classId: string;
    description: string;
    teacher: Teacher;
    teacherId: string;
    date: string
    timestamp: Date;
}