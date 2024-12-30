# Test Technique Honel Steve

## Partie 1 - Fonctionnalités de base

- J'ai utilisé le design system de LiveMentor pour produire un design cohérent.
  - Par manque de temps, je n'ai pas pu tout explorer, il se peut donc que des éléments ne soient pas parfaitement intégré.
  - L'utilisation du design system m'a posé quelques soucis, n'ayant pas voulu perdre trop de temps dessus. Quelques raccourcis ont été pris, notamment dans le fichier main.scss.
  - Il semble y avoir un souci avec le SSR et le composant Dropdown => Il utilise un UUID (différent entre le serveur et le front), ce qui provoque une erreur d'hydratation.

- Je n'ai pas voulu dépasser le temps imparti, je n'ai donc pas une version parfaite responsive de l'application.
- J'aurais bien aimé avoir les conventions de codage pour pouvoir les suivre, je me suis donc appuyé sur différents projets fait par le passé.

- Les fonctionnalités de base sont implémentées.
  - [X] Lister les tâches
  - [X] Marquer une tâche comme terminée
  - [X] Modifier le titre et la description d’une tâche
  - [X] Créer une nouvelle tâche
  - [X] Supprimer une tâche

- Durant mon test, j'ai créé un composant debug, me permettant de recharger/supprimer toutes les données de l'API
  - J'ai laissé le composant pour le test, mais ça aurait été supprimé pour un projet en production ou au moins désactivé.

## Partie 2 - Améliorations apportées
- [X] Ajout de la possibilité de mettre une priorité sur une tâche
- [X] Recherche et Filtres
  - Ajout de la possibilité de filtrer les tâches par statut (toutes, en cours, terminées)
  - Ajout de la possibilité de filtrer les tâches par priorité (toutes, prioritaires, non prioritaires)
  - Ajout de la possibilité de filtrer les tâches par titre (recherche)
- [X] Ajout de statistiques sur le nombre de tâches, le nombre de tâches terminées, le nombre de tâches en cours, le nombre de tâches prioritaires, le nombre de tâches non prioritaires
- [X] Version minimale responsive (manque de temps)

## Partie 3 - Pistes d'amélioration (manque de temps)
- [ ] Dark Mode 
- [ ] Ajout de catégories de tâches
- [ ] Ajout de la pagination pour les tâches
- [ ] Ajout de Deadline pour les tâches
- [ ] Permettre de faire des sous-taches
- [ ] Pagination
- [ ] Ajout de la confirmation avant de supprimer une tâche
