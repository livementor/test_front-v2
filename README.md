## Énoncé de Test Technique

### Contexte

Vous êtes chargé de créer une application de gestion de tâches sous forme de "to-do list" en utilisant les frameworks Vue.js, Nuxt.js. Ce test ne doit pas durer plus de 3h, et si vous n’avez pas terminé ce n’est pas grave nous aurons le temps de débriefer ensemble.

### Objectif

Votre application doit évoluer d'une simple liste de tâches vers une solution plus complexe, intégrant plusieurs fonctionnalités. Vous serez évalué sur :

- **Connaissance de Vue et Nuxt** : Votre capacité à utiliser ces technologies, compte tenu de votre expérience dans ces frameworks.
- **Organisation, scalabilité et maintenabilité du code** : La structure de votre projet, l'utilisation de bonnes pratiques de développement et la facilité avec laquelle votre code pourrait être lu, étendu ou maintenu.
- **Compétences en développement front-end** : La capacité à concevoir des composants réactifs et performants.

### Build Setup

⚠️ Veillez à avoir une version de node >=18

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

### Consigne 1 : Fonctionnalités de base

Votre application doit inclure les fonctionnalités suivantes, mises en œuvre dans une interface offrant une expérience utilisateur claire et fonctionnelle :

1. Lister les tâches
2. Marquer une tâche comme terminée
3. Modifier le titre et la description d’une tâche
4. Créer une nouvelle tâche
5. Supprimer une tâche

Dans ce projet, vous allez manipuler des données via des appels API réalisés à l'aide d'un composable nommé `useApi`. Ce composable est conçu pour simplifier l'interaction avec l'API locale, dont les endpoints sont situés dans le dossier `/server/api` du projet.

### Consigne 2 : Interface Utilisateur

En plus des fonctionnalités de base, vous pouvez concevoir une interface et des fonctionnalités améliorées qui permettent de gérer un grand nombre de tâches avec une meilleure expérience.

C’est le moment de faire parler votre créativité et de montrer vos compétences : tri, filtres, réorganisation de l’interface… Le champ des possibles s’offre à vous.

### Livrables

Créez une nouvelle branche “votre_nom” + _test sur le repository. Quand c’est terminé, créez une pull-request et demandez une review.
