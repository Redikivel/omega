/* ═══════════════════════════════════════════════════════
   OMEGA GARDEN — app.js
   Vanilla JS · no framework · Vercel static
   Plant catalog → data/plants.json (searched client-side)
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── i18n strings ─────────────────────────────────────── */
const TRANSLATIONS = {
  de: {
    add: 'Pflanze hinzufügen', today: 'Heute · Brauchen Wasser',
    noWater: 'Alle Pflanzen sind versorgt 🌿', searchPlants: 'Pflanzen suchen…',
    all: 'Alle', needsWater: 'Brauchen Wasser', emptyTitle: 'Noch keine Pflanzen',
    emptySub: 'Füge deine erste Pflanze hinzu, um loszulegen.',
    addPlant: 'Pflanze hinzufügen', stepSearch: 'Suchen', stepSelect: 'Auswählen',
    stepConfigure: 'Konfigurieren', searchHint: 'Tippe mindestens 2 Zeichen…',
    back: '← Zurück zur Suche', customName: 'Mein Name für die Pflanze',
    location: 'Standort (optional)', potSize: 'Topfgröße',
    small: 'Klein', medium: 'Mittel', large: 'Groß',
    addPlantConfirm: 'Pflanze hinzufügen', editPlant: 'Pflanze bearbeiten',
    delete: 'Löschen', save: 'Speichern', watered: 'Gegossen ✓',
    waterBtn: '💧 Gießen', healthy: 'Gesund', waterSoon: 'Bald gießen',
    needsWaterStatus: 'Braucht Wasser', water: 'Wasser', locationLabel: 'Standort',
    noResults: 'Keine Pflanzen gefunden.', loading: 'Suche…',
    toastWatered: '💧 Gegossen!', toastAdded: '🌱 Pflanze hinzugefügt!',
    toastDeleted: '🗑 Pflanze gelöscht.', toastSaved: '✓ Gespeichert.',
    searchPlantAPI: 'Pflanze suchen, z.B. Monstera…',
    noWaterInfo: 'Keine Pflegedaten zu dieser Pflanze gefunden. Du kannst sie trotzdem mit eigenen Angaben anlegen.', createCustom: '+ Eigene Pflanze anlegen', wateringNeed: 'Gießbedarf', waterLow: 'Wenig', waterMedium: 'Mittel', waterHigh: 'Viel', recommended: '(empfohlen)', chooseWatering: 'Bitte Gießbedarf auswählen.', lightNeed: 'Lichtbedarf', lightFull: 'Sonnig', lightPart: 'Halbschatten', lightLow: 'Schatten', edit: 'Bearbeiten', lastWatered: 'Zuletzt gegossen', nextWatering: 'Nächstes Gießen', family: 'Familie', winterRest: 'Winterruhe', yes: 'Ja', no: 'Nein', envLabel: 'Standorttyp', envIndoor: 'Drinnen', envOutdoor: 'Draußen', envBoth: 'Drinnen & draußen', addedAt: 'Hinzugefügt am', srcCatalog: 'Katalog', srcUser: 'Eigene Angabe', waterEstimate: 'Schätzwert aus Gießbedarf, Licht, Topfgröße und Jahreszeit – kein Messwert.', undo: 'Rückgängig', toastUndone: '↩ Rückgängig gemacht.', history: 'Verlauf', noHistory: 'Noch kein Gießen erfasst.', avgInterval: 'Ø Gießabstand', everyXDays: 'alle {d} Tage', waterEvent: 'Gegossen', seasonFactor: 'Jahreszeit', footerTagline: 'Pflanzen pflegen, ohne zu raten.', footerLinks: 'Links', footerLegal: 'Rechtliches', footerSupport: 'Unterstützung', footerImprint: 'Impressum', footerPrivacy: 'Datenschutzerklärung', footerTerms: 'Nutzungsbedingungen', footerBuyCoffee: 'Kauf mir einen Kaffee', footerCopyright: '© 2025 Omega Garden. Alle Rechte vorbehalten.', footerPartOf: 'Teil des Omega-Projekts.',
    searchError: 'Fehler beim Laden der Daten. Bitte später erneut versuchen.',
  },
  en: {
    add: 'Add plant', today: 'Today · Need watering',
    noWater: 'All plants are taken care of 🌿', searchPlants: 'Search plants…',
    all: 'All', needsWater: 'Need watering', emptyTitle: 'No plants yet',
    emptySub: 'Add your first plant to get started.',
    addPlant: 'Add plant', stepSearch: 'Search', stepSelect: 'Select',
    stepConfigure: 'Configure', searchHint: 'Type at least 2 characters…',
    back: '← Back to search', customName: 'My name for this plant',
    location: 'Location (optional)', potSize: 'Pot size',
    small: 'Small', medium: 'Medium', large: 'Large',
    addPlantConfirm: 'Add plant', editPlant: 'Edit plant',
    delete: 'Delete', save: 'Save', watered: 'Watered ✓',
    waterBtn: '💧 Water', healthy: 'Healthy', waterSoon: 'Water soon',
    needsWaterStatus: 'Needs water', water: 'Water', locationLabel: 'Location',
    noResults: 'No plants found.', loading: 'Searching…',
    toastWatered: '💧 Watered!', toastAdded: '🌱 Plant added!',
    toastDeleted: '🗑 Plant deleted.', toastSaved: '✓ Saved.',
    searchPlantAPI: 'Search plant, e.g. Monstera…',
    noWaterInfo: 'No care data found for this plant. You can still add it with your own settings.', createCustom: '+ Add custom plant', wateringNeed: 'Watering need', waterLow: 'Low', waterMedium: 'Medium', waterHigh: 'High', recommended: '(recommended)', chooseWatering: 'Please choose a watering need.', lightNeed: 'Light need', lightFull: 'Full sun', lightPart: 'Partial shade', lightLow: 'Shade', edit: 'Edit', lastWatered: 'Last watered', nextWatering: 'Next watering', family: 'Family', winterRest: 'Winter rest', yes: 'Yes', no: 'No', envLabel: 'Environment', envIndoor: 'Indoor', envOutdoor: 'Outdoor', envBoth: 'Indoor & outdoor', addedAt: 'Added', srcCatalog: 'Catalog', srcUser: 'Own setting', waterEstimate: 'Estimate based on watering need, light, pot size and season – not a measurement.', undo: 'Undo', toastUndone: '↩ Undone.', history: 'History', noHistory: 'No watering recorded yet.', avgInterval: 'Avg. interval', everyXDays: 'every {d} days', waterEvent: 'Watered', seasonFactor: 'Season', footerTagline: 'Plant care without the guesswork.', footerLinks: 'Links', footerLegal: 'Legal', footerSupport: 'Support', footerImprint: 'Imprint', footerPrivacy: 'Privacy Policy', footerTerms: 'Terms of Use', footerBuyCoffee: 'Buy me a coffee', footerCopyright: '© 2025 Omega Garden. All rights reserved.', footerPartOf: 'Part of the Omega project.',
    searchError: 'Error loading data. Please try again later.',
  },
  fr: {
    add: 'Ajouter une plante', today: 'Aujourd\'hui · À arroser',
    noWater: 'Toutes les plantes sont arrosées 🌿', searchPlants: 'Rechercher…',
    all: 'Toutes', needsWater: 'À arroser', emptyTitle: 'Aucune plante',
    emptySub: 'Ajoutez votre première plante.', addPlant: 'Ajouter une plante',
    stepSearch: 'Chercher', stepSelect: 'Choisir', stepConfigure: 'Configurer',
    searchHint: 'Tapez au moins 2 caractères…', back: '← Retour',
    customName: 'Mon nom pour cette plante', location: 'Emplacement (optionnel)',
    potSize: 'Taille du pot', small: 'Petit', medium: 'Moyen', large: 'Grand',
    addPlantConfirm: 'Ajouter', editPlant: 'Modifier la plante',
    delete: 'Supprimer', save: 'Enregistrer', watered: 'Arrosée ✓',
    waterBtn: '💧 Arroser', healthy: 'En bonne santé', waterSoon: 'Arroser bientôt',
    needsWaterStatus: 'Besoin d\'eau', water: 'Eau', locationLabel: 'Emplacement',
    noResults: 'Aucune plante trouvée.', loading: 'Recherche…',
    toastWatered: '💧 Arrosée !', toastAdded: '🌱 Plante ajoutée !',
    toastDeleted: '🗑 Plante supprimée.', toastSaved: '✓ Sauvegardé.',
    searchPlantAPI: 'Chercher une plante…', noWaterInfo: 'Aucune donnée d\'entretien trouvée. Vous pouvez quand même l\'ajouter avec vos propres réglages.', createCustom: '+ Ajouter une plante personnalisée', wateringNeed: 'Besoin en eau', waterLow: 'Faible', waterMedium: 'Moyen', waterHigh: 'Élevé', recommended: '(recommandé)', chooseWatering: 'Veuillez choisir un besoin en eau.', lightNeed: 'Besoin en lumière', lightFull: 'Plein soleil', lightPart: 'Mi-ombre', lightLow: 'Ombre', edit: 'Modifier', lastWatered: 'Dernier arrosage', nextWatering: 'Prochain arrosage', family: 'Famille', winterRest: 'Repos hivernal', yes: 'Oui', no: 'Non', envLabel: 'Environnement', envIndoor: 'Intérieur', envOutdoor: 'Extérieur', envBoth: 'Intérieur & extérieur', addedAt: 'Ajoutée le', srcCatalog: 'Catalogue', srcUser: 'Réglage personnel', waterEstimate: 'Estimation basée sur le besoin en eau, la lumière, la taille du pot et la saison – pas une mesure.', undo: 'Annuler', toastUndone: '↩ Annulé.', history: 'Historique', noHistory: 'Aucun arrosage enregistré.', avgInterval: 'Intervalle moyen', everyXDays: 'tous les {d} jours', waterEvent: 'Arrosée', seasonFactor: 'Saison', footerTagline: 'Prendre soin des plantes sans deviner.', footerLinks: 'Liens', footerLegal: 'Mentions légales', footerSupport: 'Soutien', footerImprint: 'Mentions légales', footerPrivacy: 'Politique de confidentialité', footerTerms: 'Conditions d\'utilisation', footerBuyCoffee: 'Offrez-moi un café', footerCopyright: '© 2025 Omega Garden. Tous droits réservés.', footerPartOf: 'Fait partie du projet Omega.',
    searchError: 'Erreur de chargement des données. Réessayez plus tard.',
  },
  es: {
    add: 'Añadir planta', today: 'Hoy · Necesitan agua',
    noWater: 'Todas las plantas están cuidadas 🌿', searchPlants: 'Buscar plantas…',
    all: 'Todas', needsWater: 'Necesitan agua', emptyTitle: 'Sin plantas aún',
    emptySub: 'Añade tu primera planta para empezar.', addPlant: 'Añadir planta',
    stepSearch: 'Buscar', stepSelect: 'Seleccionar', stepConfigure: 'Configurar',
    searchHint: 'Escribe al menos 2 caracteres…', back: '← Volver',
    customName: 'Mi nombre para esta planta', location: 'Ubicación (opcional)',
    potSize: 'Tamaño de maceta', small: 'Pequeño', medium: 'Mediano', large: 'Grande',
    addPlantConfirm: 'Añadir planta', editPlant: 'Editar planta',
    delete: 'Eliminar', save: 'Guardar', watered: 'Regada ✓',
    waterBtn: '💧 Regar', healthy: 'Saludable', waterSoon: 'Regar pronto',
    needsWaterStatus: 'Necesita agua', water: 'Agua', locationLabel: 'Ubicación',
    noResults: 'No se encontraron plantas.', loading: 'Buscando…',
    toastWatered: '💧 ¡Regada!', toastAdded: '🌱 ¡Planta añadida!',
    toastDeleted: '🗑 Planta eliminada.', toastSaved: '✓ Guardado.',
    searchPlantAPI: 'Buscar planta…', noWaterInfo: 'No se encontraron datos de cuidado. Puedes añadirla igualmente con tus propios ajustes.', createCustom: '+ Añadir planta personalizada', wateringNeed: 'Necesidad de riego', waterLow: 'Baja', waterMedium: 'Media', waterHigh: 'Alta', recommended: '(recomendado)', chooseWatering: 'Elige una necesidad de riego.', lightNeed: 'Necesidad de luz', lightFull: 'Pleno sol', lightPart: 'Semisombra', lightLow: 'Sombra', edit: 'Editar', lastWatered: 'Último riego', nextWatering: 'Próximo riego', family: 'Familia', winterRest: 'Reposo invernal', yes: 'Sí', no: 'No', envLabel: 'Entorno', envIndoor: 'Interior', envOutdoor: 'Exterior', envBoth: 'Interior y exterior', addedAt: 'Añadida el', srcCatalog: 'Catálogo', srcUser: 'Ajuste propio', waterEstimate: 'Estimación basada en riego, luz, tamaño de maceta y estación; no es una medición.', undo: 'Deshacer', toastUndone: '↩ Deshecho.', history: 'Historial', noHistory: 'Aún no hay riegos registrados.', avgInterval: 'Intervalo medio', everyXDays: 'cada {d} días', waterEvent: 'Regada', seasonFactor: 'Estación', footerTagline: 'Cuidar plantas sin adivinar.', footerLinks: 'Enlaces', footerLegal: 'Legal', footerSupport: 'Apoyo', footerImprint: 'Aviso legal', footerPrivacy: 'Política de privacidad', footerTerms: 'Términos de uso', footerBuyCoffee: 'Invítame a un café', footerCopyright: '© 2025 Omega Garden. Todos los derechos reservados.', footerPartOf: 'Parte del proyecto Omega.',
    searchError: 'Error al cargar los datos. Inténtalo más tarde.',
  },
  pt: {
    add: 'Adicionar planta', today: 'Hoje · Precisam de água',
    noWater: 'Todas as plantas estão cuidadas 🌿', searchPlants: 'Procurar plantas…',
    all: 'Todas', needsWater: 'Precisam de água', emptyTitle: 'Sem plantas ainda',
    emptySub: 'Adicione a sua primeira planta.', addPlant: 'Adicionar planta',
    stepSearch: 'Pesquisar', stepSelect: 'Selecionar', stepConfigure: 'Configurar',
    searchHint: 'Digite pelo menos 2 caracteres…', back: '← Voltar',
    customName: 'Meu nome para esta planta', location: 'Localização (opcional)',
    potSize: 'Tamanho do vaso', small: 'Pequeno', medium: 'Médio', large: 'Grande',
    addPlantConfirm: 'Adicionar planta', editPlant: 'Editar planta',
    delete: 'Excluir', save: 'Salvar', watered: 'Regada ✓',
    waterBtn: '💧 Regar', healthy: 'Saudável', waterSoon: 'Regar em breve',
    needsWaterStatus: 'Precisa de água', water: 'Água', locationLabel: 'Localização',
    noResults: 'Nenhuma planta encontrada.', loading: 'Pesquisando…',
    toastWatered: '💧 Regada!', toastAdded: '🌱 Planta adicionada!',
    toastDeleted: '🗑 Planta excluída.', toastSaved: '✓ Salvo.',
    searchPlantAPI: 'Pesquisar planta…', noWaterInfo: 'Nenhum dado de cuidado encontrado. Você ainda pode adicioná-la com suas próprias configurações.', createCustom: '+ Adicionar planta personalizada', wateringNeed: 'Necessidade de rega', waterLow: 'Baixa', waterMedium: 'Média', waterHigh: 'Alta', recommended: '(recomendado)', chooseWatering: 'Escolha uma necessidade de rega.', lightNeed: 'Necessidade de luz', lightFull: 'Sol pleno', lightPart: 'Meia-sombra', lightLow: 'Sombra', edit: 'Editar', lastWatered: 'Última rega', nextWatering: 'Próxima rega', family: 'Família', winterRest: 'Repouso de inverno', yes: 'Sim', no: 'Não', envLabel: 'Ambiente', envIndoor: 'Interior', envOutdoor: 'Exterior', envBoth: 'Interior e exterior', addedAt: 'Adicionada em', srcCatalog: 'Catálogo', srcUser: 'Configuração própria', waterEstimate: 'Estimativa baseada na rega, luz, tamanho do vaso e estação – não é uma medição.', undo: 'Desfazer', toastUndone: '↩ Desfeito.', history: 'Histórico', noHistory: 'Nenhuma rega registrada ainda.', avgInterval: 'Intervalo médio', everyXDays: 'a cada {d} dias', waterEvent: 'Regada', seasonFactor: 'Estação', footerTagline: 'Cuidar de plantas sem adivinhar.', footerLinks: 'Links', footerLegal: 'Jurídico', footerSupport: 'Apoio', footerImprint: 'Informação legal', footerPrivacy: 'Política de privacidade', footerTerms: 'Termos de uso', footerBuyCoffee: 'Pague-me um café', footerCopyright: '© 2025 Omega Garden. Todos os direitos reservados.', footerPartOf: 'Parte do projeto Omega.',
    searchError: 'Erro ao carregar dados. Tente novamente mais tarde.',
  },
  it: { add:'Aggiungi pianta',today:'Oggi · Hanno bisogno d\'acqua',noWater:'Tutte le piante sono curate 🌿',searchPlants:'Cerca piante…',all:'Tutte',needsWater:'Hanno bisogno d\'acqua',emptyTitle:'Nessuna pianta',emptySub:'Aggiungi la tua prima pianta.',addPlant:'Aggiungi pianta',stepSearch:'Cerca',stepSelect:'Seleziona',stepConfigure:'Configura',searchHint:'Digita almeno 2 caratteri…',back:'← Indietro',customName:'Il mio nome per questa pianta',location:'Posizione (opzionale)',potSize:'Dimensione vaso',small:'Piccolo',medium:'Medio',large:'Grande',addPlantConfirm:'Aggiungi pianta',editPlant:'Modifica pianta',delete:'Elimina',save:'Salva',watered:'Annaffiata ✓',waterBtn:'💧 Annaffia',healthy:'In salute',waterSoon:'Annaffia presto',needsWaterStatus:'Ha bisogno d\'acqua',water:'Acqua',locationLabel:'Posizione',noResults:'Nessuna pianta trovata.',loading:'Ricerca…',toastWatered:'💧 Annaffiata!',toastAdded:'🌱 Pianta aggiunta!',toastDeleted:'🗑 Pianta eliminata.',toastSaved:'✓ Salvato.',searchPlantAPI:'Cerca pianta…',noWaterInfo:'Nessun dato di cura trovato. Puoi comunque aggiungerla con le tue impostazioni.',createCustom:'+ Aggiungi pianta personalizzata',wateringNeed:'Fabbisogno idrico',waterLow:'Basso',waterMedium:'Medio',waterHigh:'Alto',recommended:'(consigliato)',chooseWatering:'Scegli un fabbisogno idrico.',lightNeed:'Fabbisogno di luce',lightFull:'Pieno sole',lightPart:'Mezz\'ombra',lightLow:'Ombra',edit:'Modifica',lastWatered:'Ultima annaffiatura',nextWatering:'Prossima annaffiatura',family:'Famiglia',winterRest:'Riposo invernale',yes:'Sì',no:'No',envLabel:'Ambiente',envIndoor:'Interno',envOutdoor:'Esterno',envBoth:'Interno ed esterno',addedAt:'Aggiunta il',srcCatalog:'Catalogo',srcUser:'Impostazione propria',waterEstimate:'Stima basata su fabbisogno idrico, luce, dimensione del vaso e stagione – non è una misura.',undo:'Annulla',toastUndone:'↩ Annullato.',history:'Cronologia',noHistory:'Nessuna annaffiatura registrata.',avgInterval:'Intervallo medio',everyXDays:'ogni {d} giorni',waterEvent:'Annaffiata',seasonFactor:'Stagione',footerTagline:'Curare le piante senza indovinare.',footerLinks:'Link',footerLegal:'Note legali',footerSupport:'Supporto',footerImprint:'Note legali',footerPrivacy:'Informativa sulla privacy',footerTerms:'Termini di utilizzo',footerBuyCoffee:'Offrimi un caffè',footerCopyright:'© 2025 Omega Garden. Tutti i diritti riservati.',footerPartOf:'Parte del progetto Omega.',searchError:'Errore nel caricamento dei dati. Riprova più tardi.' },
  nl: { add:'Plant toevoegen',today:'Vandaag · Water nodig',noWater:'Alle planten zijn verzorgd 🌿',searchPlants:'Zoek planten…',all:'Alle',needsWater:'Water nodig',emptyTitle:'Nog geen planten',emptySub:'Voeg je eerste plant toe om te beginnen.',addPlant:'Plant toevoegen',stepSearch:'Zoeken',stepSelect:'Selecteren',stepConfigure:'Configureren',searchHint:'Typ minimaal 2 tekens…',back:'← Terug',customName:'Mijn naam voor deze plant',location:'Locatie (optioneel)',potSize:'Potmaat',small:'Klein',medium:'Medium',large:'Groot',addPlantConfirm:'Plant toevoegen',editPlant:'Plant bewerken',delete:'Verwijderen',save:'Opslaan',watered:'Gegoten ✓',waterBtn:'💧 Gieten',healthy:'Gezond',waterSoon:'Binnenkort gieten',needsWaterStatus:'Heeft water nodig',water:'Water',locationLabel:'Locatie',noResults:'Geen planten gevonden.',loading:'Zoeken…',toastWatered:'💧 Gegoten!',toastAdded:'🌱 Plant toegevoegd!',toastDeleted:'🗑 Plant verwijderd.',toastSaved:'✓ Opgeslagen.',searchPlantAPI:'Plant zoeken…',noWaterInfo:'Geen verzorgingsgegevens gevonden. Je kunt de plant toch toevoegen met eigen instellingen.',createCustom:'+ Eigen plant toevoegen',wateringNeed:'Waterbehoefte',waterLow:'Laag',waterMedium:'Gemiddeld',waterHigh:'Hoog',recommended:'(aanbevolen)',chooseWatering:'Kies een waterbehoefte.',lightNeed:'Lichtbehoefte',lightFull:'Volle zon',lightPart:'Halfschaduw',lightLow:'Schaduw',edit:'Bewerken',lastWatered:'Laatst gegoten',nextWatering:'Volgende gietbeurt',family:'Familie',winterRest:'Winterrust',yes:'Ja',no:'Nee',envLabel:'Omgeving',envIndoor:'Binnen',envOutdoor:'Buiten',envBoth:'Binnen & buiten',addedAt:'Toegevoegd op',srcCatalog:'Catalogus',srcUser:'Eigen instelling',waterEstimate:'Schatting op basis van waterbehoefte, licht, potmaat en seizoen – geen meting.',undo:'Ongedaan maken',toastUndone:'↩ Ongedaan gemaakt.',history:'Geschiedenis',noHistory:'Nog geen gietbeurt vastgelegd.',avgInterval:'Gem. interval',everyXDays:'elke {d} dagen',waterEvent:'Gegoten',seasonFactor:'Seizoen',footerTagline:'Planten verzorgen zonder gokken.',footerLinks:'Links',footerLegal:'Juridisch',footerSupport:'Steun',footerImprint:'Colofon',footerPrivacy:'Privacybeleid',footerTerms:'Gebruiksvoorwaarden',footerBuyCoffee:'Koop een koffie voor me',footerCopyright:'© 2025 Omega Garden. Alle rechten voorbehouden.',footerPartOf:'Onderdeel van het Omega-project.',searchError:'Fout bij het laden van gegevens. Probeer het later opnieuw.' },
  pl: { add:'Dodaj roślinę',today:'Dziś · Wymagają podlewania',noWater:'Wszystkie rośliny są zadbane 🌿',searchPlants:'Szukaj roślin…',all:'Wszystkie',needsWater:'Wymagają wody',emptyTitle:'Brak roślin',emptySub:'Dodaj pierwszą roślinę, aby rozpocząć.',addPlant:'Dodaj roślinę',stepSearch:'Szukaj',stepSelect:'Wybierz',stepConfigure:'Skonfiguruj',searchHint:'Wpisz co najmniej 2 znaki…',back:'← Wróć',customName:'Moja nazwa rośliny',location:'Lokalizacja (opcjonalnie)',potSize:'Rozmiar doniczki',small:'Mała',medium:'Średnia',large:'Duża',addPlantConfirm:'Dodaj roślinę',editPlant:'Edytuj roślinę',delete:'Usuń',save:'Zapisz',watered:'Podlana ✓',waterBtn:'💧 Podlej',healthy:'Zdrowa',waterSoon:'Wkrótce podlej',needsWaterStatus:'Potrzebuje wody',water:'Woda',locationLabel:'Lokalizacja',noResults:'Nie znaleziono roślin.',loading:'Szukam…',toastWatered:'💧 Podlana!',toastAdded:'🌱 Roślina dodana!',toastDeleted:'🗑 Roślina usunięta.',toastSaved:'✓ Zapisano.',searchPlantAPI:'Szukaj rośliny…',noWaterInfo:'Nie znaleziono danych pielęgnacyjnych. Nadal możesz dodać roślinę z własnymi ustawieniami.',createCustom:'+ Dodaj własną roślinę',wateringNeed:'Zapotrzebowanie na wodę',waterLow:'Niskie',waterMedium:'Średnie',waterHigh:'Wysokie',recommended:'(zalecane)',chooseWatering:'Wybierz zapotrzebowanie na wodę.',lightNeed:'Zapotrzebowanie na światło',lightFull:'Pełne słońce',lightPart:'Półcień',lightLow:'Cień',edit:'Edytuj',lastWatered:'Ostatnie podlewanie',nextWatering:'Następne podlewanie',family:'Rodzina',winterRest:'Spoczynek zimowy',yes:'Tak',no:'Nie',envLabel:'Środowisko',envIndoor:'Wewnątrz',envOutdoor:'Na zewnątrz',envBoth:'Wewnątrz i na zewnątrz',addedAt:'Dodano',srcCatalog:'Katalog',srcUser:'Własne ustawienie',waterEstimate:'Szacunek na podstawie zapotrzebowania na wodę, światła, rozmiaru doniczki i pory roku – nie pomiar.',undo:'Cofnij',toastUndone:'↩ Cofnięto.',history:'Historia',noHistory:'Brak zapisanych podlewań.',avgInterval:'Śr. odstęp',everyXDays:'co {d} dni',waterEvent:'Podlano',seasonFactor:'Pora roku',footerTagline:'Pielęgnacja roślin bez zgadywania.',footerLinks:'Linki',footerLegal:'Informacje prawne',footerSupport:'Wsparcie',footerImprint:'Nota prawna',footerPrivacy:'Polityka prywatności',footerTerms:'Warunki korzystania',footerBuyCoffee:'Postaw mi kawę',footerCopyright:'© 2025 Omega Garden. Wszelkie prawa zastrzeżone.',footerPartOf:'Część projektu Omega.',searchError:'Błąd ładowania danych. Spróbuj ponownie później.' },
  ja: { add:'植物を追加',today:'今日・水やりが必要',noWater:'すべての植物は管理済みです 🌿',searchPlants:'植物を検索…',all:'すべて',needsWater:'水やりが必要',emptyTitle:'植物がありません',emptySub:'最初の植物を追加してください。',addPlant:'植物を追加',stepSearch:'検索',stepSelect:'選択',stepConfigure:'設定',searchHint:'2文字以上入力…',back:'← 戻る',customName:'植物の名前',location:'場所（任意）',potSize:'鉢のサイズ',small:'小',medium:'中',large:'大',addPlantConfirm:'植物を追加',editPlant:'植物を編集',delete:'削除',save:'保存',watered:'水やり済み ✓',waterBtn:'💧 水やり',healthy:'健康',waterSoon:'もうすぐ水やり',needsWaterStatus:'水が必要',water:'水',locationLabel:'場所',noResults:'植物が見つかりません。',loading:'検索中…',toastWatered:'💧 水やりしました！',toastAdded:'🌱 植物を追加しました！',toastDeleted:'🗑 植物を削除しました。',toastSaved:'✓ 保存しました。',searchPlantAPI:'植物を検索…',noWaterInfo:'お手入れデータが見つかりません。独自の設定で追加できます。',createCustom:'+ カスタム植物を追加',wateringNeed:'水やりの必要量',waterLow:'少',waterMedium:'中',waterHigh:'多',recommended:'（おすすめ）',chooseWatering:'水やりの必要量を選択してください。',lightNeed:'日照の必要量',lightFull:'日なた',lightPart:'半日陰',lightLow:'日陰',edit:'編集',lastWatered:'最後の水やり',nextWatering:'次の水やり',family:'科',winterRest:'冬の休眠',yes:'はい',no:'いいえ',envLabel:'環境',envIndoor:'屋内',envOutdoor:'屋外',envBoth:'屋内・屋外',addedAt:'追加日',srcCatalog:'カタログ',srcUser:'独自設定',waterEstimate:'水やり・日照・鉢のサイズ・季節からの推定値（測定値ではありません）。',undo:'元に戻す',toastUndone:'↩ 取り消しました。',history:'履歴',noHistory:'水やりの記録はまだありません。',avgInterval:'平均間隔',everyXDays:'{d}日ごと',waterEvent:'水やり',seasonFactor:'季節',footerTagline:'推測に頼らない植物のお手入れ。',footerLinks:'リンク',footerLegal:'法的情報',footerSupport:'サポート',footerImprint:'運営者情報',footerPrivacy:'プライバシーポリシー',footerTerms:'利用規約',footerBuyCoffee:'コーヒーをおごる',footerCopyright:'© 2025 Omega Garden. 無断転載を禁じます。',footerPartOf:'Omega プロジェクトの一部です。',searchError:'データの読み込みに失敗しました。後でもう一度お試しください。' },
  zh: { add:'添加植物',today:'今天・需要浇水',noWater:'所有植物都已照料好 🌿',searchPlants:'搜索植物…',all:'全部',needsWater:'需要浇水',emptyTitle:'还没有植物',emptySub:'添加您的第一株植物以开始。',addPlant:'添加植物',stepSearch:'搜索',stepSelect:'选择',stepConfigure:'配置',searchHint:'请输入至少2个字符…',back:'← 返回',customName:'我给这株植物起的名字',location:'位置（可选）',potSize:'花盆大小',small:'小',medium:'中',large:'大',addPlantConfirm:'添加植物',editPlant:'编辑植物',delete:'删除',save:'保存',watered:'已浇水 ✓',waterBtn:'💧 浇水',healthy:'健康',waterSoon:'即将浇水',needsWaterStatus:'需要浇水',water:'水',locationLabel:'位置',noResults:'未找到植物。',loading:'搜索中…',toastWatered:'💧 已浇水！',toastAdded:'🌱 植物已添加！',toastDeleted:'🗑 植物已删除。',toastSaved:'✓ 已保存。',searchPlantAPI:'搜索植物…',noWaterInfo:'未找到养护数据。您仍可以使用自己的设置添加。',createCustom:'+ 添加自定义植物',wateringNeed:'需水量',waterLow:'少',waterMedium:'中',waterHigh:'多',recommended:'（推荐）',chooseWatering:'请选择需水量。',lightNeed:'光照需求',lightFull:'全日照',lightPart:'半阴',lightLow:'阴凉',edit:'编辑',lastWatered:'上次浇水',nextWatering:'下次浇水',family:'科',winterRest:'冬季休眠',yes:'是',no:'否',envLabel:'环境',envIndoor:'室内',envOutdoor:'室外',envBoth:'室内和室外',addedAt:'添加于',srcCatalog:'目录',srcUser:'自定义设置',waterEstimate:'根据需水量、光照、花盆大小和季节估算，并非实测值。',undo:'撤销',toastUndone:'↩ 已撤销。',history:'历史记录',noHistory:'尚无浇水记录。',avgInterval:'平均间隔',everyXDays:'每 {d} 天',waterEvent:'已浇水',seasonFactor:'季节',footerTagline:'无需猜测的植物养护。',footerLinks:'链接',footerLegal:'法律信息',footerSupport:'支持',footerImprint:'版本说明',footerPrivacy:'隐私政策',footerTerms:'使用条款',footerBuyCoffee:'请我喝杯咖啡',footerCopyright:'© 2025 Omega Garden. 保留所有权利。',footerPartOf:'Omega 项目的一部分。',searchError:'加载数据失败，请稍后重试。' },
};

