export interface IUser {
    uid: string;
    createdAt?: number;
    creationTime?: number;
    displayName?: string;
    email: string;
    employeeId?: string;
    lastSignInTime?: any;
    // lastSignInLocation?: google.maps.LatLng;
    photoURL?: string;
    password?: string;
    profileURL?: string;
    providerId?: string;
    ps?: string;
    settings?: any;
    workPlace?: string;
    bookmarks?: Array<string>;
}