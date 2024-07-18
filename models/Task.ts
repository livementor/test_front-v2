interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    // TODO: à implémenter dans le cadre du test
    categories: any
}