/* ── App state ────────────────────────────────────────── */
let state = {
  plants: [],
  careEvents: [], // source of truth for care history; plant.lastWateredAt is a derived cache
  lang: 'de',
  filter: 'all',
  searchQuery: '',
  currentStep: 1,
  selectedPlant: null,
  searchResults: [],
  editingPlantId: null,
  editingRecommended: null, // { water, light } from the catalog while editing
  detailPlantId: null,
};

/* ── LocalStorage ─────────────────────────────────────── */
const STORAGE_KEY    = 'omega_garden_v1';
const BACKUP_KEY     = 'omega_garden_v1_backup';
const SCHEMA_VERSION = 2;
// Written by the Omega hub and every app, so one language choice applies everywhere
const SHARED_LANG_KEY = 'omega_lang';

function readSharedLang() {
  try {
    const lang = localStorage.getItem(SHARED_LANG_KEY);
    return lang && TRANSLATIONS[lang] ? lang : null;
  } catch(_) { return null; }
}

function writeSharedLang(lang) {
  try { localStorage.setItem(SHARED_LANG_KEY, lang); } catch(_) {}
}

function loadFromStorage() {
  let raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    state.plants     = Array.isArray(saved.plants)     ? saved.plants     : [];
    state.careEvents = Array.isArray(saved.careEvents) ? saved.careEvents : [];
    state.lang       = saved.lang || 'de';
    if (!(saved.schemaVersion >= SCHEMA_VERSION)) migrateToV2(raw);
  } catch(e) {
    console.warn('Storage read error', e);
    // Keep the unreadable data instead of overwriting it on the next save
    if (raw) { try { localStorage.setItem(BACKUP_KEY, raw); } catch(_) {} }
  }
}

