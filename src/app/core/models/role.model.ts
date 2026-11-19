
export interface Role {
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp: string | null;
}

export interface RoleRequest {
  name: string;
}
