import type { Category } from '~/types/Category'

export default defineEventHandler((): { categories: Array<Category> } => {
  return {
    categories: [
      { id: 1, name: 'Courses' },
      { id: 2, name: 'Ménage' },
      { id: 3, name: 'Organisation' },
      { id: 4, name: 'Santé' },
      { id: 5, name: 'Lecture' },
      { id: 6, name: 'Cuisine' },
      { id: 7, name: 'Travail' },
      { id: 8, name: 'Fitness' },
      { id: 9, name: 'Voyage' },
      { id: 10, name: 'Famille' },
      { id: 11, name: 'Social' },
      { id: 12, name: 'Bénévolat' },
      { id: 13, name: 'Réparation' },
      { id: 14, name: 'Artisanat' },
      { id: 15, name: 'Bien-être' },
      { id: 16, name: 'Loisir' },
      { id: 17, name: 'Réunion' },
    ],
  }
})