// v1 kept only the latest watering per plant; turn it into the first care event
function migrateToV2(raw) {
  try { localStorage.setItem(BACKUP_KEY, raw); } catch(e) { console.warn('Backup failed', e); }
  if (!state.careEvents.length) {
    state.careEvents = state.plants
      .map(p => ({ id: uid(), plantId: p.id, type: 'water', at: p.lastWateredAt || p.addedAt }))
      .filter(ev => ev.at);
  }
  saveToStorage();
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      schemaVersion: SCHEMA_VERSION,
      plants:        state.plants,
      careEvents:    state.careEvents,
      lang:          state.lang,
    }));
  } catch(e) { console.warn('Storage write error', e); }
}

/* ── Care events ──────────────────────────────────────── */
function plantEvents(plantId, type = 'water') {
  return state.careEvents
    .filter(ev => ev.plantId === plantId && ev.type === type)
    .sort((a, b) => a.at.localeCompare(b.at));
}

// Events are the source of truth; lastWateredAt mirrors the newest one so that
// rendering does not have to scan the whole event list on every frame.
function syncWateredCache(plant) {
  const events = plantEvents(plant.id);
  plant.lastWateredAt = events.length ? events[events.length - 1].at : plant.addedAt;
}

function addCareEvent(plant, type = 'water', at = new Date().toISOString()) {
  state.careEvents.push({ id: uid(), plantId: plant.id, type, at });
  syncWateredCache(plant);
  plant.updatedAt = new Date().toISOString();
}

