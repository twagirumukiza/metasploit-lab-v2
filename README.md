# Linux-Lab :: Metasploit — prototype

Site statique (HTML/CSS/JS pur, aucune dépendance à installer) qui simule
une console Kali/Metasploit pour apprendre commande par commande, avec
examen de validation à 100 % par chapitre.

## Lancer le site

Aucune compilation nécessaire.

- **Le plus simple** : double-cliquez sur `index.html` (ou ouvrez-le avec
  `Fichier > Ouvrir` dans votre navigateur).
- **Recommandé** (évite quelques restrictions de certains navigateurs sur
  les fichiers locaux) : lancez un petit serveur local depuis ce dossier :
  ```bash
  python3 -m http.server 8000
  ```
  puis ouvrez `http://localhost:8000`.

Rien à configurer : la progression, la langue, le thème et la taille de
police sont sauvegardés dans le navigateur (`localStorage`).

## Ce qui est déjà fonctionnel

- 5 modules / 17 chapitres (`data.js`) :
  - **Module 1 — Se repérer sous Kali Linux** : `cd`, `ls`.
  - **Module 2 — Premiers pas avec Metasploit** : `msfconsole` + `search`,
    `use`/`show options`/`set`, `exploit`/`sessions`.
  - **Module 3 — Méthodologie et reconnaissance** : les phases du PTES, le
    vocabulaire Metasploit (exploit/payload/shellcode/module/listener),
    collecte de renseignements passive/active (`whois`, `nmap -sV`), scan de
    vulnérabilités (`db_nmap`, `hosts`).
  - **Module 4 — Utilisation avancée de Metasploit** : explorer un module
    (`show payloads`, `show targets`, `info`, `setg`/`unsetg`), Meterpreter
    et post-exploitation (`sysinfo`, `getuid`, `ps`, `migrate`, `getsystem`),
    éviter la détection (`msfvenom`, encodage).
  - **Module 5 — Ingénierie sociale et automatisation** : attaques côté
    client, modules auxiliaires (`use auxiliary/...`, `run`), Social-Engineer
    Toolkit (`setoolkit`), FAST-TRACK et resource scripts (`resource`),
    Karmetasploit (`load karma`).
- Théorie → exercices guidés dans une console simulée (feedback immédiat,
  indice après 2 essais, correction proposée après 3) → examen de
  validation (100 % requis, retentables à l'infini, corrigé affiché en cas
  d'échec).
- FR / EN, thème clair/obscur, taille de texte réglable (A- / A+).
- Téléchargement du questionnaire (toujours dispo) et du corrigé (verrouillé
  tant que toutes les réponses ne sont pas remplies).
- Case à cocher « Afficher mon score » à côté du corrigé.
- Pied de page avec mentions légales / CGU / licence (pré-remplies avec vos
  informations SIRENE) et lien LinkedIn.

## Limites volontaires de ce prototype

- **Pas de backend** : tout est en `localStorage`, donc par navigateur/appareil,
  sans compte utilisateur ni suivi multi-appareils.
- Le contenu des 17 chapitres (modules 1 à 5) est un **exemple original**
  rédigé pour la démo, y compris les chapitres 3 à 5 qui reprennent la
  structure de vos notes de cours (phases du PTES, vocabulaire, Meterpreter,
  évasion, SET, FAST-TRACK, Karmetasploit) reformulée pour l'engin
  théorie/pratique/examen. Le moteur est prêt à recevoir vos propres
  chapitres supplémentaires sans aucune autre modification de code.
- La détection de réponse « incompréhensible » avant déblocage du corrigé
  est un simple test de longueur minimale — pas une vraie analyse.

## Par où étendre en premier

1. **Ajouter vos vrais chapitres** : il suffit d'ajouter des objets dans
   `COURSE.modules` (`data.js`) — aucune autre modification de code n'est
   nécessaire, tout le moteur (théorie / pratique / examen / téléchargement)
   est générique.
2. **Un vrai backend + comptes utilisateurs** (ex. Node/Express + base de
   données, ou Firebase/Supabase) pour suivre la progression sur plusieurs
   appareils, avoir un tableau de bord formateur, et exporter les scores de
   tous les apprenants.
3. **Génération de PDF réels** pour le questionnaire/corrigé (actuellement
   des fichiers `.txt` téléchargés côté navigateur) via une librairie comme
   `pdf-lib` ou un export serveur.
4. **Simulateur de console plus riche** : un vrai petit système de fichiers
   virtuel pour que `cd`/`ls` réagissent dynamiquement à n'importe quel
   chemin tapé (pas seulement aux réponses attendues), avec messages
   d'erreur Linux réalistes (`No such file or directory`, etc.).
5. **Accessibilité et i18n renforcées** : remplacer le sélecteur CSS
   `:has()` (support récent) par une classe explicite si vous devez
   supporter d'anciens navigateurs, et externaliser `I18N`/`COURSE` dans des
   fichiers JSON si une troisième langue s'ajoute.
