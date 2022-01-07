import { LecturerAccount, StudentAccount } from "./types"

interface CSVAttr {
  name: string,
  type: "string" | "number",
  alias: string,
}

const checkType = (value: string, type: "string" | "number"): boolean => {
  switch (type) {
    case "string":
      return typeof value === "string";
    case "number":
      return isNaN(parseInt(value));
    default:
      return false;
  }
}

const checkCSVtype = (lines: string[][], csvAttrs: CSVAttr[]): boolean => {
  return (
    csvAttrs.reduce<boolean>((cur, attr, ind) => cur && lines[0][ind] === attr.name, true) && // Check csv header
    lines.slice(1).reduce<boolean>((cur, line) => cur && csvAttrs.reduce<boolean>((cur, attr, ind) => cur && checkType(line[ind], attr.type), true), true) // Check csv data type
  );
}

const studentCSVAttr: CSVAttr[] = [
  {
    name: "Name",
    type: "string",
    alias: "student_name",
  },
  {
    name: "Student ID",
    type: "string",
    alias: "account_id",
  },
  {
    name: "Class ID",
    type: "string",
    alias: "class_id",
  },
  {
    name: "Username",
    type: "string",
    alias: "account_id",
  },
  {
    name: "Password",
    type: "string",
    alias: "password",
  }
]

export const csvToStudentList = (csv: string): StudentAccount[] | string => {
  const lines = csv.trim().split("\n").map(line => line.split(','));
  if (!checkCSVtype(lines, studentCSVAttr)) {
    return "CSV file format is invalid";
  }

  const res: StudentAccount[] = lines.slice(1).map(line => ({
    student_name: line[0],
    student_id: line[1],
    class_id: line[2],
    account_id: line[3],
    password: line[4], 
  }));

  return res;
}

const lecturerCSVAttr: CSVAttr[] = [
  {
    name: "Name",
    type: "string",
    alias: "lecturer_name",
  },
  {
    name: "Lecturer ID",
    type: "string",
    alias: "account_id",
  },
  {
    name: "Username",
    type: "string",
    alias: "account_id",
  },
  {
    name: "Password",
    type: "string",
    alias: "password",
  }
]

export const csvToLecturerList = (csv: string): LecturerAccount[] | string => {
  const lines = csv.trim().split("\n").map(line => line.split(','));
  if (!checkCSVtype(lines, lecturerCSVAttr)) {
    return "CSV file format is invalid";
  }

  const res: LecturerAccount[] = lines.slice(1).map(line => ({
    lecturer_name: line[0],
    lecturer_id: line[1],
    account_id: line[2],
    password: line[3], 
  }));

  return res;
}

export const getDataFromToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  }
  catch (err) {
    console.error(err);
  }
}