function undoLastCareEvent(plantId) {
  const events = plantEvents(plantId);
  if (!events.length) return false;
  const newest = events[events.length - 1];
  state.careEvents = state.careEvents.filter(ev => ev.id !== newest.id);
  const plant = state.plants.find(p => p.id === plantId);
  if (plant) syncWateredCache(plant);
  return true;
}

// Average days between waterings; null until there are at least two events
function averageInterval(plantId) {
  const events = plantEvents(plantId);
  if (events.length < 2) return null;
  const first = new Date(events[0].at).getTime();
  const last  = new Date(events[events.length - 1].at).getTime();
  return (last - first) / DAY_MS / (events.length - 1);
}

/* ── i18n ────────────────────────────────────────────── */
function t(key) {
  return (TRANSLATIONS[state.lang] || TRANSLATIONS['de'])[key] || key;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.getElementById('lang-select').value = state.lang;
  document.documentElement.lang = state.lang;
}

/* ── Water engine ─────────────────────────────────────── */
const DAY_MS     = 24 * 60 * 60 * 1000;
const BASE_DECAY = { low: 5, medium: 10, high: 18 };
const LIGHT_ADJ  = { 'full sun': 2, 'part shade': 0, 'low light': -1 };
const SIZE_MULT  = { small: 1.3, medium: 1.0, large: 0.75 };

