# AGENTS.md — Nutri-Form

## Stack

- Site vitrine HTML / CSS / JavaScript vanilla.
- `index.html` point d’entrée.
- Pages statiques : `calorie.html`, `IMC.html`, `contact.html`, `forgotmdp.html`, `Mention.html`, `politique.html`, `login-popup.html`.
- Backend dans `backend/` (à préciser : probablement PHP ou Node selon contenu).
- Dossiers : `assets/`, `data/`.

## Conventions

- Préserver la structure des pages HTML existantes.
- Modifier le backend avec prudence ; lire `backend/` avant toute intervention.
- Pas de framework lourd sans accord.

## Mémoire de session

- `docs/sessions/SESSION.md` : session active.
- `docs/sessions/archive/AAAA-MM-JJ-<sujet>.md` : archives.
- `docs/DECISIONS.md` : decision log.
- `docs/STATE.md` : état validé du projet.

Au démarrage, lire `docs/STATE.md`, `docs/DECISIONS.md` et `docs/sessions/SESSION.md`.
À la clôture, mettre à jour `docs/STATE.md` et archiver la session.

## Definition of done

- Les pages HTML s’affichent correctement.
- Le backend reste fonctionnel.
- Aucune régression sur les formulaires existants.
