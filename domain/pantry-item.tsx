export interface PantryItem {
    id: string;
    blendName: string;
    roasterName?: string;
    blendId?: string;
    roastDate: string;
    expiryDate: string;
    isNotifyExpiry: boolean;
}