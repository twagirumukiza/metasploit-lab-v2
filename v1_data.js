/* =========================================================================
   data.js — Contenu du cours (démo). Deux modules, cinq chapitres.
   Chaque chapitre = { theory, practice[], exam.questions[] }
   "accept" = liste de motifs (chaîne exacte ou RegExp) acceptés comme bons.
   ========================================================================= */

const COURSE = {
  modules: [
    {
      id: "linux-basics",
      title: { fr: "Module 1 — Se repérer sous Kali Linux", en: "Module 1 — Finding your way around Kali Linux" },
      chapters: [
        {
          id: "pwd-cd",
          title: { fr: "cd — se déplacer dans l'arborescence", en: "cd — moving through the filesystem" },
          intro: {
            fr: "Sous Kali, tout est rangé dans une arborescence unique qui part de la racine <code>/</code>. Avant de lancer le moindre outil, il faut savoir où l'on se trouve et comment se déplacer.",
            en: "On Kali, everything lives in a single tree starting at the root <code>/</code>. Before running any tool, you need to know where you are and how to move around."
          },
          theory: [
            {
              fr: "<code>pwd</code> (print working directory) affiche le dossier dans lequel tu te trouves actuellement.",
              en: "<code>pwd</code> (print working directory) shows the folder you are currently in."
            },
            {
              fr: "<code>cd &lt;chemin&gt;</code> (change directory) te déplace vers un autre dossier. Le chemin peut être <strong>absolu</strong> (il commence par <code>/</code>, ex. <code>/root/Bureau</code>) ou <strong>relatif</strong> à l'endroit où tu es (ex. <code>Bureau</code>).",
              en: "<code>cd &lt;path&gt;</code> (change directory) moves you to another folder. The path can be <strong>absolute</strong> (starts with <code>/</code>, e.g. <code>/root/Desktop</code>) or <strong>relative</strong> to where you are (e.g. <code>Desktop</code>)."
            },
            {
              fr: "Quelques raccourcis utiles : <code>cd ..</code> remonte d'un niveau, <code>cd ~</code> (ou <code>cd</code> seul) te ramène dans ton dossier personnel, et <code>cd -</code> te renvoie au dossier précédent.",
              en: "A few handy shortcuts: <code>cd ..</code> goes up one level, <code>cd ~</code> (or just <code>cd</code>) takes you back to your home folder, and <code>cd -</code> returns you to the previous folder."
            }
          ],
          practice: [
            {
              instruction: { fr: "Affiche le dossier dans lequel tu te trouves actuellement.", en: "Show the folder you are currently in." },
              accept: ["pwd"],
              output: { fr: "/root", en: "/root" },
              missingHint: { fr: "Il te faut une commande qui n'a pas besoin d'argument et qui « imprime » ta position actuelle.", en: "You need a command that takes no argument and \"prints\" your current position." }
            },
            {
              instruction: { fr: "Déplace-toi vers le dossier <code>/root/Bureau</code> (utilise un chemin absolu).", en: "Move into the <code>/root/Desktop</code> folder (use an absolute path)." },
              accept: ["cd /root/Bureau", "cd /root/Desktop"],
              output: { fr: "(aucune sortie — c'est normal, cd est silencieux en cas de succès)", en: "(no output — that's normal, cd stays silent on success)" },
              missingHint: { fr: "Il te manque soit la commande <code>cd</code>, soit le chemin cible après. Le chemin absolu commence par <code>/</code>.", en: "You're missing either the <code>cd</code> command itself, or the target path after it. An absolute path starts with <code>/</code>." }
            },
            {
              instruction: { fr: "Depuis ce dossier, remonte d'un seul niveau dans l'arborescence.", en: "From here, go back up exactly one level in the tree." },
              accept: ["cd .."],
              output: { fr: "/root", en: "/root" },
              missingHint: { fr: "Le raccourci pour « le dossier parent » est composé de deux points.", en: "The shortcut for \"the parent folder\" is two dots." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande pour afficher ton dossier courant.", en: "Command to display your current folder." }, accept: ["pwd"], correction: { fr: "<code>pwd</code>", en: "<code>pwd</code>" } },
              { prompt: { fr: "Commande pour te rendre directement dans ton dossier personnel, en une seule lettre en plus de cd.", en: "Command to jump straight to your home folder, using one extra character after cd." }, accept: ["cd ~"], correction: { fr: "<code>cd ~</code>", en: "<code>cd ~</code>" } },
              { prompt: { fr: "Commande pour revenir au tout dernier dossier où tu étais avant ton déplacement actuel.", en: "Command to return to the very last folder you were in before this move." }, accept: ["cd -"], correction: { fr: "<code>cd -</code>", en: "<code>cd -</code>" } }
            ]
          }
        },
        {
          id: "ls",
          title: { fr: "ls — lister le contenu d'un dossier", en: "ls — listing folder contents" },
          intro: {
            fr: "Une fois qu'on sait se déplacer, il faut pouvoir regarder ce qu'il y a autour de soi : c'est le rôle de <code>ls</code>.",
            en: "Once you know how to move around, you need to look at what's around you — that's what <code>ls</code> is for."
          },
          theory: [
            { fr: "<code>ls</code> seul liste les fichiers et dossiers visibles du dossier courant.", en: "<code>ls</code> on its own lists the visible files and folders in the current directory." },
            { fr: "<code>ls -l</code> affiche une vue détaillée (permissions, propriétaire, taille, date). <code>ls -a</code> montre en plus les fichiers cachés (ceux qui commencent par un point). On peut combiner les deux avec <code>ls -la</code>.", en: "<code>ls -l</code> shows a detailed view (permissions, owner, size, date). <code>ls -a</code> also reveals hidden files (the ones starting with a dot). You can combine both with <code>ls -la</code>." }
          ],
          practice: [
            { instruction: { fr: "Liste simplement le contenu du dossier courant.", en: "Simply list the contents of the current folder." }, accept: ["ls"], output: { fr: "Bureau  Documents  Téléchargements  outils/", en: "Desktop  Documents  Downloads  tools/" }, missingHint: { fr: "Une commande de trois lettres suffit, sans option.", en: "A three-letter command is enough, no options needed." } },
            { instruction: { fr: "Liste maintenant le contenu, y compris les fichiers cachés, en vue détaillée.", en: "Now list the contents, including hidden files, in detailed view." }, accept: ["ls -la", "ls -al"], output: { fr: "drwx------  5 root root 4096 ... .\ndrwxr-xr-x 20 root root 4096 ... ..\n-rw-------  1 root root  120 ... .bash_history", en: "drwx------  5 root root 4096 ... .\ndrwxr-xr-x 20 root root 4096 ... ..\n-rw-------  1 root root  120 ... .bash_history" }, missingHint: { fr: "Il faut combiner deux options : une pour les détails, une pour les fichiers cachés.", en: "You need to combine two options: one for details, one for hidden files." } }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande simple pour lister un dossier.", en: "Simple command to list a folder." }, accept: ["ls"], correction: { fr: "<code>ls</code>", en: "<code>ls</code>" } },
              { prompt: { fr: "Option de ls qui révèle les fichiers cachés.", en: "ls option that reveals hidden files." }, accept: ["ls -a", "-a"], correction: { fr: "<code>ls -a</code>", en: "<code>ls -a</code>" } },
              { prompt: { fr: "Commande combinant vue détaillée et fichiers cachés.", en: "Command combining detailed view and hidden files." }, accept: ["ls -la", "ls -al"], correction: { fr: "<code>ls -la</code>", en: "<code>ls -la</code>" } }
            ]
          }
        }
      ]
    },
    {
      id: "metasploit-basics",
      title: { fr: "Module 2 — Premiers pas avec Metasploit", en: "Module 2 — First steps with Metasploit" },
      chapters: [
        {
          id: "msfconsole-search",
          title: { fr: "msfconsole et search", en: "msfconsole and search" },
          intro: {
            fr: "Metasploit Framework est un ensemble d'outils d'audit et de test d'intrusion. <code>msfconsole</code> est son interface principale en ligne de commande.",
            en: "Metasploit Framework is a toolkit for security auditing and penetration testing. <code>msfconsole</code> is its main command-line interface."
          },
          theory: [
            { fr: "Depuis un terminal Kali, la commande <code>msfconsole</code> démarre l'interface de Metasploit. Le prompt devient alors <code>msf6 &gt;</code>.", en: "From a Kali terminal, the <code>msfconsole</code> command starts the Metasploit interface. The prompt then becomes <code>msf6 &gt;</code>." },
            { fr: "Une fois dedans, la commande <code>search &lt;mot-clé&gt;</code> permet de chercher un module (exploit, scanner, payload...) dans la base de Metasploit, par nom, par service ou par référence CVE.", en: "Once inside, the <code>search &lt;keyword&gt;</code> command looks up a module (exploit, scanner, payload...) in Metasploit's database, by name, service, or CVE reference." }
          ],
          practice: [
            { instruction: { fr: "Depuis le terminal Kali, lance l'interface de Metasploit.", en: "From the Kali terminal, start the Metasploit interface." }, accept: ["msfconsole"], output: { fr: "[msf6 démarre...]\nmsf6 >", en: "[msf6 starting...]\nmsf6 >" }, missingHint: { fr: "C'est le nom de l'outil lui-même, une seule commande, sans argument.", en: "It's the name of the tool itself, a single command, no argument." } },
            { instruction: { fr: "Cherche les modules liés au service <em>ftp</em>.", en: "Search for modules related to the <em>ftp</em> service." }, accept: ["search ftp"], output: { fr: "Matching Modules\n================\n  #  Name                                Disclosure Date  Rank\n  0  exploit/unix/ftp/vsftpd_234_backdoor 2011-07-03      excellent", en: "Matching Modules\n================\n  #  Name                                Disclosure Date  Rank\n  0  exploit/unix/ftp/vsftpd_234_backdoor 2011-07-03      excellent" }, missingHint: { fr: "Il te faut la commande de recherche suivie du mot-clé.", en: "You need the search command followed by the keyword." } }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande pour démarrer Metasploit depuis un terminal.", en: "Command to start Metasploit from a terminal." }, accept: ["msfconsole"], correction: { fr: "<code>msfconsole</code>", en: "<code>msfconsole</code>" } },
              { prompt: { fr: "Commande pour chercher des modules concernant le service smb.", en: "Command to search for modules related to the smb service." }, accept: ["search smb"], correction: { fr: "<code>search smb</code>", en: "<code>search smb</code>" } }
            ]
          }
        },
        {
          id: "use-set-show",
          title: { fr: "use, show options et set", en: "use, show options and set" },
          intro: {
            fr: "Une fois un module repéré avec <code>search</code>, il faut le sélectionner puis le configurer avant de l'utiliser.",
            en: "Once a module is found with <code>search</code>, you need to select it and configure it before using it."
          },
          theory: [
            { fr: "<code>use &lt;chemin_du_module&gt;</code> sélectionne un module. Le prompt affiche alors son nom.", en: "<code>use &lt;module_path&gt;</code> selects a module. The prompt then shows its name." },
            { fr: "<code>show options</code> affiche les paramètres du module sélectionné : ceux déjà définis, et ceux qui sont encore requis (colonne <em>Required</em>).", en: "<code>show options</code> displays the selected module's parameters: which ones are already set, and which are still required (<em>Required</em> column)." },
            { fr: "<code>set &lt;PARAMETRE&gt; &lt;valeur&gt;</code> définit un paramètre, par exemple l'adresse de la cible (<code>RHOSTS</code>) ou le port (<code>RPORT</code>).", en: "<code>set &lt;PARAMETER&gt; &lt;value&gt;</code> sets a parameter, for example the target address (<code>RHOSTS</code>) or the port (<code>RPORT</code>)." }
          ],
          practice: [
            { instruction: { fr: "Sélectionne le module <code>exploit/unix/ftp/vsftpd_234_backdoor</code>.", en: "Select the <code>exploit/unix/ftp/vsftpd_234_backdoor</code> module." }, accept: ["use exploit/unix/ftp/vsftpd_234_backdoor"], output: { fr: "msf6 exploit(unix/ftp/vsftpd_234_backdoor) >", en: "msf6 exploit(unix/ftp/vsftpd_234_backdoor) >" }, missingHint: { fr: "La commande pour sélectionner un module tient en trois lettres, suivie du chemin exact du module.", en: "The command to select a module is three letters, followed by the exact module path." } },
            { instruction: { fr: "Définis l'adresse de la cible sur <code>10.10.10.5</code>.", en: "Set the target address to <code>10.10.10.5</code>." }, accept: ["set RHOSTS 10.10.10.5", "set rhosts 10.10.10.5"], output: { fr: "RHOSTS => 10.10.10.5", en: "RHOSTS => 10.10.10.5" }, missingHint: { fr: "Utilise <code>set</code>, suivi du nom du paramètre pour l'hôte cible (au pluriel), puis de l'adresse.", en: "Use <code>set</code>, followed by the target-host parameter name (plural), then the address." } }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande pour sélectionner le module exploit/windows/smb/ms17_010_eternalblue.", en: "Command to select the exploit/windows/smb/ms17_010_eternalblue module." }, accept: ["use exploit/windows/smb/ms17_010_eternalblue"], correction: { fr: "<code>use exploit/windows/smb/ms17_010_eternalblue</code>", en: "<code>use exploit/windows/smb/ms17_010_eternalblue</code>" } },
              { prompt: { fr: "Commande pour afficher les paramètres du module sélectionné.", en: "Command to show the selected module's parameters." }, accept: ["show options"], correction: { fr: "<code>show options</code>", en: "<code>show options</code>" } },
              { prompt: { fr: "Commande pour fixer le port cible (RPORT) à 445.", en: "Command to set the target port (RPORT) to 445." }, accept: ["set RPORT 445", "set rport 445"], correction: { fr: "<code>set RPORT 445</code>", en: "<code>set RPORT 445</code>" } }
            ]
          }
        },
        {
          id: "exploit-sessions",
          title: { fr: "exploit et sessions", en: "exploit and sessions" },
          intro: {
            fr: "Dernière étape : lancer le module configuré, puis gérer la session obtenue.",
            en: "Last step: launch the configured module, then manage the resulting session."
          },
          theory: [
            { fr: "Une fois tous les paramètres requis définis, <code>exploit</code> (ou <code>run</code>) lance le module.", en: "Once every required parameter is set, <code>exploit</code> (or <code>run</code>) launches the module." },
            { fr: "En cas de succès sur une cible, une session s'ouvre. <code>sessions -l</code> liste les sessions actives, et <code>sessions -i &lt;id&gt;</code> permet d'en reprendre une.", en: "On success, a session opens. <code>sessions -l</code> lists active sessions, and <code>sessions -i &lt;id&gt;</code> lets you interact with one." }
          ],
          practice: [
            { instruction: { fr: "Lance le module maintenant que tous les paramètres sont configurés.", en: "Launch the module now that every parameter is set." }, accept: ["exploit", "run"], output: { fr: "[*] Command shell session 1 opened", en: "[*] Command shell session 1 opened" }, missingHint: { fr: "Deux commandes très courtes font l'affaire ici : l'une évoque directement l'action, l'autre est plus générique.", en: "Two very short commands work here: one directly names the action, the other is more generic." } },
            { instruction: { fr: "Affiche la liste des sessions actives.", en: "Display the list of active sessions." }, accept: ["sessions -l", "sessions"], output: { fr: "Active sessions\n===============\n  Id  Type  Information\n  1   shell 10.10.10.5", en: "Active sessions\n===============\n  Id  Type  Information\n  1   shell 10.10.10.5" }, missingHint: { fr: "La commande de gestion des sessions, éventuellement suivie de l'option de listing.", en: "The session-management command, optionally followed by the listing option." } }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande pour lancer un module déjà configuré.", en: "Command to launch an already-configured module." }, accept: ["exploit", "run"], correction: { fr: "<code>exploit</code> (ou <code>run</code>)", en: "<code>exploit</code> (or <code>run</code>)" } },
              { prompt: { fr: "Commande pour reprendre la session numéro 2.", en: "Command to interact with session number 2." }, accept: ["sessions -i 2"], correction: { fr: "<code>sessions -i 2</code>", en: "<code>sessions -i 2</code>" } }
            ]
          }
        }
      ]
    },
    {
      id: "methodologie-reconnaissance",
      title: { fr: "Module 3 — Méthodologie et reconnaissance", en: "Module 3 — Methodology and reconnaissance" },
      chapters: [
        {
          id: "pentest-phases",
          title: { fr: "Les phases du PTES", en: "The PTES phases" },
          intro: {
            fr: "Avant de toucher à Metasploit, il faut comprendre ce qu'est un test d'intrusion et comment il se déroule. Le PTES (Penetration Testing Execution Standard) découpe un pentest en sept phases.",
            en: "Before touching Metasploit, you need to understand what a penetration test is and how it unfolds. The PTES (Penetration Testing Execution Standard) breaks a pentest down into seven phases."
          },
          theory: [
            { fr: "Un pentest consiste à évaluer la sécurité d'un système en recherchant puis en validant des vulnérabilités — ce n'est pas simplement « lancer Metasploit ».", en: "A pentest means assessing a system's security by finding and then validating vulnerabilities — it's not simply \"running Metasploit\"." },
            { fr: "Le PTES définit sept phases : pré-engagement, collecte de renseignements, modélisation des menaces, analyse des vulnérabilités, exploitation, post-exploitation, puis rapport.", en: "PTES defines seven phases: pre-engagement, intelligence gathering, threat modeling, vulnerability analysis, exploitation, post-exploitation, and reporting." },
            { fr: "Metasploit n'intervient principalement que sur certaines de ces étapes (surtout l'analyse des vulnérabilités, l'exploitation et la post-exploitation) : ce n'est qu'un outil parmi d'autres dans une méthodologie plus large.", en: "Metasploit is mainly involved in a few of these steps (mostly vulnerability analysis, exploitation, and post-exploitation): it's just one tool within a broader methodology." }
          ],
          practice: [
            {
              instruction: { fr: "Dans quelle phase du PTES définit-on le périmètre, les autorisations et les objectifs, avant toute action technique ?", en: "In which PTES phase do you define scope, authorizations and goals, before any technical action?" },
              accept: ["pre-engagement", "pré-engagement", "preengagement"],
              output: { fr: "Phase reconnue : Pré-engagement.", en: "Phase recognized: Pre-engagement." },
              missingHint: { fr: "C'est la toute première phase, celle où l'on négocie le cadre de la mission avant de scanner quoi que ce soit.", en: "It's the very first phase, where you agree on the mission's scope before scanning anything." }
            },
            {
              instruction: { fr: "Quelle phase consiste à documenter les résultats et les recommandations à la fin du pentest ?", en: "Which phase involves documenting the findings and recommendations at the end of the pentest?" },
              accept: ["rapport", "reporting", "le rapport"],
              output: { fr: "Phase reconnue : Rapport.", en: "Phase recognized: Reporting." },
              missingHint: { fr: "C'est la dernière étape du PTES, celle qui transforme le travail technique en livrable pour le client.", en: "It's the last PTES step, the one that turns the technical work into a deliverable for the client." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Nom de la première phase du PTES, avant toute action technique.", en: "Name of the first PTES phase, before any technical action." }, accept: ["pre-engagement", "pré-engagement"], correction: { fr: "<code>Pré-engagement</code>", en: "<code>Pre-engagement</code>" } },
              { prompt: { fr: "Nom de la phase où l'on recherche des informations sur la cible sans encore l'exploiter.", en: "Name of the phase where you gather information on the target without exploiting it yet." }, accept: ["collecte de renseignements", "collecte de renseignement", "intelligence gathering"], correction: { fr: "<code>Collecte de renseignements</code>", en: "<code>Intelligence gathering</code>" } },
              { prompt: { fr: "Nom de la dernière phase du PTES, qui documente les résultats.", en: "Name of the last PTES phase, which documents the findings." }, accept: ["rapport", "reporting"], correction: { fr: "<code>Rapport</code>", en: "<code>Reporting</code>" } }
            ]
          }
        },
        {
          id: "vocabulaire-metasploit",
          title: { fr: "Le vocabulaire de Metasploit", en: "Metasploit vocabulary" },
          intro: {
            fr: "Avant d'aller plus loin, il faut maîtriser cinq mots que tu croiseras partout dans Metasploit.",
            en: "Before going further, you need five words you'll run into everywhere in Metasploit."
          },
          theory: [
            { fr: "Un <strong>exploit</strong> est le code ou le mécanisme qui tire parti d'une vulnérabilité. Un <strong>payload</strong> est ce qui s'exécute une fois l'exploitation réussie.", en: "An <strong>exploit</strong> is the code or mechanism that takes advantage of a vulnerability. A <strong>payload</strong> is what runs once exploitation succeeds." },
            { fr: "Un <strong>shellcode</strong> est souvent utilisé comme charge utile dans certains exploits. Un <strong>module</strong> est simplement un élément fonctionnel du Framework (exploit, auxiliaire, payload...).", en: "<strong>Shellcode</strong> is often used as the payload inside certain exploits. A <strong>module</strong> is simply a functional building block of the Framework (exploit, auxiliary, payload...)." },
            { fr: "Un <strong>listener</strong> est le composant qui attend une connexion provenant d'une charge utile. La chaîne mentale à retenir : Module → options → exploit → payload → session.", en: "A <strong>listener</strong> is the component that waits for a connection coming from a payload. The mental chain to remember: Module → options → exploit → payload → session." }
          ],
          practice: [
            {
              instruction: { fr: "Quel terme désigne le code exécuté après le succès de l'exploitation ?", en: "Which term names the code that runs after exploitation succeeds?" },
              accept: ["payload"],
              output: { fr: "Terme reconnu : payload.", en: "Term recognized: payload." },
              missingHint: { fr: "Ce n'est pas l'exploit lui-même, mais ce qu'il livre une fois la porte ouverte.", en: "It's not the exploit itself, but what it delivers once the door is open." }
            },
            {
              instruction: { fr: "Quel terme désigne le composant qui attend une connexion entrante provenant d'une charge utile ?", en: "Which term names the component waiting for an incoming connection from a payload?" },
              accept: ["listener"],
              output: { fr: "Terme reconnu : listener.", en: "Term recognized: listener." },
              missingHint: { fr: "C'est littéralement celui qui « écoute ».", en: "It's literally the one that \"listens\"." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Terme désignant le code qui exploite une vulnérabilité.", en: "Term naming the code that exploits a vulnerability." }, accept: ["exploit"], correction: { fr: "<code>Exploit</code>", en: "<code>Exploit</code>" } },
              { prompt: { fr: "Terme désignant un élément fonctionnel du Framework Metasploit (exploit, auxiliaire, payload...).", en: "Term naming a functional building block of the Metasploit Framework (exploit, auxiliary, payload...)." }, accept: ["module"], correction: { fr: "<code>Module</code>", en: "<code>Module</code>" } },
              { prompt: { fr: "Terme désignant le composant qui attend une connexion provenant d'un payload.", en: "Term naming the component waiting for a connection coming from a payload." }, accept: ["listener"], correction: { fr: "<code>Listener</code>", en: "<code>Listener</code>" } }
            ]
          }
        },
        {
          id: "collecte-renseignements",
          title: { fr: "Collecte de renseignements — passive et active", en: "Intelligence gathering — passive and active" },
          intro: {
            fr: "Avant d'exploiter quoi que ce soit, il faut comprendre l'exposition de la cible : quels hôtes, quels ports, quels services.",
            en: "Before exploiting anything, you need to understand the target's exposure: which hosts, which ports, which services."
          },
          theory: [
            { fr: "La collecte <strong>passive</strong> récupère des informations sans interagir directement et de façon intrusive avec la cible — via WHOIS, Netcraft ou NSLookup par exemple.", en: "<strong>Passive</strong> gathering collects information without directly and intrusively interacting with the target — via WHOIS, Netcraft or NSLookup, for example." },
            { fr: "La collecte <strong>active</strong> interagit directement avec l'environnement cible ; l'outil de référence ici est <code>nmap</code>.", en: "<strong>Active</strong> gathering interacts directly with the target environment; the reference tool here is <code>nmap</code>." },
            { fr: "L'enchaînement logique est : hôte → ports ouverts → services → versions → technologies. L'objectif n'est pas encore de compromettre la machine, mais de comprendre son exposition.", en: "The logical chain is: host → open ports → services → versions → technologies. The goal isn't to compromise the machine yet, but to understand its exposure." }
          ],
          practice: [
            {
              instruction: { fr: "Interroge le WHOIS du domaine <code>exemple.fr</code> depuis un terminal Kali.", en: "Query the WHOIS record for <code>exemple.fr</code> from a Kali terminal." },
              accept: ["whois exemple.fr"],
              output: { fr: "Domain Name: EXEMPLE.FR\nRegistrar: ...", en: "Domain Name: EXEMPLE.FR\nRegistrar: ..." },
              missingHint: { fr: "La commande porte le même nom que le service qu'elle interroge, suivie du nom de domaine.", en: "The command shares its name with the service it queries, followed by the domain name." }
            },
            {
              instruction: { fr: "Lance un scan actif de la cible <code>10.10.10.5</code> avec détection de version des services.", en: "Run an active scan of target <code>10.10.10.5</code> with service-version detection." },
              accept: ["nmap -sV 10.10.10.5"],
              output: { fr: "PORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 2.3.4", en: "PORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 2.3.4" },
              missingHint: { fr: "C'est nmap, avec l'option qui détecte les versions (-sV), suivi de l'adresse cible.", en: "It's nmap, with the version-detection flag (-sV), followed by the target address." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande pour interroger le WHOIS du domaine cible.fr.", en: "Command to query the WHOIS record for cible.fr." }, accept: ["whois cible.fr"], correction: { fr: "<code>whois cible.fr</code>", en: "<code>whois cible.fr</code>" } },
              { prompt: { fr: "Outil de référence pour la collecte active, avec l'option de détection de version.", en: "Reference tool for active gathering, with the version-detection flag." }, accept: ["nmap -sv", "nmap -sV"], correction: { fr: "<code>nmap -sV</code>", en: "<code>nmap -sV</code>" } },
              { prompt: { fr: "Entre passive et active, quelle méthode de collecte n'interagit pas directement et de façon intrusive avec la cible ?", en: "Between passive and active, which gathering method doesn't interact directly and intrusively with the target?" }, accept: ["passive"], correction: { fr: "<code>Passive</code>", en: "<code>Passive</code>" } }
            ]
          }
        },
        {
          id: "scan-vulnerabilites",
          title: { fr: "Scan de vulnérabilités", en: "Vulnerability scanning" },
          intro: {
            fr: "Un scan de ports dit ce qui est accessible ; un scan de vulnérabilités dit ce qui pourrait être un problème de sécurité.",
            en: "A port scan tells you what's reachable; a vulnerability scan tells you what might be a security problem."
          },
          theory: [
            { fr: "Des scanners comme NeXpose ou Nessus détectent des vulnérabilités potentielles, que l'on peut ensuite importer dans Metasploit.", en: "Scanners like NeXpose or Nessus detect potential vulnerabilities, which can then be imported into Metasploit." },
            { fr: "Chaînage logique : port → service → version → vulnérabilité → exploit potentiel.", en: "Logical chaining: port → service → version → vulnerability → potential exploit." },
            { fr: "Une vulnérabilité détectée ne signifie pas automatiquement qu'elle est exploitable : il faut ensuite vérifier et interpréter le résultat.", en: "A detected vulnerability doesn't automatically mean it's exploitable: the result still needs to be verified and interpreted." }
          ],
          practice: [
            {
              instruction: { fr: "Depuis msfconsole, lance un scan nmap sur <code>10.10.10.5</code> avec détection de version, en important directement le résultat dans la base Metasploit.", en: "From msfconsole, run an nmap scan on <code>10.10.10.5</code> with version detection, importing the result straight into the Metasploit database." },
              accept: ["db_nmap -sV 10.10.10.5"],
              output: { fr: "[*] Nmap: PORT STATE SERVICE VERSION\n[*] Nmap: 21/tcp open ftp vsftpd 2.3.4\n[*] Hosts added to the database: 1", en: "[*] Nmap: PORT STATE SERVICE VERSION\n[*] Nmap: 21/tcp open ftp vsftpd 2.3.4\n[*] Hosts added to the database: 1" },
              missingHint: { fr: "C'est la version « base de données » de nmap dans msfconsole : elle commence par <code>db_</code>.", en: "It's the \"database-aware\" version of nmap inside msfconsole: it starts with <code>db_</code>." }
            },
            {
              instruction: { fr: "Affiche les hôtes déjà enregistrés dans la base de données du projet Metasploit courant.", en: "Display the hosts already recorded in the current Metasploit project's database." },
              accept: ["hosts"],
              output: { fr: "Hosts\n=====\naddress      mac  name  os_name\n10.10.10.5", en: "Hosts\n=====\naddress      mac  name  os_name\n10.10.10.5" },
              missingHint: { fr: "Une commande de cinq lettres, au pluriel, sans argument.", en: "A five-letter command, plural, with no argument." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande msfconsole qui lance nmap et importe le résultat en base.", en: "msfconsole command that runs nmap and imports the result into the database." }, accept: ["db_nmap -sV 10.10.10.5", "db_nmap"], correction: { fr: "<code>db_nmap -sV &lt;cible&gt;</code>", en: "<code>db_nmap -sV &lt;target&gt;</code>" } },
              { prompt: { fr: "Commande pour lister les hôtes déjà connus de la base de données courante.", en: "Command to list the hosts already known to the current database." }, accept: ["hosts"], correction: { fr: "<code>hosts</code>", en: "<code>hosts</code>" } },
              { prompt: { fr: "Dans la chaîne port → service → version → ? → exploit potentiel, quel maillon manque ?", en: "In the chain port → service → version → ? → potential exploit, which link is missing?" }, accept: ["vulnerabilite", "vulnérabilité", "vulnerabilité"], correction: { fr: "<code>Vulnérabilité</code>", en: "<code>Vulnerability</code>" } }
            ]
          }
        }
      ]
    },
    {
      id: "metasploit-avance",
      title: { fr: "Module 4 — Utilisation avancée de Metasploit", en: "Module 4 — Advanced Metasploit usage" },
      chapters: [
        {
          id: "explorer-modules",
          title: { fr: "Explorer et configurer un module", en: "Exploring and configuring a module" },
          intro: {
            fr: "Avant d'utiliser un module, il faut savoir l'inspecter : quels exploits existent, quelles options il attend, quel payload choisir.",
            en: "Before using a module, you need to know how to inspect it: which exploits exist, which options it expects, which payload to pick."
          },
          theory: [
            { fr: "<code>show exploits</code>, <code>show auxiliary</code> et <code>show payloads</code> listent respectivement les exploits, les modules auxiliaires et les payloads disponibles. <code>show targets</code> liste les cibles prises en charge par le module sélectionné.", en: "<code>show exploits</code>, <code>show auxiliary</code> and <code>show payloads</code> list respectively the available exploits, auxiliary modules and payloads. <code>show targets</code> lists the targets supported by the selected module." },
            { fr: "<code>info</code> affiche les informations détaillées d'un module (description, auteurs, références, options).", en: "<code>info</code> shows a module's detailed information (description, authors, references, options)." },
            { fr: "<code>set</code> définit une option pour le module courant, <code>unset</code> la supprime. <code>setg</code> définit une valeur <em>globale</em>, valable pour tous les modules suivants, tant qu'on ne fait pas <code>unsetg</code>.", en: "<code>set</code> defines an option for the current module, <code>unset</code> removes it. <code>setg</code> sets a <em>global</em> value, valid for every following module, until you run <code>unsetg</code>." }
          ],
          practice: [
            {
              instruction: { fr: "Affiche la liste des payloads compatibles avec le module actuellement sélectionné.", en: "Display the payloads compatible with the currently selected module." },
              accept: ["show payloads"],
              output: { fr: "Compatible Payloads\n====================\n  #  Name\n  0  generic/shell_reverse_tcp", en: "Compatible Payloads\n====================\n  #  Name\n  0  generic/shell_reverse_tcp" },
              missingHint: { fr: "C'est <code>show</code> suivi du nom des charges utiles, au pluriel.", en: "It's <code>show</code> followed by the plural of \"payload\"." }
            },
            {
              instruction: { fr: "Définis l'adresse <code>10.10.10.5</code> comme valeur globale de RHOSTS, valable pour tous les modules suivants.", en: "Set <code>10.10.10.5</code> as the global value of RHOSTS, valid for every following module." },
              accept: ["setg RHOSTS 10.10.10.5", "setg rhosts 10.10.10.5"],
              output: { fr: "RHOSTS => 10.10.10.5", en: "RHOSTS => 10.10.10.5" },
              missingHint: { fr: "C'est <code>set</code> avec un <em>g</em> supplémentaire pour « global ».", en: "It's <code>set</code> with an extra <em>g</em> for \"global\"." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande pour afficher les informations détaillées du module sélectionné.", en: "Command to show the selected module's detailed information." }, accept: ["info"], correction: { fr: "<code>info</code>", en: "<code>info</code>" } },
              { prompt: { fr: "Commande pour lister les cibles prises en charge par le module courant.", en: "Command to list the targets supported by the current module." }, accept: ["show targets"], correction: { fr: "<code>show targets</code>", en: "<code>show targets</code>" } },
              { prompt: { fr: "Commande pour supprimer une valeur globale précédemment définie avec setg.", en: "Command to remove a global value previously set with setg." }, accept: ["unsetg"], correction: { fr: "<code>unsetg</code>", en: "<code>unsetg</code>" } }
            ]
          }
        },
        {
          id: "meterpreter",
          title: { fr: "Meterpreter et post-exploitation", en: "Meterpreter and post-exploitation" },
          intro: {
            fr: "Une exploitation réussie ouvre une session. Meterpreter n'est pas « juste un shell » : c'est un environnement complet de post-exploitation.",
            en: "A successful exploitation opens a session. Meterpreter isn't \"just a shell\": it's a full post-exploitation environment."
          },
          theory: [
            { fr: "Une fois une session Meterpreter ouverte, <code>sysinfo</code> affiche des informations sur le système compromis, et <code>getuid</code> l'utilisateur courant.", en: "Once a Meterpreter session is open, <code>sysinfo</code> shows information about the compromised system, and <code>getuid</code> shows the current user." },
            { fr: "<code>ps</code> liste les processus de la cible ; <code>migrate &lt;PID&gt;</code> déplace la session Meterpreter vers un autre processus, souvent pour plus de stabilité ou de discrétion.", en: "<code>ps</code> lists the target's processes; <code>migrate &lt;PID&gt;</code> moves the Meterpreter session into another process, often for more stability or stealth." },
            { fr: "<code>getsystem</code> tente une élévation de privilèges. Le pivoting consiste à utiliser une machine compromise comme point de passage vers un autre réseau.", en: "<code>getsystem</code> attempts privilege escalation. Pivoting means using a compromised machine as a stepping stone into another network." }
          ],
          practice: [
            {
              instruction: { fr: "Depuis une session Meterpreter, affiche les informations sur le système compromis.", en: "From a Meterpreter session, display information about the compromised system." },
              accept: ["sysinfo"],
              output: { fr: "Computer        : TARGET-PC\nOS              : Windows 10\nArchitecture    : x64", en: "Computer        : TARGET-PC\nOS              : Windows 10\nArchitecture    : x64" },
              missingHint: { fr: "Une seule commande, qui colle les mots « système » et « info ».", en: "A single command, combining the words \"system\" and \"info\"." }
            },
            {
              instruction: { fr: "Migre la session Meterpreter vers le processus d'identifiant 1042.", en: "Migrate the Meterpreter session into the process with PID 1042." },
              accept: ["migrate 1042"],
              output: { fr: "[*] Migrating from 884 to 1042...\n[*] Migration completed successfully.", en: "[*] Migrating from 884 to 1042...\n[*] Migration completed successfully." },
              missingHint: { fr: "C'est <code>migrate</code> suivi directement du numéro de processus (PID).", en: "It's <code>migrate</code> followed directly by the process ID (PID)." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande Meterpreter pour afficher l'utilisateur courant sur la cible.", en: "Meterpreter command to show the current user on the target." }, accept: ["getuid"], correction: { fr: "<code>getuid</code>", en: "<code>getuid</code>" } },
              { prompt: { fr: "Commande Meterpreter pour lister les processus en cours sur la cible.", en: "Meterpreter command to list the processes running on the target." }, accept: ["ps"], correction: { fr: "<code>ps</code>", en: "<code>ps</code>" } },
              { prompt: { fr: "Commande Meterpreter qui tente une élévation de privilèges.", en: "Meterpreter command that attempts privilege escalation." }, accept: ["getsystem"], correction: { fr: "<code>getsystem</code>", en: "<code>getsystem</code>" } }
            ]
          }
        },
        {
          id: "evasion-detection",
          title: { fr: "Éviter la détection", en: "Evading detection" },
          intro: {
            fr: "Un payload peut être repéré par signature, par comportement, par un antivirus ou par d'autres mécanismes de sécurité. Encoder un payload change sa forme, pas sa nature.",
            en: "A payload can be caught by signature, by behavior, by antivirus, or by other security mechanisms. Encoding a payload changes its shape, not its nature."
          },
          theory: [
            { fr: "Les techniques évoquées incluent les exécutables autonomes, l'encodage multiple, les templates personnalisés, le lancement discret et les packers.", en: "The techniques covered include standalone executables, multiple encoding passes, custom templates, quiet launching, and packers." },
            { fr: "<strong>Encodage ≠ chiffrement magique ≠ invisibilité.</strong> Modifier la représentation d'un payload ne garantit pas qu'il échappera aux protections modernes.", en: "<strong>Encoding ≠ magic encryption ≠ invisibility.</strong> Changing a payload's representation doesn't guarantee it will evade modern protections." },
            { fr: "<code>msfvenom</code> est l'outil qui génère et encode des payloads en dehors de msfconsole, avec un format de sortie au choix (exe, elf, raw...).", en: "<code>msfvenom</code> is the tool that generates and encodes payloads outside msfconsole, with a choice of output format (exe, elf, raw...)." }
          ],
          practice: [
            {
              instruction: { fr: "Avec <code>msfvenom</code>, génère le payload <code>windows/meterpreter/reverse_tcp</code> encodé avec <code>x86/shikata_ga_nai</code>, au format exécutable, sauvegardé sous <code>shell.exe</code>.", en: "With <code>msfvenom</code>, generate the <code>windows/meterpreter/reverse_tcp</code> payload encoded with <code>x86/shikata_ga_nai</code>, as an executable, saved as <code>shell.exe</code>." },
              accept: ["msfvenom -p windows/meterpreter/reverse_tcp -e x86/shikata_ga_nai -f exe -o shell.exe"],
              output: { fr: "[*] Payload size: 354 bytes\n[*] Saved as: shell.exe", en: "[*] Payload size: 354 bytes\n[*] Saved as: shell.exe" },
              missingHint: { fr: "Quatre options : <code>-p</code> pour le payload, <code>-e</code> pour l'encodeur, <code>-f</code> pour le format, <code>-o</code> pour le fichier de sortie.", en: "Four flags: <code>-p</code> for the payload, <code>-e</code> for the encoder, <code>-f</code> for the format, <code>-o</code> for the output file." }
            },
            {
              instruction: { fr: "Encoder un payload garantit-il qu'il échappera à tout antivirus ? Réponds par « vrai » ou « faux ».", en: "Does encoding a payload guarantee it will evade every antivirus? Answer \"true\" or \"false\"." },
              accept: ["faux", "false"],
              output: { fr: "Exact — l'encodage change la forme, pas la nature.", en: "Correct — encoding changes the shape, not the nature." },
              missingHint: { fr: "Relis le principe : encodage ≠ chiffrement magique ≠ invisibilité.", en: "Re-read the principle: encoding ≠ magic encryption ≠ invisibility." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Outil en ligne de commande (hors msfconsole) pour générer et encoder un payload.", en: "Command-line tool (outside msfconsole) to generate and encode a payload." }, accept: ["msfvenom"], correction: { fr: "<code>msfvenom</code>", en: "<code>msfvenom</code>" } },
              { prompt: { fr: "Option de msfvenom qui précise l'encodeur à utiliser.", en: "msfvenom flag that specifies which encoder to use." }, accept: ["-e"], correction: { fr: "<code>-e</code>", en: "<code>-e</code>" } },
              { prompt: { fr: "Vrai ou faux : encoder un payload garantit qu'il échappera à tout antivirus.", en: "True or false: encoding a payload guarantees it will evade every antivirus." }, accept: ["faux", "false"], correction: { fr: "<code>Faux</code> — l'encodage change la représentation, pas la nature du payload.", en: "<code>False</code> — encoding changes the representation, not the nature of the payload." } }
            ]
          }
        }
      ]
    },
    {
      id: "ingenierie-sociale-auto",
      title: { fr: "Module 5 — Ingénierie sociale et automatisation", en: "Module 5 — Social engineering and automation" },
      chapters: [
        {
          id: "attaques-client",
          title: { fr: "Attaques côté client", en: "Client-side attacks" },
          intro: {
            fr: "Certaines attaques ne visent pas un serveur, mais l'utilisateur lui-même, via un logiciel qu'il utilise.",
            en: "Some attacks don't target a server, but the user themself, through software they use."
          },
          theory: [
            { fr: "Dans une attaque serveur : attaquant → serveur vulnérable. Dans une attaque côté client : utilisateur → ouvre/utilise quelque chose → logiciel vulnérable → vulnérabilité.", en: "In a server-side attack: attacker → vulnerable server. In a client-side attack: user → opens/uses something → vulnerable software → vulnerability." },
            { fr: "Les cibles typiques sont les navigateurs, les fichiers, les documents et les applications clientes.", en: "Typical targets are browsers, files, documents, and client applications." },
            { fr: "Le livre aborde aussi les NOP, la corruption mémoire et l'usage d'un debugger pour analyser un exploit côté client. La reconnaissance de la cible influence fortement la réussite de ce type d'attaque.", en: "Client-side coverage also includes NOPs, memory corruption, and using a debugger to analyze a client-side exploit. Target reconnaissance strongly influences how well this kind of attack succeeds." }
          ],
          practice: [
            {
              instruction: { fr: "Dans une attaque côté client, qui déclenche l'exécution du code vulnérable : l'attaquant à distance, ou l'utilisateur qui ouvre un fichier ?", en: "In a client-side attack, who triggers the vulnerable code: the remote attacker, or the user who opens a file?" },
              accept: ["l'utilisateur", "utilisateur", "the user"],
              output: { fr: "Exact : c'est l'action de l'utilisateur (ouvrir, utiliser) qui déclenche la vulnérabilité.", en: "Correct: it's the user's action (opening, using) that triggers the vulnerability." },
              missingHint: { fr: "Relis le schéma : utilisateur → ouvre/utilise → logiciel vulnérable.", en: "Re-read the diagram: user → opens/uses → vulnerable software." }
            },
            {
              instruction: { fr: "Cite un type de cible typique d'une attaque côté client (navigateur, fichier, document...).", en: "Name one typical target of a client-side attack (browser, file, document...)." },
              accept: ["navigateur", "fichier", "document", "application cliente", "browser", "file", "client application"],
              output: { fr: "Cible reconnue.", en: "Target recognized." },
              missingHint: { fr: "Pense à ce que l'utilisateur ouvre ou utilise au quotidien.", en: "Think about what the user opens or uses day to day." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Dans une attaque côté client, quel élément déclenche la vulnérabilité : l'action du serveur ou l'action de l'utilisateur ?", en: "In a client-side attack, what triggers the vulnerability: the server's action or the user's action?" }, accept: ["l'action de l'utilisateur", "utilisateur", "the user's action", "the user"], correction: { fr: "<code>L'action de l'utilisateur</code> (ouvrir/utiliser un logiciel vulnérable).", en: "<code>The user's action</code> (opening/using vulnerable software)." } },
              { prompt: { fr: "Facteur qui influence fortement la réussite d'une attaque côté client.", en: "Factor that strongly influences the success of a client-side attack." }, accept: ["reconnaissance", "la reconnaissance de la cible", "target reconnaissance"], correction: { fr: "<code>La reconnaissance de la cible</code>", en: "<code>Target reconnaissance</code>" } }
            ]
          }
        },
        {
          id: "modules-auxiliaires",
          title: { fr: "Les modules auxiliaires", en: "Auxiliary modules" },
          intro: {
            fr: "Metasploit ne contient pas que des exploits : les modules auxiliaires servent à scanner, collecter des informations ou tester des services.",
            en: "Metasploit isn't just exploits: auxiliary modules are used to scan, gather information, or test services."
          },
          theory: [
            { fr: "Un exploit cherche principalement à exploiter une vulnérabilité ; un module auxiliaire effectue une fonction complémentaire (scan, énumération, fuzzing...).", en: "An exploit mainly tries to exploit a vulnerability; an auxiliary module performs a complementary function (scanning, enumeration, fuzzing...)." },
            { fr: "Les modules auxiliaires sont particulièrement utiles pendant la reconnaissance et l'énumération, avant même de penser à exploiter quoi que ce soit.", en: "Auxiliary modules are especially useful during reconnaissance and enumeration, before you even think about exploiting anything." },
            { fr: "Ils se sélectionnent et se configurent exactement comme un exploit : <code>use</code>, <code>show options</code>, <code>set</code>, puis <code>run</code> (plutôt que <code>exploit</code>).", en: "They're selected and configured exactly like an exploit: <code>use</code>, <code>show options</code>, <code>set</code>, then <code>run</code> (rather than <code>exploit</code>)." }
          ],
          practice: [
            {
              instruction: { fr: "Sélectionne le module auxiliaire de scan de ports TCP : <code>auxiliary/scanner/portscan/tcp</code>.", en: "Select the TCP port-scan auxiliary module: <code>auxiliary/scanner/portscan/tcp</code>." },
              accept: ["use auxiliary/scanner/portscan/tcp"],
              output: { fr: "msf6 auxiliary(scanner/portscan/tcp) >", en: "msf6 auxiliary(scanner/portscan/tcp) >" },
              missingHint: { fr: "C'est la même commande <code>use</code> que pour un exploit, suivie du chemin du module auxiliaire.", en: "It's the same <code>use</code> command as for an exploit, followed by the auxiliary module's path." }
            },
            {
              instruction: { fr: "Lance le module auxiliaire maintenant que RHOSTS est configuré.", en: "Launch the auxiliary module now that RHOSTS is set." },
              accept: ["run"],
              output: { fr: "[+] 10.10.10.5:22 - TCP OPEN\n[+] 10.10.10.5:80 - TCP OPEN", en: "[+] 10.10.10.5:22 - TCP OPEN\n[+] 10.10.10.5:80 - TCP OPEN" },
              missingHint: { fr: "Contrairement à un exploit, un module auxiliaire ne se lance pas avec <code>exploit</code> mais avec un mot plus générique.", en: "Unlike an exploit, an auxiliary module isn't launched with <code>exploit</code> but with a more generic word." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande pour sélectionner le module auxiliaire auxiliary/scanner/smb/smb_version.", en: "Command to select the auxiliary/scanner/smb/smb_version module." }, accept: ["use auxiliary/scanner/smb/smb_version"], correction: { fr: "<code>use auxiliary/scanner/smb/smb_version</code>", en: "<code>use auxiliary/scanner/smb/smb_version</code>" } },
              { prompt: { fr: "Commande pour lancer un module auxiliaire configuré (différente de exploit).", en: "Command to launch a configured auxiliary module (different from exploit)." }, accept: ["run"], correction: { fr: "<code>run</code>", en: "<code>run</code>" } },
              { prompt: { fr: "Quel type de module sert principalement à scanner ou collecter des informations : exploit ou auxiliaire ?", en: "Which module type is mainly used to scan or gather information: exploit or auxiliary?" }, accept: ["auxiliaire", "auxiliary"], correction: { fr: "<code>Auxiliaire</code>", en: "<code>Auxiliary</code>" } }
            ]
          }
        },
        {
          id: "social-engineer-toolkit",
          title: { fr: "Social-Engineer Toolkit (SET)", en: "Social-Engineer Toolkit (SET)" },
          intro: {
            fr: "La sécurité ne dépend pas que de la technologie : le facteur humain reste une porte d'entrée exploitée par l'ingénierie sociale.",
            en: "Security isn't just about technology: the human factor remains an entry point exploited by social engineering."
          },
          theory: [
            { fr: "SET couvre notamment le spear-phishing, les vecteurs web, la récupération d'identifiants, le tabnabbing, le man-in-the-middle, le web-jacking et les périphériques USB HID.", en: "SET covers spear-phishing, web attack vectors, credential harvesting, tabnabbing, man-in-the-middle, web-jacking, and HID USB devices." },
            { fr: "Concept central : la sécurité repose sur trois piliers — technologie, configuration et utilisateur. Le social engineering exploite principalement ce dernier.", en: "Central concept: security rests on three pillars — technology, configuration, and the user. Social engineering mainly exploits the last one." },
            { fr: "Ce chapitre est plus spécialisé : il n'est pas indispensable pour comprendre les fondamentaux de Metasploit, mais il élargit la vision de ce qu'est un pentest complet.", en: "This chapter is more specialized: it isn't essential to understand Metasploit's fundamentals, but it broadens the view of what a full pentest covers." }
          ],
          practice: [
            {
              instruction: { fr: "Lance l'outil Social-Engineer Toolkit depuis un terminal Kali.", en: "Launch the Social-Engineer Toolkit from a Kali terminal." },
              accept: ["setoolkit"],
              output: { fr: "[---]        The Social-Engineer Toolkit (SET)        [---]\nSelect from the menu:", en: "[---]        The Social-Engineer Toolkit (SET)        [---]\nSelect from the menu:" },
              missingHint: { fr: "C'est le nom de l'outil, en un seul mot, sans espace.", en: "It's the tool's name, as one word, no space." }
            },
            {
              instruction: { fr: "Parmi technologie, configuration et utilisateur, quel pilier est principalement visé par le social engineering ?", en: "Among technology, configuration and user, which pillar does social engineering mainly target?" },
              accept: ["utilisateur", "user"],
              output: { fr: "Exact — le facteur humain.", en: "Correct — the human factor." },
              missingHint: { fr: "C'est le seul des trois piliers qui n'est pas purement technique.", en: "It's the only one of the three pillars that isn't purely technical." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande pour lancer le Social-Engineer Toolkit.", en: "Command to launch the Social-Engineer Toolkit." }, accept: ["setoolkit"], correction: { fr: "<code>setoolkit</code>", en: "<code>setoolkit</code>" } },
              { prompt: { fr: "Pilier de la sécurité principalement exploité par l'ingénierie sociale (technologie, configuration ou utilisateur).", en: "Security pillar mainly exploited by social engineering (technology, configuration, or user)." }, accept: ["utilisateur", "user"], correction: { fr: "<code>Utilisateur</code>", en: "<code>User</code>" } }
            ]
          }
        },
        {
          id: "fast-track",
          title: { fr: "FAST-TRACK et l'automatisation", en: "FAST-TRACK and automation" },
          intro: {
            fr: "Certaines attaques répétitives (SQL, MSSQL...) peuvent être automatisées pour réduire le nombre d'étapes manuelles.",
            en: "Some repetitive attacks (SQL, MSSQL...) can be automated to cut down on manual steps."
          },
          theory: [
            { fr: "FAST-TRACK regroupe des attaques automatisées : injection SQL, SQL injector, MSSQL bruter, SQLPwnage, et des attaques massives côté client.", en: "FAST-TRACK bundles automated attacks: SQL injection, SQL injector, MSSQL bruter, SQLPwnage, and mass client-side attacks." },
            { fr: "L'idée générale : processus manuel → automatisation → FAST-TRACK. Mais avant d'automatiser une tâche, il faut comprendre ce qu'elle fait réellement.", en: "The general idea: manual process → automation → FAST-TRACK. But before automating a task, you need to understand what it actually does." },
            { fr: "Dans msfconsole, une autre forme d'automatisation existe avec les <em>resource scripts</em> : un fichier <code>.rc</code> qui rejoue une suite de commandes.", en: "Inside msfconsole, another form of automation exists via <em>resource scripts</em>: an <code>.rc</code> file that replays a sequence of commands." }
          ],
          practice: [
            {
              instruction: { fr: "Depuis msfconsole, charge et exécute le script de ressources <code>auto.rc</code>.", en: "From msfconsole, load and run the resource script <code>auto.rc</code>." },
              accept: ["resource auto.rc"],
              output: { fr: "[*] Processing auto.rc for ERB directives.\nresource (auto.rc)> use exploit/unix/ftp/vsftpd_234_backdoor", en: "[*] Processing auto.rc for ERB directives.\nresource (auto.rc)> use exploit/unix/ftp/vsftpd_234_backdoor" },
              missingHint: { fr: "C'est la commande <code>resource</code>, suivie directement du nom du fichier <code>.rc</code>.", en: "It's the <code>resource</code> command, followed directly by the <code>.rc</code> filename." }
            },
            {
              instruction: { fr: "Avant d'automatiser une attaque avec FAST-TRACK, que faut-il comprendre en premier : le résultat espéré, ou ce que fait réellement chaque étape automatisée ?", en: "Before automating an attack with FAST-TRACK, what should you understand first: the hoped-for result, or what each automated step actually does?" },
              accept: ["ce que fait reellement chaque etape", "ce que fait réellement chaque étape automatisée", "what each automated step actually does"],
              output: { fr: "Exact — l'automatisation ne dispense pas de comprendre.", en: "Correct — automation doesn't excuse understanding." },
              missingHint: { fr: "Relis le mot-clé du chapitre : comprendre avant d'automatiser.", en: "Re-read the chapter's key phrase: understand before automating." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande msfconsole pour rejouer un script de ressources nommé demo.rc.", en: "msfconsole command to replay a resource script named demo.rc." }, accept: ["resource demo.rc"], correction: { fr: "<code>resource demo.rc</code>", en: "<code>resource demo.rc</code>" } },
              { prompt: { fr: "Nom de l'outil qui regroupe des attaques automatisées comme l'injection SQL ou le MSSQL bruter.", en: "Name of the tool that bundles automated attacks like SQL injection or the MSSQL bruter." }, accept: ["fast-track", "fasttrack"], correction: { fr: "<code>FAST-TRACK</code>", en: "<code>FAST-TRACK</code>" } }
            ]
          }
        },
        {
          id: "karmetasploit",
          title: { fr: "Karmetasploit", en: "Karmetasploit" },
          intro: {
            fr: "Karmetasploit combine Metasploit avec des techniques d'attaque réseau/wireless, pour attirer des clients qui se connectent automatiquement à un faux point d'accès.",
            en: "Karmetasploit combines Metasploit with network/wireless attack techniques, to lure clients that auto-connect to a fake access point."
          },
          theory: [
            { fr: "Le chapitre aborde la configuration, le lancement, la collecte d'informations et l'acquisition de shell via ce mécanisme.", en: "The chapter covers configuration, launching, information gathering, and shell acquisition through this mechanism." },
            { fr: "Dans msfconsole, le plugin correspondant se charge avant de configurer les faux services réseau qui piègent les clients.", en: "Inside msfconsole, the corresponding plugin is loaded before configuring the fake network services that trap clients." },
            { fr: "C'est un chapitre spécialisé : pour apprendre Metasploit de façon progressive, il n'est pas prioritaire par rapport aux fondamentaux déjà vus.", en: "This is a specialized chapter: to learn Metasploit progressively, it isn't a priority compared to the fundamentals already covered." }
          ],
          practice: [
            {
              instruction: { fr: "Charge le plugin Karma dans msfconsole.", en: "Load the Karma plugin in msfconsole." },
              accept: ["load karma"],
              output: { fr: "[*] Karma plugin loaded.", en: "[*] Karma plugin loaded." },
              missingHint: { fr: "C'est <code>load</code> suivi du nom du plugin.", en: "It's <code>load</code> followed by the plugin's name." }
            },
            {
              instruction: { fr: "Karmetasploit sert-il principalement à attaquer un serveur distant, ou à piéger des clients qui se connectent automatiquement à un faux point d'accès ?", en: "Is Karmetasploit mainly for attacking a remote server, or for trapping clients that auto-connect to a fake access point?" },
              accept: ["pieger des clients", "piéger des clients", "trapping clients", "trap clients"],
              output: { fr: "Exact.", en: "Correct." },
              missingHint: { fr: "Repense au contexte réseau/wireless évoqué dans la théorie.", en: "Think back to the network/wireless context mentioned in the theory." }
            }
          ],
          exam: {
            questions: [
              { prompt: { fr: "Commande msfconsole pour charger le plugin Karma.", en: "msfconsole command to load the Karma plugin." }, accept: ["load karma"], correction: { fr: "<code>load karma</code>", en: "<code>load karma</code>" } },
              { prompt: { fr: "Karmetasploit est plutôt utilisé dans un contexte : serveur web, ou réseau/wireless ?", en: "Karmetasploit is mainly used in which context: web server, or network/wireless?" }, accept: ["reseau/wireless", "réseau/wireless", "network/wireless", "wireless"], correction: { fr: "<code>Réseau / wireless</code>", en: "<code>Network / wireless</code>" } }
            ]
          }
        }
      ]
    }
  ]
};
