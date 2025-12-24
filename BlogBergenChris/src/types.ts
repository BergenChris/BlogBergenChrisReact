export interface BlogItem {
    id: number;
    date: string;
    title: string;
    description: string[];
    pos: string[];
    neg: string[];
    stress: number;
    motivation: number;
    tags?: string[];
}