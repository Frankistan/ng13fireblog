export interface IPost {
    id?: any;
    uid?: string;
    title?: string;
    author?: {
        displayName: string,
        uid: string
    };
    content?: string;
    url?: string;
    featured_image?: string;
    createdAt?: any;
    created_at?: number;
    updatedAt?: any;
    updated_at?: number;
    tags?: Array<string>;
}