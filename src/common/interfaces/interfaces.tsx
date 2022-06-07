export interface IInspector {
  id: number;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email: string;
  passwordChanged: boolean;
  role: string;
}

export interface IAdmin {
  id: number;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email: string;
  passwordChanged: boolean;
  role: string;
}

export interface IDriver {
  id: number;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email: string;
  registeredOn: string;
  registeredWith: string;
  accumulatedTime: number;
}

export interface IAddress {
  id: number;
  name: string;
  occupied: number;
  available: number;
  position: [number, number];
}
