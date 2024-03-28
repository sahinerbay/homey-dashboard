interface Property {
  favoriteDevices: string[];
  favoriteFlows: string[];
}

export interface User {
  id: string;
  name: string;
  athomId: string;
  properties: Property;
  enabled: boolean;
  verified: boolean;
  role: string;
  avatar: string;
  present: boolean;
  asleep: boolean;
  inviteUrl: string | null;
  inviteToken: string | null;
}

export interface HomeyApiUsersResponse {
  [key: string]: User;
}