// Seasonal factor per month (Jan..Dec), northern hemisphere: less light and
// slower growth in winter means less water. Plants with a dormant period
// (catalog flag winterRest) are reduced more strongly than evergreen ones.
const SEASON_FACTOR = {
  rest:   [0.60, 0.60, 0.75, 0.90, 1.00, 1.10, 1.10, 1.10, 1.00, 0.85, 0.70, 0.60],
  active: [0.85, 0.85, 0.90, 0.95, 1.00, 1.05, 1.05, 1.05, 1.00, 0.95, 0.90, 0.85],
};

// Winter rest is a catalog fact, looked up instead of copied onto the plant.
// Until the catalog is loaded every plant is treated as evergreen.
function hasWinterRest(plant) {
  if (!plant.catalogId || !catalogById) return false;
  return catalogById.get(plant.catalogId)?.winterRest === true;
}

function getSeasonFactor(plant, at = Date.now()) {
  return SEASON_FACTOR[hasWinterRest(plant) ? 'rest' : 'active'][new Date(at).getMonth()];
}

function getDailyDecay(plant, at = Date.now()) {
  const base   = BASE_DECAY[plant.wateringNeed] || 10;
  const light  = LIGHT_ADJ[plant.lightNeed]     ?? 0;
  const size   = SIZE_MULT[plant.potSize]        || 1.0;
  const season = getSeasonFactor(plant, at);
  return Math.min(25, Math.max(1, (base + light) * size * season));
}

function getCurrentWaterLevel(plant) {
  const ms = Date.now() - new Date(plant.lastWateredAt).getTime();
  const days = ms / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.round(plant.waterLevel - getDailyDecay(plant) * days));
}

function getStatus(level) {
  if (level >= 60) return 'healthy';
  if (level >= 30) return 'soon';
  return 'urgent';
}

function getStatusLabel(level) {
  if (level >= 60) return t('healthy');
  if (level >= 30) return t('waterSoon');
  return t('needsWaterStatus');
}

/* ── Unique ID ────────────────────────────────────────── */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ── Render ───────────────────────────────────────────── */
function renderAll() {
  applyI18n();
  renderTodayStrip();
  renderGrid();
}

function renderTodayStrip() {
  const strip = document.getElementById('today-strip');
  const badge = document.getElementById('today-count');

  const urgent = state.plants.filter(p => {
    const lv = getCurrentWaterLevel(p);
    return lv < 60;
  });

  badge.textContent = urgent.length || '';
  badge.setAttribute('data-count', urgent.length);

  if (urgent.length === 0) {
    strip.innerHTML = `<p class="empty-today">${t('noWater')}</p>`;
    return;
  }

  strip.innerHTML = urgent.map(p => {
    const lv = getCurrentWaterLevel(p);
    const status = getStatus(lv);
    return `
      <div class="today-card" data-id="${p.id}" title="${p.customName}">
        <div class="today-card-name">${esc(p.customName)}</div>
        <div class="today-card-species">${esc(p.species)}</div>
        <div class="water-bar-track" style="margin-top:6px">
          <div class="water-bar-fill" data-level="${lv >= 60 ? 'high' : lv >= 30 ? 'medium' : 'low'}" style="width:${lv}%"></div>
        </div>
        <div class="status-badge status-badge--${status}" style="margin-top:6px;font-size:10px">
          <span class="status-dot"></span>${getStatusLabel(lv)}
        </div>
      </div>`;
  }).join('');

  strip.querySelectorAll('.today-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      document.querySelector(`.plant-card[data-id="${id}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

function renderGrid() {
  const grid  = document.getElementById('plant-grid');
  const empty = document.getElementById('empty-state');
  const q     = state.searchQuery.toLowerCase();

  let plants = [...state.plants];

  if (state.filter === 'today') {
    plants = plants.filter(p => getCurrentWaterLevel(p) < 60);
  }
  if (q) {
    plants = plants.filter(p =>
      p.customName.toLowerCase().includes(q) ||
      p.species.toLowerCase().includes(q)
    );
  }

  if (state.plants.length === 0) {
    grid.innerHTML = '';
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  if (!plants.length) {
    grid.innerHTML = `<p class="search-hint grid-no-results">${esc(t('noResults'))}</p>`;
    return;
  }

  grid.innerHTML = plants.map(p => {
    const lv     = getCurrentWaterLevel(p);
    const status = getStatus(lv);
    const barLev = lv >= 60 ? 'high' : lv >= 30 ? 'medium' : 'low';

    const imgHtml = p.imageUrl
      ? `<img class="card-image" src="${esc(p.imageUrl)}" alt="${esc(p.customName)}" loading="lazy" />`
      : `<div class="card-image-placeholder">🌿</div>`;

    const locHtml = p.location
      ? `<div class="card-location">
           <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
             <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5c0 2.5-3.5 6.5-3.5 6.5S2.5 7 2.5 4.5A3.5 3.5 0 0 1 6 1z" stroke="currentColor" stroke-width="1.1"/>
             <circle cx="6" cy="4.5" r="1" fill="currentColor"/>
           </svg>
           ${esc(p.location)}
         </div>`
      : '';

    return `
      <article class="plant-card" data-id="${p.id}" tabindex="0" role="button" aria-label="${esc(p.customName)}">
        ${imgHtml}
        <div class="card-body">
          <div class="card-name">${esc(p.customName)}</div>
          <div class="card-species">${esc(p.species)}</div>
          ${locHtml}
          ${careChipsHtml(p)}
          <div class="water-bar-wrap">
            <div class="water-bar-label">
              <span>${t('water')}</span>
              <span>${lv}%</span>
            </div>
            <div class="water-bar-track">
              <div class="water-bar-fill" data-level="${barLev}" style="width:${lv}%"></div>
            </div>
          </div>
          <div class="status-badge status-badge--${status}">
            <span class="status-dot"></span>
            ${getStatusLabel(lv)}
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-water" data-id="${p.id}">
            💧 ${t('waterBtn').replace('💧 ', '')}
          </button>
          <button class="btn-card-edit" data-id="${p.id}" aria-label="Edit">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </article>`;
  }).join('');

  // Water buttons
  grid.querySelectorAll('.btn-water').forEach(btn => {
    btn.addEventListener('click', () => waterPlant(btn.getAttribute('data-id')));
  });

  // Edit buttons
  grid.querySelectorAll('.btn-card-edit').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.getAttribute('data-id')));
  });

  // Card click → details (buttons inside the card keep their own action)
  grid.querySelectorAll('.plant-card').forEach(card => {
    const id = card.getAttribute('data-id');
    card.addEventListener('click', e => {
      if (!e.target.closest('button')) openDetailModal(id);
    });
    card.addEventListener('keydown', e => {
      if (e.target === card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openDetailModal(id);
      }
    });
  });
}

