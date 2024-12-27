# Test Anthony Perrier

## Consigne 1 : Fonctionnalités de base
- [x] Lister les tâches
- [x] Modifier le titre et la description d’une tâche
- [x] Créer une nouvelle tâche
- [x] Supprimer une tâche
- [x] Marquer une tâche comme terminée


## Consigne 2 : Fonctionnalités améliorées
- [x] Barre de recherche par nom/description
- [x] Filtre par statut
- [x] Filtre par catégorie


## Choix effectués

J'ai préféré réaliser l'intégration en tailwind sans CSS spécifique, puisque déjà présent sur le projet et pour garder une cohérence facilement.
Je suis resté sur un découpage des composants très basique : list, item et modal. J'aurais pu découper davantage en sous-composants afin que l'ensemble soit plus modulable (notamment pour la barre de recherche/filtres), mais cela m'a paru un peu overkill dans le contexte du test.
Le store `tasks` gère tous les changements d'état, il est consommé depuis `TaskList.vue` qui reçoit l'ensemble des événements clés lancés par les composants enfants.
Une modale gère les actions de création et modification des tâches, il suffit de passer la prop `mode` pour adapter le template (il n'y a que le titre et le texte du bouton de soumission qui changent) puis on renvoie dans la liste à la bonne fonction pour gérer la soumission grâce à l'événement `@save`, ce qui nous permet de limiter les responsabilités de la modale à l'affichage uniquement. 