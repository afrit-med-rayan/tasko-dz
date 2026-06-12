# Tasko v0 — Guide des pages (prototype)

**Version:** 0.1.0 · **Usage:** presentation prototype + preparation PDF avec captures d'ecran  
**Stack:** Next.js 14 (web) + Express (API mock) · **Langues:** Francais + Arabe (RTL)

---

## 1. Vue d'ensemble du prototype

Tasko est la marketplace algerienne de services digitaux en DZD avec escrow, BaridiMob/CIB (simule en v0), et profils freelancers verifies.

**Ce que couvre v0 (demo):**
- Site public marketing (landing, tarifs, parcours)
- Catalogue freelancers + profils + fiches service
- Comptes demo client et freelancer avec tableaux de bord
- Auth simulee (inscription / connexion OTP)
- API mock sans base de donnees

**Ce qui n'est pas encore implemente (hors v0):**
- Paiement BaridiMob reel, escrow atomique, chat WebSocket, PostgreSQL, admin panel, mobile app

---

## 2. Demarrer le prototype

### Windows (recommande)

```powershell
cd c:\Users\asus\tasko-dz
npm install
npm run prototype
```

Le script:
1. Installe les dependances si necessaire
2. Libere les ports 3000 et 4000
3. Demarre l'API et le site web
4. Affiche le parcours demo
5. Propose d'ouvrir le navigateur

### Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run prototype` | Lance tout pour la presentation |
| `npm run dev` | API + web (sans guide interactif) |
| `npm run demo:pages` | Ouvre toutes les URLs demo (captures PDF) |
| `npm run dev:web` | Frontend seul (port 3000) |
| `npm run dev:api` | API seule (port 4000) |

### URLs serveurs

| Service | URL |
|---------|-----|
| Application web | http://localhost:3000 |
| API | http://localhost:4000 |
| Sante API | http://localhost:4000/api/v1/health |

### Comptes demo v0

| Persona | Nom | Role | Tableau de bord | Profil public |
|---------|-----|------|-----------------|---------------|
| Freelancer | Yacine Bensalem | Design graphique · Alger | `/freelancer/dashboard` | `/freelancer/yacine-bensalem` |
| Client | Nadia Khelifi | Cliente · Alger | `/client/dashboard` | — |

