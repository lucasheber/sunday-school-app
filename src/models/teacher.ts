export interface Teacher {
    id: string;
    name: string;
    position: Position;
}

export interface Position {
    description: string;
    shorten: string;
}
