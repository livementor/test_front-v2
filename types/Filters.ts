export enum Status {
  Completed = 'Complété',
  Pending = 'En cours',
}

export enum Priority {
  Low = 'Basse',
  Medium = 'Normal',
  High = 'Haute',
}

export enum SortBy {
  Title = 'Titre',
  Date = 'Date',
  Category = 'Catégorie',
  Status = 'Statut',
  Priority = 'Priorité',
}

export interface Filters {
  query: string
  category: number | ''
  status: Status | ''
  priority: Priority | ''
  sortBy: SortBy
}