function careChipsHtml(p) {
  const chips = [];
  if (p.wateringNeed) chips.push(`<span class="care-chip">💧 ${esc(t(WATER_LABEL_KEYS[p.wateringNeed]))}</span>`);
  if (p.lightNeed)    chips.push(`<span class="care-chip">${LIGHT_ICONS[p.lightNeed]} ${esc(t(LIGHT_LABEL_KEYS[p.lightNeed]))}</span>`);
  return chips.length ? `<div class="card-care">${chips.join('')}</div>` : '';
}

/* ── Water action ─────────────────────────────────────── */
function waterPlant(id) {
  const plant = state.plants.find(p => p.id === id);
  if (!plant) return;
  plant.waterLevel = 100;
  addCareEvent(plant, 'water');
  saveToStorage();
  renderAll();
  showToast(t('toastWatered'), { label: t('undo'), run: () => undoWatering(id) });
}

function undoWatering(id) {
  if (!undoLastCareEvent(id)) return;
  saveToStorage();
  renderAll();
  if (state.detailPlantId === id) openDetailModal(id);
  showToast(t('toastUndone'));
}

/* ── Plant catalog (data/plants.json) ─────────────────── */
const CATALOG_URL  = 'data/plants.json';
const RANK_ORDER   = { species: 0, genus: 1, family: 2 };
const MAX_RESULTS  = 8;
const WATER_LEVELS = ['low', 'medium', 'high'];
const WATER_LABEL_KEYS = { low: 'waterLow', medium: 'waterMedium', high: 'waterHigh' };
const LIGHT_LEVELS = ['full sun', 'part shade', 'low light'];
const LIGHT_LABEL_KEYS = { 'full sun': 'lightFull', 'part shade': 'lightPart', 'low light': 'lightLow' };
const LIGHT_ICONS  = { 'full sun': '☀️', 'part shade': '⛅', 'low light': '☁️' };
const ENV_LABEL_KEYS = { indoor: 'envIndoor', outdoor: 'envOutdoor', both: 'envBoth' };
let catalogPromise = null;

let catalogById = null; // id → entry, set once the catalog is loaded (sync lookups)

function findCatalogEntry(catalogId) {
  if (!catalogId) return Promise.resolve(null);
  return loadCatalog()
    .then(index => index.find(i => i.entry.id === catalogId)?.entry || null)
    .catch(() => null);
}

// Lowercase, ß→ss, strip accents, umlaut spellings (ü/ue→u), punctuation → space
function normalizeTerm(str) {
  return String(str).toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ae/g, 'a').replace(/oe/g, 'o').replace(/ue/g, 'u')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Loaded once, then kept in memory with pre-normalized search keys
function loadCatalog() {
  if (!catalogPromise) {
    catalogPromise = fetch(CATALOG_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => data.plants.map(entry => ({
        entry,
        keys: [
          entry.scientificName,
          ...(entry.synonyms || []),
          ...(entry.names.de || []),
          ...(entry.names.en || []),
        ].map(normalizeTerm),
      })))
      .then(index => {
        catalogById = new Map(index.map(item => [item.entry.id, item.entry]));
        return index;
      })
      .catch(err => {
        catalogPromise = null;
        throw err;
      });
  }
  return catalogPromise;
}

function matchScore(key, q) {
  if (key === q) return 0;
  if (key.startsWith(q)) return 1;
  if (key.split(' ').some(word => word.startsWith(q))) return 2;
  if (key.includes(q)) return 3;
  return Infinity;
}

function searchIndex(index, q) {
  if (q.length < 2) return [];
  const hits = [];
  for (const item of index) {
    const score = Math.min(...item.keys.map(k => matchScore(k, q)));
    if (score !== Infinity) hits.push({ entry: item.entry, score });
  }
  return hits
    .sort((a, b) => a.score - b.score
      || RANK_ORDER[a.entry.rank] - RANK_ORDER[b.entry.rank]
      || a.entry.scientificName.localeCompare(b.entry.scientificName))
    .slice(0, MAX_RESULTS)
    .map(hit => hit.entry);
}

function searchCatalog(index, query) {
  const q = normalizeTerm(query);
  let hits = searchIndex(index, q);
  // Unknown cultivar/species ("Philodendron Birkin") → fall back to the genus
  if (!hits.length && q.includes(' ')) hits = searchIndex(index, q.split(' ')[0]);
  return hits;
}

function catalogDisplayName(entry) {
  const names = entry.names[state.lang] || entry.names.en || entry.names.de || [];
  return names[0] || entry.scientificName;
}

function catalogToSelection(entry) {
  return {
    catalogId:      entry.id,
    commonName:     catalogDisplayName(entry),
    scientificName: entry.scientificName,
    wateringNeed:   entry.wateringNeed,
    lightNeed:      entry.lightNeed,
  };
}

function renderChoiceOptions(containerId, inputName, levels, labelKeys, selected, recommended) {
  document.getElementById(containerId).innerHTML = levels.map(level => `
    <label class="radio-option">
      <input type="radio" name="${inputName}" value="${level}"${level === selected ? ' checked' : ''} />
      <span>${esc(t(labelKeys[level]))}${level === recommended
        ? ` <small class="recommended-tag">${esc(t('recommended'))}</small>` : ''}</span>
    </label>`).join('');
}

function renderWateringOptions(containerId, inputName, selected, recommended) {
  renderChoiceOptions(containerId, inputName, WATER_LEVELS, WATER_LABEL_KEYS, selected, recommended);
}

function renderLightOptions(containerId, inputName, selected, recommended) {
  renderChoiceOptions(containerId, inputName, LIGHT_LEVELS, LIGHT_LABEL_KEYS, selected, recommended);
}

// 'catalog' = recommended value kept, 'user' = own choice, null = not set
function valueSource(value, recommended) {
  if (!value) return null;
  return value === recommended ? 'catalog' : 'user';
}

/* ── Add plant modal ──────────────────────────────────── */
let searchDebounce = null;
let searchSeq = 0;

function openAddModal() {
  state.currentStep = 1;
  state.selectedPlant = null;
  state.searchResults = [];
  loadCatalog().catch(() => {}); // preload; errors are shown on search
  document.getElementById('api-search-input').value = '';
  document.getElementById('input-custom-name').value = '';
  document.getElementById('input-location').value = '';
  document.querySelector('input[name="pot-size"][value="medium"]').checked = true;
  document.getElementById('search-results').innerHTML =
    `<p class="search-hint">${t('searchHint')}</p>`;
  setStep(1);
  document.getElementById('modal-backdrop').hidden = false;
  document.getElementById('api-search-input').focus();
}

function closeAddModal() {
  document.getElementById('modal-backdrop').hidden = true;
}

