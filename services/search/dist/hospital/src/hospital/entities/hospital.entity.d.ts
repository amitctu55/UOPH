export declare class HospitalEntity {
    id: string;
    name: string;
    registrationNumber?: string;
    address: string;
    city: string;
    state?: string;
    postalCode?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    website?: string;
    websiteUrl?: string;
    logoUrl?: string;
    bio?: string;
    isVerified: boolean;
    verifiedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
