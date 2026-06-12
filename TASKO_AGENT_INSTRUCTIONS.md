# TASKO — Full Application Build Instructions
**Version 1.0 · Agent-Ready Specification**
> Algeria's first trusted two-sided digital services marketplace. DZD payments, escrow-protected, bilingual AR/FR.

---

## TABLE OF CONTENTS

1. [Project Overview & Goals](#1-project-overview--goals)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Design System & Brand Tokens](#3-design-system--brand-tokens)
4. [User Roles & Permissions](#4-user-roles--permissions)
5. [App Information Architecture](#5-app-information-architecture)
6. [Screen Specifications — Mobile](#6-screen-specifications--mobile)
7. [Screen Specifications — Web](#7-screen-specifications--web)
8. [Core Feature Specifications](#8-core-feature-specifications)
9. [Payment & Escrow Engine](#9-payment--escrow-engine)
10. [API Endpoints Reference](#10-api-endpoints-reference)
11. [Database Schema](#11-database-schema)
12. [Notifications System](#12-notifications-system)
13. [Admin Panel](#13-admin-panel)
14. [Localization & Bilingual Rules](#14-localization--bilingual-rules)
15. [Performance & Accessibility](#15-performance--accessibility)
16. [Security Requirements](#16-security-requirements)
17. [Deployment & Infrastructure](#17-deployment--infrastructure)
18. [MVP vs Phase 2 Feature Flags](#18-mvp-vs-phase-2-feature-flags)
19. [Backend Architecture Notes](#19-backend-architecture-notes)
20. [UI Component States](#20-ui-component-states)
21. [API Contract Examples](#21-api-contract-examples)
22. [Database ERD & Privacy Notes](#22-database-erd--privacy-notes)

---

## 1. PROJECT OVERVIEW & GOALS

**Tasko** is Algeria's first trusted two-sided digital services marketplace. It connects verified Algerian freelancers (supply) with Algerian businesses and individuals (demand) through a bilingual Arabic/French platform where every transaction is protected by a DZD escrow system, payments are made via BaridiMob or CIB card, and reputation is built through transaction-backed reviews.

### Problem Tasko Solves

Algerian freelancers lose up to 36.25% of earnings on international platforms through fees, currency conversion, and banking restrictions — or operate invisibly through informal Instagram/Facebook channels with zero protection. Clients have no trusted, local, structured marketplace to find and hire verified digital talent in DZD.

### Primary Objectives

- Build a verified, two-sided marketplace connecting Algerian freelancers and clients entirely in DZD
- Implement an escrow payment system protecting both parties — funds held until confirmed delivery
- Enable BaridiMob and CIB card payments natively, no international gateways
- Create transaction-backed verified profile system replacing informal Instagram trust signals
- Deliver bilingual Arabic/French UI with mobile-first design optimized for 3G Algerian connections
- Charge a single transparent **10% commission to freelancers** on successful completion (clients pay zero platform fees)

### MVP Success Metrics

| Metric | MVP Target | Month 6 Target |
|--------|-----------|----------------|
| Active verified freelancers | 100 | 500 |
| Active clients | 50 | 300 |
| Completed transactions | 200 | 1,000 |
| Average order value | 2,800 DZD | 3,200 DZD |
| Platform rating | 4.0+ | 4.5+ |
| Dispute rate | < 10% | < 5% |
| Mobile load time (3G) | < 5 seconds | < 3 seconds |
| Escrow payment failures | 0 | 0 |

---

## 2. TECH STACK & ARCHITECTURE

### Technology Choices

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Mobile App | React Native + Expo | Single codebase iOS/Android. Expo Router for navigation. OTA updates. |
| Web App | React 18 + Next.js 14 (App Router) | SSR for SEO on landing/profile pages. CSR for authenticated dashboard. Shares component library with mobile. |
| Shared UI Library | Tamagui + custom Tasko DS | Runs on both React Native and React web. Design tokens shared across platforms. |
| Backend API | Node.js + Express + TypeScript | REST API for CRUD. WebSocket (Socket.io) for real-time chat and notifications. |
| Database | PostgreSQL 15+ | Relational integrity for financial transactions. UUID primary keys. Row-level security. |
| Cache / Sessions | Redis | Session store, rate limiting, real-time presence, notification queuing. |
| File Storage | AWS S3 or Cloudflare R2 | Portfolio images, delivery files, profile photos. Signed URLs for private delivery files. |
| Payment | BaridiMob API + CIB Gateway | Primary: BaridiMob for mass-market DZD. Secondary: CIB card via Algerian e-payment gateway. |
| Auth | JWT + Refresh Tokens + OTP SMS | Phone number as primary identity. OTP via Algerian SMS gateway (Ooredoo or Djezzy API). |
| Search | PostgreSQL FTS (MVP) then Elasticsearch (Phase 2) | Arabic + French full-text search with accent normalization. |
| Email / Notifications | Nodemailer + Firebase FCM | Transactional email + mobile push notifications for order updates. |
| Monitoring | Sentry + Datadog | Error tracking and performance monitoring in production. |
| CI/CD | GitHub Actions + Docker + Railway/Render | Automated tests on PR, staging deploy on merge, production on release tag. |

### Architecture Overview

```
CLIENT LAYER
  React Native (iOS + Android)        Next.js Web App
  Expo Router · Tamagui UI            App Router · SSR + CSR
           └──────────────┬──────────────┘
                          │ HTTPS / WSS
              API GATEWAY (Nginx)
        Rate Limiting · Auth Middleware · SSL Termination
                          │
              APPLICATION SERVER (Node.js)
    REST API (/api/v1)          WebSocket Server (Socket.io)
    Auth Service                Escrow Engine
    Notification Service        File Upload Service
         │                                   │
  PostgreSQL     Redis Cache/Queue     AWS S3 / R2
                       │
              EXTERNAL SERVICES
    BaridiMob Payment API · CIB Card Gateway
    Algerian SMS Gateway · Firebase FCM
```

### Backend Module Structure (Modular Monolith — MVP)

Use a **modular monolithic architecture**: one main Node.js/Express backend, structured into clearly separated internal modules.

```
src/
├── modules/
│   ├── auth/           # OTP, JWT, registration, login
│   ├── users/          # Profiles, verification, portfolio
│   ├── services/       # Freelancer service listings CRUD
│   ├── orders/         # Order lifecycle, status machine
│   ├── payment/        # BaridiMob + CIB integration, webhooks
│   ├── escrow/         # Escrow lock/release engine (atomic)
│   ├── chat/           # WebSocket rooms, message persistence
│   ├── notifications/  # FCM push, in-app, email
│   ├── wallet/         # Freelancer wallet, withdrawals
│   ├── reviews/        # Review submission, moderation
│   ├── disputes/       # Dispute lifecycle, admin resolution
│   └── admin/          # Admin-only routes and actions
├── shared/
│   ├── middleware/     # Auth, rate limiting, validation
│   ├── database/       # Knex/Drizzle setup, migrations
│   ├── storage/        # S3 presigned URL helpers
│   └── utils/          # Formatting, localization helpers
├── sockets/
│   └── chatSocket.ts   # Socket.io setup
└── app.ts
```

---

## 3. DESIGN SYSTEM & BRAND TOKENS

### Color Palette

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--color-teal` | `#1D9E75` | Primary Brand | Primary buttons, links, active states, logo |
| `--color-teal-dark` | `#0F6E56` | Teal Dark | Hover states, text on teal wash backgrounds |
| `--color-teal-light` | `#9FE1CB` | Teal Light | Borders on teal surfaces, decorative accents |
| `--color-teal-wash` | `#E1F5EE` | Teal Wash | Escrow surfaces, verified badges, info cards |
| `--color-amber` | `#EF9F27` | Accent / CTA | BaridiMob pay button, status badges |
| `--color-amber-light` | `#FAC775` | Amber Light | Amber badge backgrounds |
| `--color-amber-dark` | `#BA7517` | Amber Dark | Text on amber backgrounds |
| `--color-charcoal` | `#111210` | Headings | H1, H2, logo text |
| `--color-dark-gray` | `#444441` | Body Text | All body text, paragraph content |
| `--color-mid-gray` | `#888780` | Muted / Caption | Captions, meta info, secondary labels |
| `--color-light-border` | `#D3D1C7` | Border Default | Card borders, dividers, input borders |
| `--color-off-white` | `#F1EFE8` | Page Background | App background, input backgrounds |
| `--color-white` | `#FFFFFF` | Card Background | Card surfaces, modal backgrounds |
| `--color-red` | `#E24B4A` | Danger / Error | Dispute state, error messages |
| `--color-green` | `#EAF3DE` | Success Background | Completed order state, success toasts |
| `--color-green-dark` | `#3B6D11` | Success Text | Text on green backgrounds |

> **Optional trust color:** Consider a limited blue accent (e.g. `#1A6FBF`) exclusively for verified badges, escrow security indicators, and confirmed payment status. Blue communicates reliability and security — use as complement, not replacement, to teal/amber identity.

### Typography

| Level | Size | Weight | Tracking | Usage |
|-------|------|--------|----------|-------|
| Display | 48px / 30sp | Bold 700 | -1.5px | Hero headlines, landing page only |
| H1 | 32px / 20sp | SemiBold 600 | -0.8px | Screen titles, section headers |
| H2 | 24px / 15sp | SemiBold 600 | -0.4px | Card titles, subsection headers |
| H3 | 18px / 11sp | Medium 500 | 0px | Sub-card titles, list section headers |
| Body | 16px / 10sp | Regular 400 | 0px | All body content, descriptions |
| Body Small | 14px / 8.75sp | Regular 400 | 0px | Secondary info, timestamps |
| Caption | 12px / 7.5sp | Regular 400 | +0.2px | Meta info, labels, badges |
| Sub-label | 10px / 6.25sp | Medium 500 | +2px | Category pills (uppercase) |

- **Font:** Inter (primary). Fallback: `-apple-system, Helvetica Neue, sans-serif`
- **Arabic:** Noto Sans Arabic — auto-applied via RTL detection when locale is `ar`

### Spacing & Radius

- **Spacing base:** 4px unit. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- **Border radius:** Buttons 10px · Cards 14px · Modals 20px · Logo square 22% of mark size · Bottom sheets 20px top corners only

### Reusable UI Components (standardize before building screens)

Build and document all states for each of these before any screen work:

`Button` · `Input` · `Card` (Service, Freelancer, Order, Hero, Escrow Surface) · `Badge` · `BottomSheet` · `Stepper` · `Toast` · `Tabs` · `FileUpload` · `RatingStars` · `Avatar` · `CategoryPill`

---

## 4. USER ROLES & PERMISSIONS

| Role | Can Do | Cannot Do |
|------|--------|-----------|
| **Guest** | Browse profiles, view listings, read reviews, see pricing | Place orders, send messages, access dashboard, pay |
| **Client** | Browse, search, filter. Place orders with brief. Pay via BaridiMob/CIB. Chat. Confirm delivery. Leave reviews. Open disputes. | Post services, receive payments, access freelancer dashboard |
| **Freelancer** | Create/manage service listings. Receive and accept orders. Chat. Upload deliveries. Request revisions. Withdraw DZD. View earnings analytics. | Place orders as buyer (unless dual-role), bypass escrow |
| **Dual-role** | All client + freelancer capabilities. Separate wallet views. Toggle between modes in UI. | Same escrow and commission rules apply in both directions |
| **Admin** | Full platform access. Manage users, resolve disputes, approve profiles, view all transactions, manage categories, send announcements. | Override completed escrow releases without dispute process |

---

## 5. APP INFORMATION ARCHITECTURE

### Mobile Navigation Structure

```
UNAUTHENTICATED STACK
  /splash                     Welcome screen, role selection
  /auth/register              Phone + role registration form
  /auth/otp                   OTP verification
  /auth/profile-setup         Name, skills/category, bio (post-OTP)
  /auth/login                 Return login (phone + OTP)

CLIENT BOTTOM TAB NAVIGATOR
  Tab 1: Home (/client/home)
    /client/search                      Full-screen search with filters
    /client/category/:id                Category browse
    /client/freelancer/:id              Freelancer profile
    /client/service/:id                 Service detail
    /client/order/new/:serviceId        Order creation (brief form)
    /client/order/:id                   Order detail / tracking
    /client/order/:id/deliver           Delivery confirmation screen
    /client/order/:id/review            Leave review screen
    /client/dispute/:orderId            Open dispute form
  Tab 2: My Orders (/client/orders)
  Tab 3: Messages (/messages)
    /messages/:orderId                  In-order chat
  Tab 4: Account (/client/account)
    /client/account/settings
    /client/account/payment-methods

FREELANCER BOTTOM TAB NAVIGATOR
  Tab 1: Dashboard (/freelancer/home)
    /freelancer/orders/active
    /freelancer/order/:id
    /freelancer/order/:id/upload
  Tab 2: My Services (/freelancer/services)
    /freelancer/services/new
    /freelancer/services/:id/edit
  Tab 3: Messages (/messages)
  Tab 4: Profile (/freelancer/profile)
    /freelancer/profile/edit
    /freelancer/wallet
    /freelancer/wallet/withdraw
    /freelancer/analytics
    /freelancer/reviews
```

### Web Route Structure (Next.js)

```
PUBLIC ROUTES (SSR — indexed by search engines)
  /                           Landing page
  /comment-ca-marche          How it works
  /tarifs                     Pricing / commission explanation
  /freelancers                Browse all freelancers
  /freelancer/:username       Public freelancer profile
  /service/:id                Public service listing
  /inscription                Registration page
  /connexion                  Login page

AUTHENTICATED ROUTES (CSR — not indexed)
  /client/
    dashboard
    orders
    orders/:id
    messages
    messages/:orderId
    compte
  /freelancer/
    dashboard
    services
    services/nouveau
    orders
    orders/:id
    messages
    portefeuille
    analytiques
    profil/modifier

ADMIN ROUTES (role-gated)
  /admin/dashboard
  /admin/users
  /admin/orders
  /admin/disputes
  /admin/transactions
  /admin/categories
```

---

## 6. SCREEN SPECIFICATIONS — MOBILE

### 6.1 Splash / Welcome Screen (`/splash`) — Guest

**UI Elements:**
- Tasko logo: outlined rounded square + T letterform + amber dot (21% of mark size). Teal `#1D9E75` fill.
- Wordmark: 'tasko' Inter Bold lowercase, color `#1D9E75`. Amber dot on the period.
- Tagline: 'La marketplace des talents algériens' Inter Regular, Amber `#EF9F27`, 16px.
- Background: Teal wash `#E1F5EE` gradient top 40%, white bottom.
- Primary CTA: 'Je suis freelancer' — full width, teal fill, white text, 10px radius, 52px height.
- Secondary CTA: 'Je cherche un prestataire' — full width, 1.5px teal border, transparent fill, 52px height.
- Bottom link: 'Déjà un compte? Connexion' 12px teal hyperlink.
- No navigation bar on this screen.

**Interactions:**
- Tap 'Je suis freelancer' → `/auth/register?role=FREELANCER`
- Tap 'Je cherche un prestataire' → `/auth/register?role=CLIENT`
- Tap 'Connexion' → `/auth/login`
- Valid JWT session on app launch → auto-redirect to appropriate dashboard

**Implementation Notes:**
- Store selected role in navigation params AND AsyncStorage.
- Logo animation: scale 0.8 → 1.0 over 400ms with opacity fade-in. Total: 1200ms before showing buttons.

---

### 6.2 Registration Screen (`/auth/register`) — Guest

**UI Elements:**
- Header: 'Créer un compte' H2, Charcoal, no back button.
- Role toggle: Two pill buttons ('Freelancer' / 'Client'). Selected = teal fill. Unselected = off-white ghost. Pre-selected from splash.
- Input: Nom complet — 48px height, off-white bg, 0.5px light border, 8px radius.
- Input: Numéro de téléphone — phone with +213 prefix, numeric keyboard.
- Input: Email — optional for clients, required for freelancers.
- Input: Mot de passe — password type, show/hide toggle.
- Dropdown: Spécialité (freelancer only) — bottom sheet picker. Options: Design graphique, Vidéo & Animation, Traduction, Développement web, Social media, Rédaction, Autre.
- Trust line: 'Paiements 100% DZD · Escrow sécurisé · 10% commission seulement' 11px mid-gray.
- Submit: 'Créer mon compte' — full width, teal, 52px, disabled until all required fields valid.
- Terms link: 11px below button.

**Interactions:**
- Phone auto-format to `+213 XX XX XX XX`. Strip non-numeric on paste.
- Real-time validation: green checkmark when valid; red underline + inline error when invalid.
- Specialty dropdown: bottom sheet modal with searchable list.
- Submit: disable + spinner → `POST /api/v1/auth/register` → on success navigate to `/auth/otp` passing phone.
- `KeyboardAvoidingView` — bottom inputs scroll into view when keyboard opens.

---

### 6.3 OTP Verification Screen (`/auth/otp`) — Guest

**UI Elements:**
- Header: 'Vérification' H2 centered. Back arrow top-left.
- Icon: Mobile phone icon in teal wash circle, 56px diameter, centered.
- Subtitle: 'Code envoyé au +213 6XX XXX XXX' 14px mid-gray centered. Last 6 digits masked.
- OTP input: 4 separate single-digit boxes, each 48×56px. Teal 1.5px border when focused; green when filled. Auto-advance. Numeric keyboard.
- Submit: 'Vérifier' — full width teal, activated when all 4 boxes filled.
- Resend: 'Renvoyer le code dans 0:45' countdown. Becomes tappable link after countdown hits 0.
- Error state: Shake animation + red border + 'Code incorrect, réessayez.'

**Interactions:**
- Auto-focus first box on mount.
- On last digit entry → auto-submit (debounce 300ms).
- `POST /api/v1/auth/verify-otp` → on success navigate to `/auth/profile-setup` (new) or dashboard (returning). Store JWT + refresh token in secure keychain.
- Resend: `POST /api/v1/auth/resend-otp`. Reset countdown 60s. Toast 'Code renvoyé'.
- After 3 failed attempts → lock screen 5 minutes with countdown.

---

### 6.4 Client Home Feed (`/client/home`) — Client

**UI Elements:**
- Top bar: Tasko logo left + notification bell (unread dot) + client avatar circle right (28×28px, initials, amber wash bg).
- Search bar: Mock input (tap navigates to `/client/search`). Placeholder: 'Rechercher un service…'. 48px height, off-white bg.
- Category pills: Horizontal scroll. Tout (selected=teal), Design, Vidéo, Traduction, Dev web, Social media, Rédaction. Each: 32px height, 10px padding, 20px radius.
- Section 'Freelancers populaires': H3 + 'Voir tout →' link. Vertical list of Freelancer Cards.
  - **Freelancer Card:** white, 0.5px border, 14px radius, 12px padding. Avatar 36×36, name 12px bold, specialty 11px gray, verified badge, star rating + count, starting price in teal, 'Commander' button.
- Section 'Catégories': 2×3 grid of category icon cards.
- Section 'Vu récemment': Horizontal scroll of service cards (if applicable).
- Bottom tab bar: Accueil (active/teal), Explorer, Commandes, Messages.

**Interactions:**
- Pull to refresh → reload feed.
- Category pill tap → filter feed. 'Tout' clears filter.
- Search bar tap → `/client/search` with keyboard auto-opened.
- Freelancer card tap → `/client/freelancer/:id`.
- 'Commander' button → `/client/service/:id` or `/client/freelancer/:id`.

**Implementation Notes:** Lazy load cards on scroll. Skeleton loading while fetching. Cache with React Query, 5-minute stale time.

---

### 6.5 Search & Filter Screen (`/client/search`) — Client

**UI Elements:**
- Search input: Auto-focused on mount. Back arrow left. Clear (×) icon right when text present. 48px height.
- Filter pills (horizontal scroll): Budget, Note, Localisation, Vérifié, Délai. Each opens bottom sheet.
  - Budget: Slider range min/max DZD + presets (< 2,000 / 2,000–5,000 / 5,000–10,000 / > 10,000)
  - Rating: Star selector 1★ → 5★ minimum.
  - Vérifié: Toggle switch.
  - Délai: 24h / 48h / 72h / 1 semaine.
- Results list: Same freelancer card format. Count: '48 résultats pour design graphique'.
- Empty state: Illustration + 'Aucun résultat.' + 'Effacer les filtres' button.
- Recent searches: Below bar when empty+focused. Up to 5 recent queries.

**Interactions:**
- Debounce search input 300ms before API call.
- `GET /api/v1/freelancers/search?q=:query&category=:cat&minPrice=:min&maxPrice=:max&minRating=:rating&verified=:bool`
- Filters are additive (AND logic). Clear individual filter via × on pill.
- Recent searches in AsyncStorage.
- Arabic query: normalize hamza variants, strip diacritics before sending to API.

---

### 6.6 Freelancer Profile Screen (`/client/freelancer/:id`) — Client (Guest can view)

**UI Elements:**
- Cover: 80px height teal wash gradient. Freelancer avatar overlapping bottom (48×48, initials, teal wash bg). Verified badge (shield-check + 'Vérifié') bottom-right.
- Name: 16px bold. Specialty: 13px mid-gray. City: 13px with location pin icon.
- Stats row: Rating (star + number + count), Commandes complétées, Taux réponse. Three equal columns.
- About section: Bio text, collapsible if > 3 lines. 'Voir plus' teal link.
- Languages: Tags Arabe, Français, Anglais.
- Services section: Vertical list of service cards. Each: name bold, delivery time, revision count, price teal right-aligned, 'Commander' button.
- Portfolio tab: 3-column grid of portfolio thumbnails. Tap = full-screen lightbox with swipe navigation.
- Reviews tab: List of reviews. Client avatar + name + date + star rating + text. Load 5 initially, 'Charger plus' pagination.
- Sticky bottom bar: 'Commander dès X DZD' amber button, full width.

**Interactions:**
- 'Commander' → `/client/order/new/:serviceId`
- Portfolio tap → full-screen lightbox.
- Share icon → native share sheet with profile URL.
- Report (kebab menu top-right) → Report form.

**API:** `GET /api/v1/freelancers/:id/public` · `GET /api/v1/freelancers/:id/reviews?page=:n&limit=5`

---

### 6.7 Order Creation Screen (`/client/order/new/:serviceId`) — Client

**UI Elements:**
- Header: 'Passer commande' H2. Back arrow.
- Service summary card: Freelancer avatar + name + service name + price. Non-editable.
- Field: 'Brief du projet' — mandatory, multi-line textarea, min 50 characters. Red * required. Character count shown.
- Field: 'Délai souhaité' — dropdown: 24h / 48h / 72h / 1 semaine / Date personnalisée.
- Field: 'Fichiers de référence' — optional file picker. Accept: images, PDF, .zip. Max 10MB total. Thumbnail previews.
- Field: 'Budget convenu' — pre-filled with service price, editable only if freelancer allows negotiation.
- Escrow info box: Shield-lock icon + 'Protection escrow Tasko' in teal wash box.
- Order summary: Service price, 'Frais Tasko (client): Gratuit', Total.
- Pay button: 'Payer via BaridiMob' — Amber, full width, 52px, phone icon left.
- Below: 'Ou payer par carte CIB' — teal link.

**Interactions:**
- Brief: Validate min 50 characters before enabling pay button.
- File attach: Native picker → validate MIME/size → pre-upload to S3 → show upload progress.
- BaridiMob tap: `POST /api/v1/orders/create` → on success redirect to BaridiMob payment URL. Webhook updates order status.
- CIB tap: Same flow with CIB gateway redirect URL.
- On successful payment: Navigate to `/client/order/:id` status `ACTIVE`. Push notification to freelancer.
- Back tap with filled form: 'Quitter sans payer?' confirmation dialog.

**Notes:** Brief stored as JSON in `orders.brief_json`. Cannot be edited after payment. BaridiMob session expires in 15 minutes → auto-cancel pending order.

---

### 6.8 Order Detail Screen — Client (`/client/order/:id`) — Client

**UI Elements:**
- Header: Order ID badge (#042) + Status badge (dynamic color). Back arrow.
- Timeline stepper: Brief soumis → Paiement confirmé → En cours → Livré → Complété.
- Freelancer info card: Avatar + name + specialty + chat button.
- Deadline countdown: Amber if < 24h, teal otherwise, red if overdue.
- Escrow status bar: Shield + 'X DZD en escrow'. Teal wash background.
- Delivery section (when `status=DELIVERED`): Download button per file. File name + size. Preview thumbnail for images.
- Action buttons (contextual by status):
  - `ACTIVE`: 'Envoyer un message' (secondary)
  - `DELIVERED`: 'Confirmer la livraison' (teal primary) + 'Demander une révision' (secondary)
  - `REVISION`: 'Voir la révision demandée' info card
  - `COMPLETED`: 'Laisser un avis' (amber)
  - `DISPUTE`: 'Voir le litige en cours' status card
- Bottom: 'Signaler un problème / Ouvrir un litige' gray text link (available in `ACTIVE` and `DELIVERED`).

**Interactions:**
- 'Confirmer la livraison': Confirmation modal → `POST /api/v1/orders/:id/confirm` → navigate to review screen.
- 'Demander une révision': Bottom sheet with textarea (min 20 chars) → `POST /api/v1/orders/:id/request-revision`.
- Auto-confirm timer: If client does not confirm/reject within 72h of delivery → auto-confirm fires server-side.

---

### 6.9 In-Order Chat Screen (`/messages/:orderId`) — Client & Freelancer

**UI Elements:**
- Header: Back arrow + avatar + name + online indicator (green dot). Order badge right.
- Escrow notice (sticky below header): Teal wash bar. Shield + 'Paiement sécurisé en escrow · X DZD'. Always visible.
- Message bubbles: Own: teal fill, white text, right-aligned. Other: off-white fill, dark text, left-aligned. Read receipts (✓ sent, ✓✓ delivered, ✓✓ teal = read) for own messages only.
- System messages: Centered gray italic. E.g. 'Commande créée le 12 Jan 2025'.
- File attachment: Thumbnail (images) or file icon + name (PDFs, zips).
- Date dividers: Gray centered date labels.
- Input area: Paperclip icon + text input (grow to 3 lines max) + teal circle send button.

**Interactions:**
- WebSocket connection via Socket.io room keyed by `orderId`. Connect on mount, disconnect on unmount.
- Send: emit `message:send`. Optimistically render. On ACK → update status.
- File attach: Native picker → upload to S3 → send file message with S3 URL.
- Typing indicator: emit `typing:start` on keypress, `typing:stop` after 1.5s pause.
- Offline: Queue unsent messages locally. Re-send on reconnect. Show 'Reconnexion...' banner.

**Notes:** Cursor-based pagination (last 50 on mount, load older on scroll-up). Socket.io rooms namespaced `/orders/:orderId`. Presence managed in Redis.

---

### 6.10 Freelancer Dashboard Mobile (`/freelancer/home`) — Freelancer

**UI Elements:**
- Top bar: 'Bonjour, [Name]' + avatar with notification dot.
- Stats grid (2×2): Solde escrow (teal card, DZD amount), Ce mois (order count), Ma note (star + number), Taux complétion (percentage).
- Section 'Commandes actives': Order list. Each: client avatar + name + service + amount + status badge. Tap → `/freelancer/order/:id`.
- Section 'Actions rapides': Ajouter un service, Modifier mon profil, Voir mon portefeuille.
- Section 'Dernière activité': Timeline of recent events.
- Bottom tabs: Accueil, Commandes, Messages, Profil.

---

### 6.11 Freelancer Order Management Screen (`/freelancer/order/:id`) — Freelancer

**UI Elements:**
- Header: Order ID + client name + Status badge.
- Client brief card: Full text of brief. Teal wash bg. Read-only. File attachments if any.
- Deadline card: Countdown timer prominent (hh:mm:ss if < 24h). Red when overdue.
- Chat button: Full-width secondary → `/messages/:orderId`.
- Delivery section: Upload area. 'Glisser-déposer ou choisir les fichiers'. Accept: images, PDF, AI, PSD, ZIP. Max 50MB total. Already-uploaded files list with delete option.
- Delivery message: Optional textarea.
- CTA: 'Livrer la commande' — teal, full width, disabled until at least 1 file uploaded.
- Revision section (if client requested): Revision request text in amber info box. New upload area.
- Cancel: 'Annuler la commande' small gray text link. Warning about reputation impact.

**Interactions:**
- 'Livrer la commande': `POST /api/v1/orders/:id/deliver` with fileUrls + message → status `DELIVERED`. Push to client.
- File upload: Pre-upload to S3 using presigned URL from `GET /api/v1/orders/:id/upload-url`. Show progress bar per file.
- Cancel: Multi-step flow with reason selection.

---

### 6.12 Freelancer Wallet Screen (`/freelancer/wallet`) — Freelancer

**UI Elements:**
- Hero card: Full-width teal rounded card. 'Solde disponible' + large DZD amount. Sub-metrics: 'En escrow' + 'Ce mois' in translucent white boxes.
- Withdrawal button: 'Virer vers BaridiMob' — Amber, full width. 'Minimum de retrait: 1,000 DZD' below.
- Pending section: 'En attente (escrow)' — orders with locked amounts + countdown to release.
- History section: Paginated transaction list. Arrow-down-left (green = incoming) or arrow-up-right (gray = withdrawal). Service name + client. Date + amount.
- Filter: Date range picker. Export → CSV.

**Interactions:**
- Withdrawal tap: Bottom sheet → input amount (min 1,000 DZD, max = available balance) + BaridiMob number → `POST /api/v1/wallet/withdraw`.
- Transaction row tap: Detail modal with full breakdown including Tasko commission.
- Infinite scroll: `GET /api/v1/wallet/transactions?cursor=:id&limit=20`.

**Notes:** Commission deducted at time of escrow release, not at order creation. Withdrawal processed within 24 business hours + status SMS.

---

## 7. SCREEN SPECIFICATIONS — WEB

### 7.1 Landing Page (`/`)

SSR via Next.js. Bilingual AR/FR toggle at top-right.

| Section | Specification |
|---------|---------------|
| Navigation Bar | Logo left. Nav: Explorer, Comment ça marche, Tarifs. Right: language toggle (FR/AR), 'Connexion' outline button, 'S'inscrire' teal filled button. Sticky on scroll. White bg, 0.5px bottom border. |
| Hero Section | Two-column 60/40 (stacked mobile). Left: Badge 'Paiement 100% DZD · BaridiMob & CIB'. H1: 'La marketplace des talents algériens'. Description. Two CTAs: 'Je suis freelancer' (teal) + 'Je cherche un talent' (outline). Three stats: 500+ freelancers / 10% commission / 4.8★. Right: Live preview card mock. |
| How It Works | Off-white background. H2 centered. Eight-step horizontal flow: Browse → Profile → Brief → Escrow payment → Collaborate → Delivery → Confirm → Review. Each: icon circle (teal wash) + step number + title 12px bold + description 11px gray. |
| Category Showcase | White bg. H2: 'Tous les services dont vous avez besoin'. Grid of 6 category cards with icon 24px teal + name + 'X freelancers' count. |
| Featured Freelancers | White bg. H2 + 'Voir tous →'. Grid of 4 freelancer cards. CTA below: 'Voir tous les freelancers'. |
| Trust Section | Three-column: Escrow sécurisé (shield), Freelancers vérifiés (check), Paiement 100% DZD (Algerian flag + BaridiMob). |
| Testimonials | Three quote cards. Avatar + name + city + quote + star rating. Alternating teal/white. |
| CTA Banner | Full-width teal. 'Rejoignez 500+ freelancers algériens'. Amber CTA + white outline CTA. |
| Footer | Four-column. Logo + tagline + social icons + links + contact: tasko.dza@gmail.com + copyright + language toggle. |

---

### 7.2 Freelancer Dashboard Web (`/freelancer/dashboard`)

Persistent left sidebar. Main content responsive (collapses to icon-only < 1200px, hamburger on mobile).

| Component | Specification |
|-----------|---------------|
| Sidebar | Fixed left, 220px. Tasko logo. Nav: Tableau de bord, Mes services, Commandes, Messages (+badge), Portefeuille, Analytiques, Mon profil. Bottom: avatar + name + plan badge + logout. Active item = teal wash bg + teal text. |
| Dashboard Header | 'Bonjour, [Name]' + date. Right: 'Nouveau service +' teal button. |
| KPI Cards Row | Solde disponible (teal hero card, large DZD, withdraw button inside) · Commandes actives (count + 'X en attente de livraison') · Note globale (star rating + count) · Taux de complétion (percentage + indicator). |
| Revenue Chart | Line chart: earnings over last 30/90/180 days. Toggle: Par commande / Par semaine / Par mois. Recharts library. Teal line, light fill. |
| Recent Orders Table | Columns: Client, Service, Montant, Statut (badge), Date, Actions. Paginated 10/page. Status badges: En cours (amber), Livré (teal), Complété (green), Litige (red). |
| Recent Reviews | Two most recent. Star rating + client name + date + text. 'Voir tous les avis' link. |

---

### 7.3 Public Freelancer Profile Web (`/freelancer/:username`)

SSR. Open Graph meta tags generated server-side. URL: `tasko.dz/freelancer/yacine-bensalem`.

| Element | Specification |
|---------|---------------|
| URL & SEO | Title: '[Name] [Specialty] sur Tasko'. Meta: '[Name], freelancer [specialty] à [City] noté [rating]/5 sur Tasko.' OG image: profile photo or generated card. |
| Profile Hero | 200px cover teal wash gradient. Avatar 80×80 overlapping (bordered white). Name H1 + specialty + city. Stats row. Verified badge. 'Commander' sticky CTA fixed to viewport right on desktop. |
| Tab Navigation | Services (default), Portfolio, Avis. |
| Services Tab | Grid 2 cols desktop / 1 col mobile. Card: name bold, description 2 lines clipped, delivery time, revision count, price, 'Commander' button. Hover: card lifts (box-shadow: 0 4px 16px rgba(0,0,0,0.08)). |
| Portfolio Tab | Masonry grid 3 cols desktop. Lightbox on click with arrow navigation, zoom, download. |
| Reviews Tab | Review list. Filter: Tous / 5★ / 4★ / 3★ and below. Average rating breakdown chart. 'Charger plus' pagination. |
| Sticky Order Panel | Right sidebar desktop only, 320px. Service selector dropdown + 'Commander' amber button. Escrow trust badge. 'Contacter ce freelancer' secondary link. |

---

## 8. CORE FEATURE SPECIFICATIONS

### 8.1 Verification System

| Tier | Requirements | Badge |
|------|-------------|-------|
| Identité vérifiée | Phone OTP confirmed · Real name provided · Profile photo uploaded (face visible) | Blue shield outline + 'Profil vérifié' tooltip |
| Freelancer vérifié ✓ | All tier 1 + minimum 3 completed orders + average rating ≥ 4.0 on first 3 orders + zero open disputes + minimum 3 portfolio work samples | Teal shield-check + 'Freelancer vérifié' badge on search results, profile hero, service cards |

### 8.2 Review System

- **Eligibility:** Transaction-backed only. Client who completed a paid order can leave a review.
- **Rating:** 1–5 stars, required. Text: optional, min 10 chars, max 500 chars.
- **Freelancer response:** One public response per review.
- **Moderation:** Admin can hide. Freelancer can report as fake or abusive.
- **Timing:** Within 14 days of order completion. Prompt disappears after 14 days.
- **Rating calculation:** Arithmetic mean, rounded to 1 decimal. Min 1 review before average is shown. Rating below 3.5 after 10+ reviews → flagged for admin.
- **Bidirectional:** Freelancers also review clients (visible on client profiles).

### 8.3 Dispute Resolution System

**Dispute Lifecycle:**
```
Client requests revision
  → Freelancer delivers revision
    → If unresolved: Client opens dispute
      → Admin reviews evidence (brief, all messages, delivered files)
        → Admin decision: Release to freelancer / Partial refund / Full refund
          → Order marked DISPUTE_RESOLVED (decision is final)
```

- **Dispute window:** Within 72 hours of freelancer marking delivery.
- **Dispute form:** Reason selection + required text description (min 50 chars) + optional evidence upload.
- **Evidence package for admin:** original brief, all chat messages, all delivered files, revision requests, both party responses.
- **Admin SLA:** Must review within 48 business hours.
- **Refund mechanism:** Refund goes back to client's BaridiMob. Not platform credit.

### 8.4 Service Listing System

| Field | Type / Constraint | Status | Example |
|-------|-------------------|--------|---------|
| service_title | String, max 80 chars | Mandatory | Logo professionnel, 3 propositions + fichiers sources |
| category | Enum from predefined list | Mandatory | design_graphique |
| subcategory | Enum nested in category | Mandatory | logo_identite |
| description | Rich text, max 1500 chars | Mandatory | Full service description |
| delivery_days | Integer 1–30 | Mandatory | 3 |
| revision_count | Integer 0–unlimited | Mandatory | 3 (or 'unlimited') |
| price_dzd | Integer, min 500 DZD, max 200,000 DZD | Mandatory | 3500 |
| faq | Array of Q&A pairs, max 5 | Optional | Q: Livrez-vous les fichiers sources? A: Oui |
| requirements | Text | Optional | Vos couleurs préférées |
| tags | Array of strings, max 5 | Optional | logo, branding, identite visuelle |
| portfolio_images | S3 URLs, max 8 images per service | Strongly recommended | Work samples specific to this service |
| is_active | Boolean | Auto | true (default on creation) |

---

## 9. PAYMENT & ESCROW ENGINE

> **CRITICAL:** Build with atomic PostgreSQL transactions. Any failure must leave zero inconsistency — full transaction completes or it rolls back entirely. No partial states.

### 9.1 BaridiMob Payment Flow

```
1. Client submits order form → POST /api/v1/orders/create
   └── Server creates order record with status: PENDING_PAYMENT
   └── Server creates escrow_lock record with amount = service_price_dzd
   └── Server calls BaridiMob API: POST /baridinpay/initiate
       Body: { amount: 3500, currency: 'DZD', order_ref: uuid, redirect_url, webhook_url }
   └── BaridiMob returns: { payment_url: 'https://baridinpay.dz/pay/...' }
   └── Server returns payment_url to client app

2. Client app opens payment_url (Expo WebBrowser.openBrowserAsync)
   └── User authenticates with BaridiMob and confirms payment
   └── BaridiMob redirects to: tasko.dz/payment/callback?status=success&ref=:uuid

3. BaridiMob sends webhook: POST /api/v1/webhooks/baridimob
   └── Server verifies webhook signature (HMAC-SHA256 with secret)
   └── On success: UPDATE orders SET status='ACTIVE', escrow_status='LOCKED'
   └── Send push notification to freelancer: 'Nouvelle commande de [client]'
   └── Send email receipt to client

4. Client app polls GET /api/v1/orders/:id until status != PENDING_PAYMENT
   └── Polling interval: 2s for first 30s, then 5s for 5 minutes, then stop

CRITICAL: Webhook is the source of truth. Client redirect is UX only.
```

### 9.2 Escrow Release Flow

```sql
-- TRIGGERED BY: Client confirms delivery OR 72-hour auto-confirm timer

BEGIN TRANSACTION;
  -- 1. Lock the order row
  SELECT * FROM orders WHERE id = :id FOR UPDATE;

  -- 2. Validate state
  -- status must be 'DELIVERED', escrow_status must be 'LOCKED'

  -- 3. Calculate commission
  commission_amount := FLOOR(escrow_amount * 0.10);  -- 10%, round down
  freelancer_net := escrow_amount - commission_amount;

  -- 4. Record commission
  INSERT INTO transactions (type='COMMISSION', amount=commission_amount, ...);

  -- 5. Record freelancer credit
  INSERT INTO transactions (type='FREELANCER_CREDIT', amount=freelancer_net, ...);

  -- 6. Credit wallet
  UPDATE freelancer_wallets SET available_balance += freelancer_net;

  -- 7. Complete the order
  UPDATE orders SET status='COMPLETED', escrow_status='RELEASED';

  -- 8. Record escrow release
  INSERT INTO transactions (type='ESCROW_RELEASE', ...);
COMMIT;

-- After commit:
-- Push to freelancer: '[client] a confirmé. X DZD disponibles.'
-- Push to client: 'Merci! Laissez un avis à [freelancer].'
-- Trigger review prompt for both parties
```

### 9.3 Withdrawal Flow

```
1. Freelancer requests: POST /api/v1/wallet/withdraw
   Body: { amount: 10000, baridimob_number: '0555123456' }
   Validation: amount >= 1000, amount <= available_balance, valid format

2. Server:
   BEGIN TRANSACTION;
     UPDATE freelancer_wallets SET available_balance -= amount;
     INSERT INTO withdrawals (status='PENDING', amount, baridimob_number, requested_at);
   COMMIT;

3. Admin dashboard shows pending withdrawals.
   Admin processes via BaridiMob merchant payout API or manually.
   Admin marks PROCESSED → UPDATE withdrawals SET status='PROCESSED'
   Push + SMS to freelancer: 'Virement de X DZD envoyé vers BaridiMob.'

NOTE: MVP = semi-manual withdrawal. Phase 2 = Automate via BaridiMob merchant payout API.
```

---

## 10. API ENDPOINTS REFERENCE

**Base URL:** `https://api.tasko.dz/api/v1`
All endpoints require `Authorization: Bearer <JWT>` unless marked `[PUBLIC]`.
Rate limiting: 100 req/min per IP (public) · 300 req/min per JWT (authenticated).

### AUTH

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/register | PUBLIC | Body: `{phone, name, role, password, specialty?}` Returns: `{message, userId}` |
| POST | /auth/send-otp | PUBLIC | Body: `{phone}` |
| POST | /auth/verify-otp | PUBLIC | Body: `{phone, otp}` Returns: `{accessToken, refreshToken, user}` |
| POST | /auth/refresh | PUBLIC | Body: `{refreshToken}` Returns: `{accessToken}` |
| POST | /auth/logout | AUTH | Invalidate refresh token |
| POST | /auth/login | PUBLIC | Login with phone + OTP flow initiation |

### USERS / PROFILES

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /users/me | AUTH | Get current authenticated user profile |
| PATCH | /users/me | AUTH | Update profile fields |
| GET | /freelancers/:id/public | PUBLIC | Public profile + services + portfolio thumbnails |
| GET | /freelancers/search | PUBLIC | Params: q, category, minPrice, maxPrice, minRating, verified, page, limit |
| GET | /freelancers/:id/reviews | PUBLIC | Params: page, limit, rating_filter |
| POST | /users/me/portfolio | AUTH | Upload portfolio image. Multipart. Returns: `{url}` |
| DELETE | /users/me/portfolio/:imageId | AUTH | Delete portfolio image |

### SERVICES

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /services | FREELANCER | Create new service listing |
| GET | /services/:id | PUBLIC | Get single service detail |
| PATCH | /services/:id | FREELANCER | Update service (own only) |
| DELETE | /services/:id | FREELANCER | Deactivate service (soft delete) |
| GET | /services | PUBLIC | List services. Params: category, freelancerId, page, limit |

### ORDERS

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /orders/create | CLIENT | Body: `{serviceId, brief, deliveryDeadline, attachmentUrls[]}` Returns: `{orderId, paymentUrl}` |
| GET | /orders/:id | AUTH | Get order detail (own orders only) |
| GET | /orders | AUTH | List. Params: role (client/freelancer), status, page, limit |
| POST | /orders/:id/deliver | FREELANCER | Body: `{fileUrls[], message}` |
| POST | /orders/:id/confirm | CLIENT | Confirm delivery + trigger escrow release |
| POST | /orders/:id/request-revision | CLIENT | Body: `{revisionNotes}` |
| POST | /orders/:id/cancel | AUTH | Cancel order (rules apply based on status + role) |
| POST | /orders/:id/dispute | CLIENT | Body: `{reason, description, evidenceUrls[]}` |
| GET | /orders/:id/upload-url | FREELANCER | Params: filename, fileType. Returns presigned S3 URL. |

### MESSAGES

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /messages/:orderId | AUTH | Params: cursor, limit=50 |
| POST | /messages/:orderId | AUTH | Send message (HTTP fallback, prefer WebSocket) |
| GET | /messages/:orderId/upload-url | AUTH | Presigned S3 URL for file attachment in chat |

### WALLET & PAYMENTS

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /wallet | FREELANCER | Returns: `{available, in_escrow, this_month}` |
| GET | /wallet/transactions | FREELANCER | Params: cursor, limit, dateFrom, dateTo |
| POST | /wallet/withdraw | FREELANCER | Body: `{amount, baridimob_number}` |
| GET | /wallet/withdrawals | FREELANCER | List own withdrawal requests and statuses |

### WEBHOOKS

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /webhooks/baridimob | INTERNAL | Verified by HMAC-SHA256 signature |
| POST | /webhooks/cib | INTERNAL | CIB card payment webhook |

### REVIEWS

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /reviews | AUTH | Body: `{orderId, rating, text}`. One per order per direction. |
| POST | /reviews/:id/respond | FREELANCER | Freelancer responds to a received review |
| POST | /reviews/:id/report | AUTH | Report a review as abusive |

### NOTIFICATIONS

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /notifications | AUTH | Params: unread_only, page, limit |
| POST | /notifications/read-all | AUTH | Mark all as read |
| POST | /notifications/:id/read | AUTH | Mark single as read |
| POST | /devices/register | AUTH | Body: `{token, platform}` — register FCM device token |

---

## 11. DATABASE SCHEMA

PostgreSQL 15+. UUID primary keys via `gen_random_uuid()`. All timestamps `timestamptz` UTC. Soft deletes via nullable `deleted_at`.

### Table: `users`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| phone | VARCHAR(20) UNIQUE NOT NULL | +213655123456 |
| email | VARCHAR(255) UNIQUE | Optional |
| password_hash | VARCHAR(255) NOT NULL | bcrypt cost 12 |
| name | VARCHAR(100) NOT NULL | |
| username | VARCHAR(50) UNIQUE NOT NULL | auto-generated slug |
| role | ENUM('CLIENT','FREELANCER','DUAL','ADMIN') NOT NULL | |
| bio | TEXT | |
| specialty | VARCHAR(100) | |
| category | VARCHAR(50) | |
| city | VARCHAR(100) | |
| languages | TEXT[] | {ar,fr,en} |
| profile_photo_url | TEXT | S3 URL |
| is_verified_identity | BOOLEAN DEFAULT false | |
| is_verified_freelancer | BOOLEAN DEFAULT false | Auto-computed |
| average_rating | DECIMAL(3,2) | Auto-updated on review create |
| total_reviews | INTEGER DEFAULT 0 | |
| completed_orders_count | INTEGER DEFAULT 0 | |
| response_rate | DECIMAL(5,2) | |
| baridimob_number | VARCHAR(20) | For withdrawals |
| fcm_token | TEXT | Firebase push token |
| last_active_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |
| deleted_at | TIMESTAMPTZ | Soft delete |

### Table: `services`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| freelancer_id | UUID FK → users.id NOT NULL | |
| title | VARCHAR(80) NOT NULL | |
| description | TEXT NOT NULL | |
| category | VARCHAR(50) NOT NULL | |
| subcategory | VARCHAR(50) | |
| price_dzd | INTEGER NOT NULL CHECK (price_dzd >= 500) | |
| delivery_days | INTEGER NOT NULL CHECK (BETWEEN 1 AND 30) | |
| revision_count | INTEGER DEFAULT 3 | -1 = unlimited |
| requirements | TEXT | |
| faq | JSONB | [{q: '...', a: '...'}] |
| tags | TEXT[] | |
| portfolio_image_urls | TEXT[] | Up to 8 S3 URLs |
| is_active | BOOLEAN DEFAULT true | |
| total_orders | INTEGER DEFAULT 0 | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ | |

### Table: `orders`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| client_id | UUID FK → users.id NOT NULL | |
| freelancer_id | UUID FK → users.id NOT NULL | |
| service_id | UUID FK → services.id NOT NULL | |
| status | ENUM('PENDING_PAYMENT','ACTIVE','DELIVERED','REVISION','COMPLETED','CANCELLED','DISPUTE','DISPUTE_RESOLVED') | |
| escrow_status | ENUM('NONE','LOCKED','RELEASED','REFUNDED') DEFAULT 'NONE' | |
| brief_json | JSONB NOT NULL | {text, deadline, attachments[]} |
| price_dzd | INTEGER NOT NULL | Snapshot at order time |
| commission_dzd | INTEGER | Calculated on release |
| freelancer_net_dzd | INTEGER | price - commission |
| delivery_deadline | TIMESTAMPTZ NOT NULL | |
| delivered_at | TIMESTAMPTZ | |
| completed_at | TIMESTAMPTZ | |
| auto_confirm_at | TIMESTAMPTZ | delivered_at + 72 hours |
| delivery_files | TEXT[] | S3 URLs of delivered files |
| delivery_message | TEXT | |
| revision_notes | TEXT | Latest revision request |
| revision_count_used | INTEGER DEFAULT 0 | |
| payment_ref | VARCHAR(100) | BaridiMob payment reference |
| payment_method | ENUM('BARIDIMOB','CIB') | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ | |

### Table: `messages`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| order_id | UUID FK → orders.id NOT NULL | |
| sender_id | UUID FK → users.id NOT NULL | |
| message_type | ENUM('TEXT','FILE','SYSTEM') NOT NULL | |
| content | TEXT | |
| file_url | TEXT | S3 URL for file messages |
| file_name | VARCHAR(255) | |
| file_size_bytes | INTEGER | |
| is_read | BOOLEAN DEFAULT false | |
| read_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |

### Table: `reviews`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| order_id | UUID FK → orders.id NOT NULL | |
| reviewer_id | UUID FK → users.id NOT NULL | Client |
| reviewee_id | UUID FK → users.id NOT NULL | Freelancer |
| rating | SMALLINT NOT NULL CHECK (BETWEEN 1 AND 5) | |
| text | TEXT | |
| freelancer_response | TEXT | |
| freelancer_responded_at | TIMESTAMPTZ | |
| is_hidden | BOOLEAN DEFAULT false | Admin moderation |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |

### Table: `transactions`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| order_id | UUID FK → orders.id | |
| user_id | UUID FK → users.id | |
| type | ENUM('ESCROW_LOCK','ESCROW_RELEASE','COMMISSION','FREELANCER_CREDIT','WITHDRAWAL','REFUND') | |
| amount_dzd | INTEGER NOT NULL | |
| direction | ENUM('CREDIT','DEBIT') | |
| description | TEXT | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |

### Table: `freelancer_wallets`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| freelancer_id | UUID FK → users.id UNIQUE NOT NULL | |
| available_balance | INTEGER DEFAULT 0 CHECK (>= 0) | DZD |
| in_escrow_balance | INTEGER DEFAULT 0 | Sum of all locked orders |
| total_earned_lifetime | INTEGER DEFAULT 0 | |
| updated_at | TIMESTAMPTZ | |

### Table: `withdrawals`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| freelancer_id | UUID FK → users.id NOT NULL | |
| amount_dzd | INTEGER NOT NULL | |
| baridimob_number | VARCHAR(20) NOT NULL | |
| status | ENUM('PENDING','PROCESSING','PROCESSED','FAILED') DEFAULT 'PENDING' | |
| processed_at | TIMESTAMPTZ | |
| admin_note | TEXT | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |

### Table: `notifications`

| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| user_id | UUID FK → users.id NOT NULL | |
| type | VARCHAR(50) NOT NULL | ORDER_NEW, DELIVERY_RECEIVED, etc. |
| title | VARCHAR(200) NOT NULL | Bilingual: stored in user's preferred language |
| body | TEXT NOT NULL | |
| data_json | JSONB | {orderId, action, deeplink} |
| is_read | BOOLEAN DEFAULT false | |
| created_at | TIMESTAMPTZ DEFAULT NOW() | |

### Required Database Indexes

```sql
CREATE INDEX idx_orders_client_id ON orders(client_id);
CREATE INDEX idx_orders_freelancer_id ON orders(freelancer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_freelancer_id ON services(freelancer_id);
CREATE INDEX idx_messages_order_id ON messages(order_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX idx_transactions_order_id ON transactions(order_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

---

## 12. NOTIFICATIONS SYSTEM

All notifications delivered via three channels: Firebase FCM push · in-app notification center · email (critical financial events only). All text must be bilingual, stored in the user's preferred language (AR or FR).

| Event Type | Recipient | Push Title | Push Body |
|-----------|-----------|-----------|-----------|
| ORDER_NEW | Freelancer | Nouvelle commande de [Client]! | [Client] a commandé '[Service]' pour [Amount] DZD. Voir le brief. |
| PAYMENT_CONFIRMED | Both | Paiement confirmé | [Amount] DZD sécurisés en escrow pour la commande #[ID]. |
| MESSAGE_RECEIVED | Both | [Sender]: [Message preview] | New message in order #[ID] |
| DELIVERY_RECEIVED | Client | Livraison reçue de [Freelancer]! | [Freelancer] a livré votre commande. Confirmez pour libérer le paiement. |
| REVISION_REQUESTED | Freelancer | [Client] demande une révision | Révision demandée: [Revision notes preview] |
| ESCROW_RELEASED | Freelancer | Paiement libéré! [Amount] DZD | [Client] a confirmé la livraison. [Amount] DZD disponibles dans votre portefeuille. |
| AUTO_CONFIRM_WARNING | Client | Confirmation automatique dans 24h | Votre commande sera automatiquement confirmée dans 24h si vous ne répondez pas. |
| AUTO_CONFIRM_FIRED | Both | Commande complétée automatiquement | La commande a été confirmée automatiquement. Paiement libéré. |
| DISPUTE_OPENED | Freelancer | Litige ouvert sur la commande #[ID] | [Client] a ouvert un litige. Notre équipe va examiner. |
| DISPUTE_RESOLVED | Both | Décision du litige #[ID] | Le litige a été résolu. [Decision summary] |
| REVIEW_RECEIVED | Freelancer | Nouvel avis de [Client] | [Client] vous a laissé un avis [Rating]★. |
| WITHDRAWAL_PROCESSED | Freelancer | Virement envoyé! | [Amount] DZD envoyés vers votre BaridiMob. |
| ACCOUNT_VERIFIED | Freelancer | Félicitations! Compte vérifié ✓ | Vous êtes maintenant un freelancer vérifié sur Tasko. |

---

## 13. ADMIN PANEL

Separate web app at `admin.tasko.dz`. Role `ADMIN` only. React + same design system. Web only.

| Page | Content & Functions |
|------|---------------------|
| Dashboard | Total GMV (DZD), total commission, active users (30d), active orders, dispute rate, average order value. Revenue chart. Alert cards for pending disputes, pending withdrawals. |
| Users | Searchable/filterable table: name, phone, role, joined date, verified status, orders count, rating, status. Actions: View profile, Suspend, Delete, Grant admin, View wallet. |
| Freelancer Verification Queue | Freelancers who completed 3-order threshold. Manual review option. Verify or flag. |
| Orders | All orders with full filters. Click to open full order detail panel with brief, messages, files, and timeline. |
| Disputes | Priority queue sorted by opening date. Each: order details, client claim, freelancer response, evidence files. Actions: Release to freelancer / Partial refund (with %) / Full refund. Required: admin decision note. |
| Transactions | Full transaction ledger. Filterable by date, type, user. Export to CSV. |
| Withdrawals | Pending withdrawals queue. Actions: Mark as Processed / Mark as Failed. |
| Categories | CRUD for service categories and subcategories. Add/remove/rename/reorder/disable. |
| Reviews Moderation | Queue of reported reviews. Actions: Keep, Hide, Warn reviewer. |
| Announcements | Send platform-wide push to all / all freelancers / all clients. Draft, preview, and schedule. |
| Settings | Commission rate (read-only), minimum withdrawal amount, auto-confirm hours (default 72), maintenance mode toggle. |

---

## 14. LOCALIZATION & BILINGUAL RULES

- **Default language:** French (`fr-DZ`). User can change to Arabic (`ar-DZ`) in settings.
- **Language detection:** On first install, detect device locale. If `ar-*` → Arabic. All others → French.
- **RTL support:** Use `I18nManager.forceRTL(true)` in React Native on language switch. On web, use `dir='rtl'` on `<html>`. Test all layouts in both directions.
- **Translation library:** i18next + react-i18next. Files: `/locales/fr.json` and `/locales/ar.json`.
- **Arabic font:** Noto Sans Arabic, via `expo-font` (mobile) and `@next/font` (web). Applied automatically when locale is `ar-DZ`.
- **Number formatting:** `Intl.NumberFormat('fr-DZ', { style: 'currency', currency: 'DZD' })`. Do not hardcode 'DZD' in strings.
- **Date formatting:** `Intl.DateTimeFormat('fr-DZ')` and `('ar-DZ')`.
- **User-generated content** stored as-is — not translated.
- **Error messages** must exist in both languages. No English error messages in production.
- **BaridiMob payment URL:** May be French-only (external service) — note this in UX.

---

## 15. PERFORMANCE & ACCESSIBILITY

### Performance Targets

| Metric | 3G Mobile | WiFi / Desktop |
|--------|-----------|----------------|
| App launch to interactive (cold start) | < 5 seconds | < 2 seconds |
| Screen transition time | < 300ms | < 150ms |
| Home feed load time | < 3 seconds | < 1 second |
| Search results (first 10) | < 2 seconds | < 500ms |
| Image load (profile photo 100×100) | < 1 second (progressive) | < 300ms |
| Portfolio image load (thumbnail) | < 2 seconds (lazy) | < 500ms |
| Chat message delivery (WebSocket) | < 200ms | < 100ms |
| API 95th percentile response time | < 800ms | < 200ms |
| Web Core Web Vitals LCP | N/A | < 2.5s |

### Performance Implementation Rules

- **Images:** Server-side generate WebP thumbnails (100×100, 300×300, 800×800). Mobile: `Expo Image` with blurhash placeholder. Web: `Next.js Image` component.
- **Portfolio thumbnails:** Lazy loaded. IntersectionObserver on web, FlashList viewability on mobile.
- **API caching:** `/freelancers/search` cached in Redis 60 seconds. Freelancer profiles cached 5 minutes. Invalidate on profile/service update.
- **React Query:** All API calls wrapped in TanStack Query with appropriate `staleTime`.
- **Bundle splitting:** Next.js route-based code splitting. Dynamic imports for charts, lightbox, rich text editor.
- **Chat:** WebSocket only — no REST polling. Cursor pagination for message history.

### Accessibility

- Minimum 44×44px touch target on mobile for all interactive elements.
- WCAG AA contrast: 4.5:1 for normal text, 3:1 for large text.
- All images have `alt` text. All icon buttons have `aria-label`.
- Keyboard navigation: All web flows completable via keyboard.
- Visible focus ring on all interactive elements. Do not remove `outline` CSS.
- Error states: icon + text, never color alone.

---

## 16. SECURITY REQUIREMENTS

| Area | Requirement |
|------|-------------|
| Authentication | JWT access tokens: 15-min expiry. Refresh tokens: 30-day expiry, HTTP-only cookie (web) or SecureStore (mobile). Rotate refresh token on each use. |
| OTP Security | 6-digit numeric, valid 5 minutes, single-use. Lock account 5 minutes after 3 failed attempts. Rate limit: 3 OTP sends per phone per hour. |
| Password | bcrypt cost factor 12. Min 8 characters. Check against haveibeenpwned API on registration. |
| API Rate Limiting | 100 req/min per IP (public). 300 req/min per JWT (authenticated). 10 req/min per IP on auth/OTP endpoints. |
| Input Validation | Zod schemas on backend. Never trust client-side validation. Sanitize all text inputs. |
| File Upload | Validate MIME type AND magic bytes server-side. Scan with ClamAV before making accessible. Enforce max file size server-side. |
| SQL Injection | Parameterized queries only. Never string-concatenate SQL. Use Knex.js or Drizzle ORM. |
| XSS | Content Security Policy headers. Escape all user-generated content before rendering. |
| Webhook Verification | Verify HMAC-SHA256 signature using shared secret. Reject requests with invalid signatures. Log all webhook events. |
| Financial Integrity | All wallet operations in PostgreSQL transactions with row-level locks. Double-entry bookkeeping: every DZD movement creates paired transaction records. |
| HTTPS | TLS 1.2 minimum, TLS 1.3 preferred. HSTS header. Certificate auto-renewal via Let's Encrypt or Cloudflare. |
| Data Privacy | Comply with Algerian Law 18-07. Minimal data collection. Phone number is primary identity. |
| Admin Access | Separate subdomain + IP allowlist. MFA required for admin accounts. All admin actions logged with admin user ID + timestamp. |

---

## 17. DEPLOYMENT & INFRASTRUCTURE

| Component | Service | Configuration |
|-----------|---------|---------------|
| API Server | Railway or Render (MVP) → AWS ECS (scale) | 2 CPU, 512MB RAM min. Auto-scale on CPU > 70%. Health check: `GET /api/v1/health` |
| Web App (Next.js) | Vercel | Serverless deployments. Edge runtime for SSR pages. |
| PostgreSQL | Railway PostgreSQL or Supabase (MVP) → AWS RDS 15 | Daily backups retained 30 days. PITR enabled. Read replica for analytics. |
| Redis | Upstash Redis (MVP) → AWS ElastiCache | Sessions, rate limiting, pub/sub for WebSocket, cache. |
| File Storage | Cloudflare R2 | Buckets: `tasko-profiles` (public) · `tasko-portfolios` (public) · `tasko-deliveries` (private, signed URLs only) |
| CDN | Cloudflare | Public images via Cloudflare CDN. Cache-Control: `max-age=31536000` on static assets. |
| Mobile App | Expo EAS Build + EAS Submit | OTA updates via Expo Updates for JS-only changes. |
| CI/CD | GitHub Actions | PR: lint + type-check + tests. Merge to main: deploy staging. Git tag vX.Y.Z: deploy production. |
| Monitoring | Sentry + Datadog or Grafana Cloud | Alert on: error rate > 1%, P95 latency > 2s, payment webhook failures. |
| DNS | Cloudflare | `tasko.dz` → Vercel · `api.tasko.dz` → Railway · `admin.tasko.dz` → Vercel |
| Secrets | Doppler + Vercel + Railway dashboard | Never commit secrets. |

---

## 18. MVP VS PHASE 2 FEATURE FLAGS

| Feature | MVP | Phase 2 |
|---------|-----|---------|
| Freelancer profile creation + verification | YES | — |
| Service listing CRUD | YES | — |
| Portfolio upload (up to 8 images) | YES | — |
| Client browse/search (text + category) | YES (PostgreSQL FTS) | Elasticsearch with NLP |
| Order creation with mandatory brief | YES | — |
| BaridiMob payment integration | YES | — |
| CIB card payment integration | YES (if API available) | — |
| Escrow lock and release engine (atomic) | YES | — |
| In-order real-time chat (WebSocket) | YES | — |
| File upload for delivery (S3) | YES | — |
| Delivery confirmation + auto-confirm 72h | YES | — |
| Review and rating system | YES | — |
| Revision request flow | YES | — |
| Dispute system | YES (basic) | AI-assisted evidence analysis |
| BaridiMob withdrawal (semi-manual) | YES | Automated API payout |
| Push notifications (Firebase FCM) | YES | — |
| Email notifications (critical events) | YES | — |
| Bilingual FR/AR | YES | — |
| RTL Arabic layout | YES | — |
| Admin panel (web) | YES (basic) | Full analytics |
| Freelancer analytics dashboard | Basic KPIs only | Full revenue charts, cohort analysis |
| Tasko Pro subscription tier | NO | Phase 2 Month 3+ |
| Referral bonus system | NO | Phase 2 |
| In-app video calls | NO | Phase 2+ |
| AI-powered service matching | NO | Phase 2+ |
| Sub-account / Agency features | NO | Phase 3 |
| MENA expansion (Morocco, Tunisia) | NO | Phase 2+ |
| Escrow milestones (50/50 split) | NO | Phase 2 |
| Service package tiers (Basic/Standard/Premium) | NO | Phase 2 |
| International payment support (PayPal, Stripe) | NO | Phase 3 only |

---

## 19. BACKEND ARCHITECTURE NOTES

### Order Status State Machine

Implement a strict state machine. Only these transitions are valid:

```
PENDING_PAYMENT  → ACTIVE           (on BaridiMob/CIB webhook success)
ACTIVE           → DELIVERED        (freelancer delivers)
ACTIVE           → CANCELLED        (by either party, before delivery)
DELIVERED        → COMPLETED        (client confirms OR auto-confirm after 72h)
DELIVERED        → REVISION         (client requests revision)
DELIVERED        → DISPUTE          (client opens dispute within 72h)
REVISION         → DELIVERED        (freelancer delivers revision)
REVISION         → DISPUTE          (client opens dispute after revision)
DISPUTE          → DISPUTE_RESOLVED (admin resolves)
DISPUTE_RESOLVED → COMPLETED        (if resolved in freelancer's favor)
```

Any attempt to transition to an invalid state must throw an error and roll back.

### WebSocket Architecture

```
Socket.io namespace: /chat
Room naming: order:{orderId}

Events emitted by client:
  message:send       { orderId, content, type }
  message:read       { messageId }
  typing:start       { orderId }
  typing:stop        { orderId }

Events emitted by server:
  message:new        { message object }
  message:status     { messageId, status: 'delivered'|'read' }
  typing:indicator   { userId, isTyping }
  order:status       { orderId, newStatus }  -- real-time order status updates
```

### Auto-Confirm Cron Job

Run every 15 minutes. Query:

```sql
SELECT id FROM orders
WHERE status = 'DELIVERED'
  AND escrow_status = 'LOCKED'
  AND auto_confirm_at <= NOW();
```

For each result, trigger the escrow release flow (Section 9.2).

---

## 20. UI COMPONENT STATES

Every component must implement all applicable states before screen work begins.

### Button Component States

```
Primary Button (teal):
  default:   #1D9E75 fill, white text, 10px radius, 52px height
  hover:     #0F6E56 fill
  pressed:   scale 0.97, #0F6E56 fill
  disabled:  #D3D1C7 fill, #888780 text, cursor not-allowed
  loading:   #1D9E75 fill + white spinner 18px centered, text hidden

CTA Amber Button (Payer via BaridiMob):
  default:   #EF9F27 fill, white text
  hover:     #BA7517 fill
  disabled:  gray fill, gray text (before form validation)
  loading:   #EF9F27 fill + white spinner (during payment processing)
  error:     #E24B4A fill + 'Paiement échoué. Réessayer.' + retry option
  confirmed: #EAF3DE fill, #3B6D11 text + checkmark icon
```

### Input Component States

```
  default:   #F1EFE8 bg, 0.5px #D3D1C7 border, 8px radius
  focused:   1.5px #1D9E75 border
  valid:     green checkmark icon right side
  error:     1.5px #E24B4A border + inline error message below
  disabled:  gray bg, cursor not-allowed
```

### Order Status Badge Colors

| Status | Background | Text |
|--------|-----------|------|
| PENDING_PAYMENT | `#D3D1C7` | `#444441` |
| ACTIVE / En cours | `#FAC775` | `#BA7517` |
| DELIVERED / Livré | `#E1F5EE` | `#0F6E56` |
| REVISION | `#FEF3C7` | `#92400E` |
| COMPLETED / Complété | `#EAF3DE` | `#3B6D11` |
| DISPUTE / Litige | `#FEE2E2` | `#991B1B` |
| DISPUTE_RESOLVED | `#EDE9FE` | `#5B21B6` |
| CANCELLED | `#F3F4F6` | `#6B7280` |

---

## 21. API CONTRACT EXAMPLES

### Registration + OTP Flow

**POST /api/v1/auth/register**
```json
// Request
{
  "phone": "+213655123456",
  "name": "Yacine Bensalem",
  "role": "FREELANCER",
  "password": "SecurePass123",
  "email": "yacine@email.com",
  "specialty": "design_graphique"
}

// Response 200 OK
{
  "message": "OTP envoyé au +213655123456",
  "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

**POST /api/v1/auth/verify-otp**
```json
// Request
{
  "phone": "+213655123456",
  "otp": "5274"
}

// Response 200 OK
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Yacine Bensalem",
    "role": "FREELANCER",
    "is_verified_identity": false
  }
}

// Error 400 — Invalid OTP
{
  "error": "OTP_INVALID",
  "message": "Code incorrect, réessayez.",
  "attemptsRemaining": 2
}

// Error 429 — Too many attempts
{
  "error": "OTP_LOCKED",
  "message": "Compte bloqué pour 5 minutes.",
  "lockedUntil": "2026-01-12T14:35:00Z"
}
```

---

### Order Creation + Payment

**POST /api/v1/orders/create**
```json
// Request (Authorization: Bearer <token>)
{
  "serviceId": "service-uuid-here",
  "brief": {
    "text": "Logo pour ma boutique de vêtements. Couleurs préférées: vert et blanc. Style moderne et minimaliste.",
    "deadline": "2026-01-15T00:00:00Z",
    "attachments": ["https://r2.tasko.dz/deliveries/ref-image-1.jpg"]
  },
  "deliveryDeadline": "2026-01-15T00:00:00Z"
}

// Response 201 Created
{
  "orderId": "order-uuid-here",
  "status": "PENDING_PAYMENT",
  "paymentUrl": "https://baridinpay.dz/pay/session-abc123",
  "expiresAt": "2026-01-12T14:30:00Z"
}

// Error 400 — Brief too short
{
  "error": "BRIEF_TOO_SHORT",
  "message": "Le brief doit contenir au moins 50 caractères.",
  "currentLength": 23
}

// Error 400 — Service inactive
{
  "error": "SERVICE_UNAVAILABLE",
  "message": "Ce service n'est plus disponible."
}
```

---

### Delivery File Upload

**GET /api/v1/orders/:orderId/upload-url?filename=logo_final_v2.ai&fileType=application/postscript**
```json
// Response 200 OK
{
  "uploadUrl": "https://r2.tasko.dz/deliveries/order-uuid/logo_final_v2.ai?X-Amz-Signature=...",
  "fileKey": "deliveries/order-uuid/logo_final_v2.ai",
  "expiresIn": 300
}
```

**POST /api/v1/orders/:orderId/deliver**
```json
// Request
{
  "fileUrls": [
    "https://r2.tasko.dz/deliveries/order-uuid/logo_final_v2.ai",
    "https://r2.tasko.dz/deliveries/order-uuid/logo_exports.zip"
  ],
  "message": "Bonjour! Voici le logo final avec tous les fichiers sources."
}

// Response 200 OK
{
  "orderId": "order-uuid",
  "status": "DELIVERED",
  "deliveredAt": "2026-01-13T10:45:00Z",
  "autoConfirmAt": "2026-01-16T10:45:00Z"
}

// Error 400 — No files
{
  "error": "NO_FILES",
  "message": "Vous devez joindre au moins un fichier à votre livraison."
}
```

---

### Dispute Opening

**POST /api/v1/orders/:orderId/dispute**
```json
// Request
{
  "reason": "DID_NOT_MATCH_BRIEF",
  "description": "Le logo livré ne correspond pas du tout au brief. J'avais demandé un style minimaliste et vert, mais le rendu est rouge et chargé. Les fichiers sources n'ont pas été fournis.",
  "evidenceUrls": [
    "https://r2.tasko.dz/disputes/order-uuid/screenshot-brief.png"
  ]
}

// Response 201 Created
{
  "disputeId": "dispute-uuid",
  "orderId": "order-uuid",
  "status": "OPEN",
  "escrowStatus": "FROZEN",
  "adminReviewBy": "2026-01-15T10:45:00Z",
  "message": "Votre litige a été ouvert. Notre équipe vous répondra dans les 48h."
}

// Error 400 — Dispute window expired
{
  "error": "DISPUTE_WINDOW_EXPIRED",
  "message": "Le délai de 72h pour ouvrir un litige est expiré.",
  "deliveredAt": "2026-01-09T10:45:00Z",
  "disputeDeadline": "2026-01-12T10:45:00Z"
}

// Error 409 — Dispute already opened
{
  "error": "DISPUTE_ALREADY_EXISTS",
  "message": "Un litige est déjà ouvert pour cette commande."
}
```

---

### Edge Cases Reference

| Scenario | Error Code | HTTP Status |
|----------|-----------|-------------|
| Payment session expired (15min timeout) | `PAYMENT_SESSION_EXPIRED` | 400 |
| Oversized file upload | `FILE_TOO_LARGE` | 413 |
| Invalid file type | `FILE_TYPE_NOT_ALLOWED` | 400 |
| OTP expired | `OTP_EXPIRED` | 400 |
| Deleted/deactivated freelancer | `FREELANCER_NOT_AVAILABLE` | 404 |
| Order already confirmed | `ORDER_ALREADY_CONFIRMED` | 409 |
| Dispute already opened | `DISPUTE_ALREADY_EXISTS` | 409 |
| Withdrawal below minimum (< 1000 DZD) | `WITHDRAWAL_BELOW_MINIMUM` | 400 |
| Insufficient wallet balance | `INSUFFICIENT_BALANCE` | 400 |
| Failed payout (BaridiMob error) | `WITHDRAWAL_FAILED` | 400 |
| Invalid webhook signature | `WEBHOOK_SIGNATURE_INVALID` | 401 |
| Invalid order status transition | `INVALID_STATUS_TRANSITION` | 422 |

---

## 22. DATABASE ERD & PRIVACY NOTES

### Entity Relationships Summary

```
users
  ├── (as freelancer) ──────────────── services (freelancer_id) [1:many]
  ├── (as client) ───────────────────── orders (client_id) [1:many]
  ├── (as freelancer) ───────────────── orders (freelancer_id) [1:many]
  ├── ──────────────────────────────── freelancer_wallets (freelancer_id) [1:1]
  └── ──────────────────────────────── notifications (user_id) [1:many]

services
  └── ─────────────────────────────── orders (service_id) [1:many]

orders
  ├── ─────────────────────────────── messages (order_id) [1:many]
  ├── ─────────────────────────────── reviews (order_id) [1:many, max 2: one per direction]
  └── ─────────────────────────────── transactions (order_id) [1:many]

transactions
  └── (indirect) ───────────────────── freelancer_wallets (via escrow release)

freelancer_wallets
  └── ─────────────────────────────── withdrawals (freelancer_id) [1:many]

reviews
  ├── reviewer_id ──────────────────── users [many:1]
  └── reviewee_id ──────────────────── users [many:1]
```

### Key Constraints

- One user can be both CLIENT and FREELANCER (dual-role)
- One freelancer has many services
- One service can have many orders
- Each order has exactly one chat room (messages scoped to order_id)
- Each order has at most one review per direction (client→freelancer, freelancer→client)
- Each order generates multiple transactions (ESCROW_LOCK, ESCROW_RELEASE, COMMISSION, FREELANCER_CREDIT)
- Each freelancer has exactly one wallet record

### Privacy & Data Protection (Algerian Law 18-07)

Apply these privacy-by-design principles from day one:

- **Data minimization:** Collect only phone, name, email (optional), specialty, portfolio. No unnecessary PII.
- **Row-level security:** PostgreSQL RLS policies. Users can only read/write their own orders, messages, and wallet records. Admin has full access but all actions are logged in an immutable audit log.
- **Secure file storage:** Delivery files in private R2 bucket. Accessible only via time-limited signed URLs (expiry: 1 hour). Portfolio images in public bucket.
- **Message privacy:** Chat messages strictly scoped to order participants. No cross-order access.
- **Data retention policy:**
  - Active user data: retained as long as account active
  - Completed orders: retained 3 years (financial record requirement)
  - Deleted account: anonymize PII after 30 days (replace name/phone/email with hashed values); retain transaction records for accounting
- **Admin audit log:** All admin actions logged with `admin_id + timestamp + action_type + target_user_id`. Immutable.
- **Sensitive data encryption at rest:** Encrypt phone numbers and BaridiMob account numbers at database level using pgcrypto extension.
- **HTTPS everywhere:** No plain HTTP in production.

---

## PROJECT INFO

- **Project:** TASKO — La marketplace des talents algériens
- **Domain:** tasko.dz
- **Contact:** tasko.dza@gmail.com
- **Version:** 1.0 (2026)

---

*End of TASKO Agent Build Instructions — v1.0*
