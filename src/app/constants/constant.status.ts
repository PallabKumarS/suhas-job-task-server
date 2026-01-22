export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}

export type TProjectStatus = "ACTIVE" | "ARCHIVED" | "DELETED";

export type TUserStatus = "ACTIVE" | "INACTIVE";