function setStep(n) {
  state.currentStep = n;
  [1, 2, 3].forEach(i => {
    const stepEl = document.getElementById(`step-${i}`);
    const indEl  = document.querySelector(`.step[data-step="${i}"]`);
    if (stepEl) stepEl.classList.toggle('hidden', i !== n);
    if (indEl) {
      indEl.classList.toggle('active', i === n);
      indEl.classList.toggle('done',   i < n);
    }
  });
}

/* Catalog search (data/plants.json) */
async function doCatalogSearch(query) {
  const results = document.getElementById('search-results');
  const seq = ++searchSeq;
  state.searchResults = [];

  if (query.length < 2) {
    results.innerHTML = `<p class="search-hint">${t('searchHint')}</p>`;
    return;
  }

  results.innerHTML = `<p class="search-loader">${t('loading')}</p>`;
  const customBtn = `
    <div class="search-custom">
      <button type="button" class="btn-ghost btn-sm" id="btn-custom-plant">${esc(t('createCustom'))}</button>
    </div>`;

  let index;
  try {
    index = await loadCatalog();
  } catch (err) {
    if (seq !== searchSeq) return;
    results.innerHTML = `<p class="search-hint" style="color:var(--red-text)">${t('searchError')}</p>${customBtn}`;
    bindCustomPlantButton(query);
    console.error('Catalog load error', err);
    return;
  }
  if (seq !== searchSeq) return; // a newer search has started

  state.searchResults = searchCatalog(index, query).map(catalogToSelection);

  if (!state.searchResults.length) {
    results.innerHTML = `<p class="search-hint">${esc(t('noWaterInfo'))}</p>${customBtn}`;
    bindCustomPlantButton(query);
    return;
  }

  results.innerHTML = state.searchResults.map((plant, i) => `
    <div class="search-result-item" data-index="${i}">
      <div class="result-thumb-placeholder">🌿</div>
      <div class="result-info">
        <div class="result-name">${esc(plant.commonName)}</div>
        <div class="result-sci">${esc(plant.scientificName)}</div>
      </div>
      <span class="result-water-badge">💧 ${esc(t(WATER_LABEL_KEYS[plant.wateringNeed]))}</span>
    </div>`).join('') + customBtn;

  results.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () =>
      selectPlant(state.searchResults[Number(item.getAttribute('data-index'))]));
  });
  bindCustomPlantButton(query);
}

function bindCustomPlantButton(query) {
  document.getElementById('btn-custom-plant').addEventListener('click', () => selectPlant({
    catalogId:      null,
    commonName:     query,
    scientificName: '',
    wateringNeed:   null,
    lightNeed:      null,
  }));
}

function selectPlant(plant) {
  state.selectedPlant = plant;

  const preview = document.getElementById('selected-preview');
  preview.innerHTML = `
    <div style="width:56px;height:56px;background:var(--bg-3);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:28px">🌿</div>
    <div class="selected-plant-info">
      <div class="name">${esc(plant.commonName)}</div>
      <div class="sci">${esc(plant.scientificName || '')}</div>
    </div>`;

  // Pre-fill custom name with common name
  document.getElementById('input-custom-name').value = plant.commonName || '';

  // Catalog value is preselected and marked; custom entries must choose explicitly
  renderWateringOptions('water-need-group', 'water-need', plant.wateringNeed, plant.wateringNeed);
  renderLightOptions('light-need-group', 'light-need', plant.lightNeed, plant.lightNeed);
  const hint = document.getElementById('water-need-hint');
  hint.classList.toggle('hidden', !!plant.wateringNeed);
  hint.classList.remove('form-hint--error');

  setStep(3);
}

function confirmAddPlant() {
  const customName   = document.getElementById('input-custom-name').value.trim();
  const location     = document.getElementById('input-location').value.trim();
  const potSize      = document.querySelector('input[name="pot-size"]:checked')?.value || 'medium';
  const wateringNeed = document.querySelector('input[name="water-need"]:checked')?.value;
  const lightNeed    = document.querySelector('input[name="light-need"]:checked')?.value || null;
  const p            = state.selectedPlant;

  if (!customName) {
    document.getElementById('input-custom-name').focus();
    return;
  }
  if (!wateringNeed) {
    const hint = document.getElementById('water-need-hint');
    hint.classList.remove('hidden');
    hint.classList.add('form-hint--error');
    return;
  }

  const plant = {
    id:              uid(),
    customName,
    species:         p.commonName      || '',
    scientificName:  p.scientificName  || '',
    catalogId:       p.catalogId       || null,
    imageUrl:        null,
    location:        location          || null,
    wateringNeed,
    // 'catalog' = recommended value kept, 'user' = own choice (custom entry or override)
    wateringSource:  valueSource(wateringNeed, p.wateringNeed),
    lightNeed,
    lightSource:     valueSource(lightNeed, p.lightNeed),
    potSize,
    waterLevel:      100,
    lastWateredAt:   new Date().toISOString(),
    addedAt:         new Date().toISOString(),
    updatedAt:       new Date().toISOString(),
  };

  state.plants.unshift(plant);
  addCareEvent(plant, 'water', plant.addedAt);
  saveToStorage();
  closeAddModal();
  renderAll();
  showToast(t('toastAdded'));
}

/* ── Detail modal ─────────────────────────────────────── */
const NEEDS_WATER_LEVEL = 30; // below this the status is "needs water"
const MAX_HISTORY       = 10; // newest entries shown in the detail view

function relativeDays(days) {
  return new Intl.RelativeTimeFormat(state.lang, { numeric: 'auto' }).format(days, 'day');
}

