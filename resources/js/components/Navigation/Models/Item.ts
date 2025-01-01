export interface Item {
    icon: string;
    to?: string;
    title: string;
    badge?: string | number;
    children?: Item[];
}