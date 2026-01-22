export enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
}

export type TUserRole = "ADMIN" | "MANAGER" | "STAFF";

export const USER_ROLE = {
  admin: "ADMIN",
  manager: "MANAGER",
  staff: "STAFF",
} as const;