**Auth test:** inscription ou connexion → OTP **`1234`** (affiche a l'ecran en mode dev).

---

## 3. Parcours demo recommande (presentation live)

Ordre suggere pour une demo de 10–15 minutes:

1. **Accueil** — valeur Tasko, escrow DZD, section demo
2. **Basculer en arabe** — montrer RTL + traductions
3. **Dashboard freelancer (Yacine)** — KPIs, commandes, services
4. **Profil public Yacine** — confiance, avis, liste services
5. **Fiche service** — prix, escrow, bouton BaridiMob (placeholder)
6. **Dashboard client (Nadia)** — commandes en cours / terminees
7. **Catalogue freelancers** — recherche et filtres
8. **Comment ca marche + Tarifs** — transparence commission 10%
9. **Inscription / Connexion** — parcours OTP

---

## 4. Inventaire des pages

Pour chaque page: **URL**, **role**, **fonctions**, **elements UI cles**, **suggestion capture PDF**.

---

### 4.1 Accueil (Landing)

| | |
|---|---|
| **URL** | `/` |
| **Acces** | Public |
| **Objectif** | Presenter Tasko, convertir freelancers et clients |

**Sections et fonctions:**

| Section | Fonction |
|---------|----------|
| Hero | Titre, badge DZD/BaridiMob, 2 CTA (freelancer / client), statistiques |
| Carte apercu commande | Simule une commande escrow avec freelancer verifie |
| Comment ca marche (resume) | 8 etapes du parcours |
| Categories | 6 categories cliquables → catalogue filtre |
| Freelancers populaires | 4 cartes → profils publics |
| **Demo Tasko en action** | Cartes Yacine + Nadia → dashboards |
| Confiance | Escrow, verification, paiement DZD |
| Temoignages | 3 avis clients |
| CTA final | Inscription + explorer services |

**Captures PDF suggerees:**
- Hero complet (FR)
- Section demo (2 cartes)
- Hero ou footer en arabe (apres toggle langue)

---

### 4.2 Explorer — Catalogue freelancers

| | |
|---|---|
| **URL** | `/freelancers` |
| **Acces** | Public |
| **Objectif** | Rechercher et parcourir les talents |

**Fonctions:**
- Barre de recherche (texte → filtre API)
- Filtre par categorie via query `?category=design_graphique`
- Cartes freelancer: note, ville, prix depart, badge verifie, bouton Commander

**API:** `GET /api/v1/freelancers/search`

**Capture PDF:** liste avec au moins 2 cartes + barre de recherche visible.

---

### 4.3 Profil public freelancer

| | |
|---|---|
| **URL** | `/freelancer/yacine-bensalem` (ou autre username) |
| **Acces** | Public (SEO prevu en prod) |
| **Objectif** | Evaluer un freelancer avant commande |

**Fonctions:**
- Bandeau + avatar + badge verifie
- Stats: note, commandes, taux reponse
- Bio
- Liste des services avec prix et delai
- Avis clients verifies
- CTA Commander (prix minimum)

**API:**  
`GET /api/v1/freelancers/:id/public`  
`GET /api/v1/freelancers/:id/reviews`

**Capture PDF:** en-tete profil + bloc services + un avis.

---

### 4.4 Fiche service

| | |
|---|---|
| **URL** | `/service/s1` (ex. logo Yacine) |
| **Acces** | Public |
| **Objectif** | Detail offre + initiation paiement (v0: UI seulement) |

**Fonctions:**
- Description, delai, revisions
- Encart escrow + montant DZD
- Bouton « Payer via BaridiMob » (non connecte en v0)
- Lien retour vers profil freelancer

**API:** `GET /api/v1/services/:id`

**Capture PDF:** colonne gauche description + panneau sticky prix/escrow a droite.

---

### 4.5 Comment ca marche

| | |
|---|---|
| **URL** | `/comment-ca-marche` |
| **Acces** | Public |
| **Objectif** | Expliquer le parcours client/freelancer |

**Fonctions:**
- Texte introductif
- 8 etapes illustrees (parcourir → avis)
- Section confiance (escrow, verification, DZD)

**Capture PDF:** grille des 8 etapes + bloc confiance.

---

### 4.6 Tarifs

| | |
|---|---|
| **URL** | `/tarifs` |
| **Acces** | Public |
| **Objectif** | Transparence commission (0% client, 10% freelancer) |

**Fonctions:**
- 2 cartes: frais client Gratuit / commission freelancer 10%
- Liste avantages (DZD, escrow, support bilingue)

**Capture PDF:** les 2 cartes tarifaires cote a cote.

---

### 4.7 Inscription

| | |
|---|---|
| **URL** | `/inscription` ou `/inscription?role=FREELANCER` |
| **Acces** | Public |
| **Objectif** | Creer un compte (simulation) |

**Fonctions:**
- Toggle role Freelancer / Client
- Champs nom + telephone
- Soumission → envoi OTP mock → redirection connexion

**API:** `POST /api/v1/auth/register`

**Capture PDF:** formulaire avec role Freelancer selectionne.

---

### 4.8 Connexion + OTP

| | |
|---|---|
| **URL** | `/connexion` puis `/connexion?step=otp` |
| **Acces** | Public |
| **Objectif** | Authentification par telephone + OTP |

**Fonctions:**
- Saisie telephone → OTP envoye (console API en dev)
- Verification OTP → token stocké → redirection catalogue
- Code test v0: **1234**

**API:** `POST /api/v1/auth/login`, `POST /api/v1/auth/verify-otp`

**Capture PDF:** ecran OTP avec mention code test visible.

---

### 4.9 Dashboard freelancer (demo)

| | |
|---|---|
| **URL** | `/freelancer/dashboard` |
| **Acces** | Demo v0 (pas de garde auth) |
| **Persona** | Yacine Bensalem |
| **Objectif** | Espace travail freelancer |

**Fonctions:**

| Zone | Contenu |
|------|---------|
| Sidebar | Navigation: tableau de bord, services, commandes, messages, portefeuille, analytiques, profil |
| KPIs | Solde 28 500 DZD, commandes actives, note 4.9, taux completion 96% |
| Table commandes | Client, service, montant, statut, date |
| Mes services | Liste services avec prix et lien fiche |

**Donnees:** mock statique (`src/lib/demo-data.ts`)

**Capture PDF:** vue KPI + tableau commandes (scroll si necessaire).

---

### 4.10 Dashboard client (demo)

| | |
|---|---|
| **URL** | `/client/dashboard` |
| **Acces** | Demo v0 |
| **Persona** | Nadia Khelifi |
| **Objectif** | Suivi commandes cote client |

**Fonctions:**

| Zone | Contenu |
|------|---------|
| Sidebar | Tableau de bord, commandes, messages, compte |
| KPIs | 2 commandes en cours, 5 terminees, total depense 18 700 DZD |
| Table commandes | Freelancer (lien profil), service, montant, statut |
| CTA | « Trouver un freelancer » → catalogue |

**Capture PDF:** KPIs + une ligne commande ACTIVE visible.

---

## 5. Composants globaux (toutes pages publiques)

### Navbar
- Logo Tasko
- Liens: Explorer, Comment ca marche, Tarifs
- Toggle FR / العربية
- Connexion, S'inscrire
- Menu mobile (hamburger)

### Footer
- Liens navigation, email contact, selecteur langue
- Fond sombre

### Dashboard shell (pages /client/dashboard et /freelancer/dashboard)
- Sidebar fixe desktop, masquee sur mobile
- Pas de navbar/footer public
- Badge « Demo v0 »
- Lien retour accueil

---

## 6. Statuts de commande (badges)

| Statut | Signification demo |
|--------|-------------------|
| En cours (ACTIVE) | Commande payee, travail en cours |
| Livre (DELIVERED) | Freelancer a livre, attente confirmation client |
| Complete (COMPLETED) | Escrow libere, transaction terminee |
| En attente (PENDING_PAYMENT) | Commande creee, paiement non confirme |

Traduits en arabe via le toggle langue.

---

## 7. API mock (reference rapide)

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/health` | Sante serveur |
| `GET /api/v1/categories` | 6 categories services |
| `GET /api/v1/freelancers/search` | Recherche freelancers |
| `GET /api/v1/freelancers/:id/public` | Profil public |
| `GET /api/v1/freelancers/:id/reviews` | Avis |
| `GET /api/v1/services/:id` | Detail service |
| `POST /api/v1/auth/register` | Inscription |
| `POST /api/v1/auth/login` | Demande OTP |
| `POST /api/v1/auth/verify-otp` | Validation OTP |
| `GET /api/v1/demo/users` | Liste comptes demo |

---

## 8. Checklist captures pour PDF

Cocher au fur et a mesure. Prevoir **2 versions** (FR + AR) des pages principales.

| # | Page | URL | FR | AR |
|---|------|-----|----|----|
| 1 | Accueil — hero | `/` | ☐ | ☐ |
| 2 | Accueil — section demo | `/` (scroll) | ☐ | ☐ |
| 3 | Catalogue | `/freelancers` | ☐ | ☐ |
| 4 | Profil freelancer | `/freelancer/yacine-bensalem` | ☐ | ☐ |
| 5 | Fiche service | `/service/s1` | ☐ | ☐ |
| 6 | Dashboard freelancer | `/freelancer/dashboard` | ☐ | ☐ |
| 7 | Dashboard client | `/client/dashboard` | ☐ | ☐ |
| 8 | Comment ca marche | `/comment-ca-marche` | ☐ | ☐ |
| 9 | Tarifs | `/tarifs` | ☐ | ☐ |
| 10 | Inscription | `/inscription` | ☐ | ☐ |
| 11 | Connexion OTP | `/connexion?step=otp` | ☐ | ☐ |

**Conseils capture:**
- Resolution: 1440×900 ou 1920×1080
- Navigateur: Chrome/Edge, barre d'adresse visible optionnelle
- Masquer barres de favoris pour un rendu pro
- Nommer fichiers: `01-accueil-fr.png`, `01-accueil-ar.png`, etc.

---

## 9. Structure suggeree du PDF final

1. **Couverture** — Tasko, marketplace talents algeriens, v0 prototype, date
2. **Resume executif** — probleme, solution, escrow DZD, commission 10%
3. **Parcours utilisateur** — schema 8 etapes (capture Comment ca marche)
4. **Espace public** — landing, catalogue, profil, service
5. **Espace freelancer** — dashboard Yacine
6. **Espace client** — dashboard Nadia
7. **Auth & onboarding** — inscription, OTP
8. **Tarification** — page tarifs
9. **Bilingue** — comparaison FR/AR (2 captures cote a cote)
10. **Roadmap** — fonctionnalites Phase 2 (DB, paiement reel, chat, mobile)

---

## 10. Freelancers mock disponibles

| Nom | Username | Specialite | Ville |
|-----|----------|------------|-------|
| Yacine Bensalem | yacine-bensalem | Design graphique | Alger |
| Amina Khelifi | amina-khelifi | Dev web | Oran |
| Karim Hadjadj | karim-hadjadj | Video | Constantine |
| Sara Meziane | sara-meziane | Redaction | Annaba |

---

*Document genere pour Tasko v0 — a mettre a jour a chaque iteration du prototype.*