function formatDate(iso) {
  return iso ? new Date(iso).toLocaleDateString(state.lang, { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
}

function detailRow(label, value, source) {
  const tag = source
    ? ` <small class="recommended-tag recommended-tag--inline">${esc(t(source === 'catalog' ? 'srcCatalog' : 'srcUser'))}</small>`
    : '';
  return `<div class="detail-row"><dt>${esc(label)}</dt><dd>${value}${tag}</dd></div>`;
}

function renderDetail(plant, entry) {
  const lv     = getCurrentWaterLevel(plant);
  const status = getStatus(lv);
  const barLev = lv >= 60 ? 'high' : lv >= 30 ? 'medium' : 'low';

  const sinceDays = Math.floor((Date.now() - new Date(plant.lastWateredAt).getTime()) / DAY_MS);
  const untilDays = Math.max(0, Math.ceil((lv - NEEDS_WATER_LEVEL) / getDailyDecay(plant)));

  const imgHtml = plant.imageUrl
    ? `<img class="card-image detail-image" src="${esc(plant.imageUrl)}" alt="${esc(plant.customName)}" />`
    : `<div class="card-image-placeholder detail-image">🌿</div>`;

  const lightValue = plant.lightNeed
    ? `${LIGHT_ICONS[plant.lightNeed]} ${esc(t(LIGHT_LABEL_KEYS[plant.lightNeed]))}` : '—';
  const waterValue = plant.wateringNeed
    ? `💧 ${esc(t(WATER_LABEL_KEYS[plant.wateringNeed]))}` : '—';

  const catalogRows = entry ? [
    detailRow(t('family'), `<em>${esc(entry.family)}</em>`),
    detailRow(t('envLabel'), esc(t(ENV_LABEL_KEYS[entry.environment]) || '—')),
    detailRow(t('winterRest'), esc(t(entry.winterRest ? 'yes' : 'no'))),
  ].join('') : '';

  const season    = getSeasonFactor(plant);
  const seasonRow = season === 1 ? '' : detailRow(
    t('seasonFactor'),
    `${season > 1 ? '+' : ''}${Math.round((season - 1) * 100)} %`
  );

  const avg    = averageInterval(plant.id);
  const avgRow = avg === null ? '' : detailRow(t('avgInterval'), esc(t('everyXDays').replace('{d}', Math.round(avg))));

  const events   = plantEvents(plant.id).slice(-MAX_HISTORY).reverse();
  const historyHtml = events.length
    ? `<ul class="detail-history">${events.map(ev =>
        `<li><span class="history-icon">💧</span><span>${esc(t('waterEvent'))}</span><time>${esc(formatDate(ev.at))}</time></li>`
      ).join('')}</ul>`
    : `<p class="form-hint">${esc(t('noHistory'))}</p>`;

  document.getElementById('detail-modal-title').textContent = plant.customName;
  document.getElementById('detail-body').innerHTML = `
    ${imgHtml}
    <div class="detail-names">
      ${plant.species ? `<div class="detail-species">${esc(plant.species)}</div>` : ''}
      ${plant.scientificName ? `<div class="detail-sci">${esc(plant.scientificName)}</div>` : ''}
    </div>
    <div class="water-bar-wrap">
      <div class="water-bar-label"><span>${t('water')}</span><span>${lv}%</span></div>
      <div class="water-bar-track">
        <div class="water-bar-fill" data-level="${barLev}" style="width:${lv}%"></div>
      </div>
    </div>
    <div class="status-badge status-badge--${status}"><span class="status-dot"></span>${getStatusLabel(lv)}</div>
    <p class="form-hint">${esc(t('waterEstimate'))}</p>
    <dl class="detail-list">
      ${detailRow(t('lastWatered'), `${esc(relativeDays(-sinceDays))} · ${esc(formatDate(plant.lastWateredAt))}`)}
      ${detailRow(t('nextWatering'), esc(relativeDays(untilDays)))}
      ${detailRow(t('wateringNeed'), waterValue, plant.wateringSource)}
      ${detailRow(t('lightNeed'), lightValue, plant.lightSource)}
      ${seasonRow}
      ${avgRow}
      ${detailRow(t('potSize'), esc(t(plant.potSize || 'medium')))}
      ${detailRow(t('locationLabel'), esc(plant.location) || '—')}
      ${catalogRows}
      ${detailRow(t('addedAt'), esc(formatDate(plant.addedAt)))}
    </dl>
    <h3 class="detail-section-title">${esc(t('history'))}</h3>
    ${historyHtml}`;
}

function openDetailModal(id) {
  const plant = state.plants.find(p => p.id === id);
  if (!plant) return;
  state.detailPlantId = id;
  renderDetail(plant, null);
  document.getElementById('detail-modal-backdrop').hidden = false;
  // Catalog facts (family, environment, winter rest) are looked up, not stored on the plant
  findCatalogEntry(plant.catalogId).then(entry => {
    if (entry && state.detailPlantId === id) renderDetail(plant, entry);
  });
}

function closeDetailModal() {
  document.getElementById('detail-modal-backdrop').hidden = true;
  state.detailPlantId = null;
}

/* ── Edit modal ───────────────────────────────────────── */
function openEditModal(id) {
  const plant = state.plants.find(p => p.id === id);
  if (!plant) return;
  state.editingPlantId = id;

  document.getElementById('edit-custom-name').value = plant.customName;
  document.getElementById('edit-location').value    = plant.location || '';
  const ps = plant.potSize || 'medium';
  document.querySelector(`input[name="edit-pot-size"][value="${ps}"]`).checked = true;

  // Render immediately, then mark the catalog recommendations once the catalog is loaded
  state.editingRecommended = { water: null, light: null };
  renderWateringOptions('edit-water-need-group', 'edit-water-need', plant.wateringNeed || 'medium', null);
  renderLightOptions('edit-light-need-group', 'edit-light-need', plant.lightNeed, null);
  findCatalogEntry(plant.catalogId).then(entry => {
    if (!entry || state.editingPlantId !== id) return;
    state.editingRecommended = { water: entry.wateringNeed, light: entry.lightNeed };
    const water = document.querySelector('input[name="edit-water-need"]:checked')?.value;
    const light = document.querySelector('input[name="edit-light-need"]:checked')?.value;
    renderWateringOptions('edit-water-need-group', 'edit-water-need', water, entry.wateringNeed);
    renderLightOptions('edit-light-need-group', 'edit-light-need', light, entry.lightNeed);
  });

  document.getElementById('edit-modal-backdrop').hidden = false;
}

function closeEditModal() {
  document.getElementById('edit-modal-backdrop').hidden = true;
  state.editingPlantId = null;
  state.editingRecommended = null;
}

function saveEdit() {
  const plant = state.plants.find(p => p.id === state.editingPlantId);
  if (!plant) return;
  plant.customName = document.getElementById('edit-custom-name').value.trim() || plant.customName;
  plant.location   = document.getElementById('edit-location').value.trim() || null;
  plant.potSize    = document.querySelector('input[name="edit-pot-size"]:checked')?.value || 'medium';
  const wateringNeed = document.querySelector('input[name="edit-water-need"]:checked')?.value;
  if (wateringNeed && wateringNeed !== plant.wateringNeed) {
    plant.wateringNeed   = wateringNeed;
    plant.wateringSource = valueSource(wateringNeed, state.editingRecommended?.water);
  }
  const lightNeed = document.querySelector('input[name="edit-light-need"]:checked')?.value;
  if (lightNeed && lightNeed !== plant.lightNeed) {
    plant.lightNeed   = lightNeed;
    plant.lightSource = valueSource(lightNeed, state.editingRecommended?.light);
  }
  plant.updatedAt  = new Date().toISOString();
  saveToStorage();
  closeEditModal();
  renderAll();
  showToast(t('toastSaved'));
}

function deletePlant() {
  const id = state.editingPlantId;
  if (!id) return;
  state.plants     = state.plants.filter(p => p.id !== id);
  state.careEvents = state.careEvents.filter(ev => ev.plantId !== id);
  saveToStorage();
  closeEditModal();
  renderAll();
  showToast(t('toastDeleted'));
}

/* ── Toast ────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg, action) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  if (action) {
    const btn = document.createElement('button');
    btn.className = 'toast-action';
    btn.textContent = action.label;
    btn.addEventListener('click', () => {
      el.classList.remove('show');
      action.run();
    });
    el.appendChild(btn);
  }
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), action ? 6000 : 2400);
}

/* ── Escape helper ────────────────────────────────────── */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

/* ── Event listeners ──────────────────────────────────── */
function bindEvents() {
  // Language
  document.getElementById('lang-select').addEventListener('change', e => {
    state.lang = e.target.value;
    writeSharedLang(state.lang);
    saveToStorage();
    renderAll();
  });

  // Open/close add modal
  document.getElementById('btn-open-modal').addEventListener('click', openAddModal);
  document.getElementById('btn-empty-add').addEventListener('click', openAddModal);
  document.getElementById('btn-close-modal').addEventListener('click', closeAddModal);

  // Modal backdrop click
  document.getElementById('modal-backdrop').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeAddModal();
  });

  // Catalog search debounce
  document.getElementById('api-search-input').addEventListener('input', e => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => doCatalogSearch(e.target.value.trim()), 150);
  });

  // Back buttons
  document.getElementById('btn-back-search').addEventListener('click', () => setStep(1));
  document.getElementById('btn-back-select').addEventListener('click', () => setStep(2));

  // Confirm add
  document.getElementById('btn-confirm-add').addEventListener('click', confirmAddPlant);

  // Edit modal
  document.getElementById('btn-close-edit').addEventListener('click', closeEditModal);
  document.getElementById('edit-modal-backdrop').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeEditModal();
  });
  document.getElementById('btn-save-edit').addEventListener('click', saveEdit);
  document.getElementById('btn-delete-plant').addEventListener('click', deletePlant);

  // Detail modal
  document.getElementById('btn-close-detail').addEventListener('click', closeDetailModal);
  document.getElementById('detail-modal-backdrop').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDetailModal();
  });
  document.getElementById('btn-detail-water').addEventListener('click', () => {
    const id = state.detailPlantId;
    waterPlant(id);
    openDetailModal(id);
  });
  document.getElementById('btn-detail-edit').addEventListener('click', () => {
    const id = state.detailPlantId;
    closeDetailModal();
    openEditModal(id);
  });

  // Local search filter
  document.getElementById('search-input').addEventListener('input', e => {
    state.searchQuery = e.target.value.trim();
    renderGrid();
  });

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.filter = tab.getAttribute('data-filter');
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderGrid();
    });
  });

  // Keyboard ESC
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!document.getElementById('modal-backdrop').hidden) closeAddModal();
    if (!document.getElementById('edit-modal-backdrop').hidden) closeEditModal();
    if (!document.getElementById('detail-modal-backdrop').hidden) closeDetailModal();
  });
}

/* ── Init ────────────────────────────────────────────── */
function init() {
  loadFromStorage();
  // The shared choice is newer than Garden's own copy whenever the user
  // switched language in the hub or another app since the last visit
  state.lang = readSharedLang() || state.lang;
  bindEvents();
  renderAll();

  // The seasonal factor needs the catalog's winterRest flag; re-render once it is there
  if (state.plants.length) loadCatalog().then(renderAll).catch(() => {});

  // Refresh water levels every minute
  setInterval(renderAll, 60 * 1000);
}

document.addEventListener('DOMContentLoaded', init);