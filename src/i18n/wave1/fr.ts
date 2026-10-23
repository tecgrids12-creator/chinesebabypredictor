import type { PartialDictionary } from '../translations';

export const dic: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → {age} ans au moment de la conception',
    stepLunarValue: 'année lunaire de naissance {birth} → année lunaire de conception {year} = {age} (虚岁)',
    stepMonthValue: '{date} → mois lunaire {month}',
    stepCellValue: 'ligne {age} × colonne {month} → {gender}',
    genderBoy: 'GARÇON',
    genderGirl: 'FILLE',
    boyWord: 'un garçon',
    girlWord: 'une fille',
    leapNote: ' (mois intercalaire — consultez notre guide Runyue ci-dessous)',
    shareText: 'Le Prédicteur Chinois du Bébé dit que notre âge lunaire {age} × mois lunaire {month} pointe vers {genderWord} ! chinesebabypredictor.com',
  },
  trust: {
    badge: 'Revue éditoriale',
    byline: 'Recherché et compilé par notre équipe de recherche Parentalité et Astrologie lunaire',
    body: 'Chaque explication, valeur du tableau et conversion de dates sur ce site a été recherchée et compilée par notre équipe de recherche Parentalité et Astrologie lunaire, puis vérifiée à partir d’études démographiques publiées, dont la {studyLink}.',
    studyLinkText: 'analyse du registre de population suédois de 2010 (2,8 millions de naissances)',
    disclaimerTitle: 'Avertissement folklore et contenu médical.',
    disclaimerBody: 'Le Chinese Baby Predictor est un outil folklorique ancien fondé sur les méthodes lunaires traditionnelles de la dynastie Qing, conçu strictement à des fins de curiosité culturelle et de divertissement. Il ne fournit aucun diagnostic médical, aucune détermination du sexe du fœtus ni aucune planification reproductive. Pour une détermination médicalement fiable du sexe, consultez un professionnel de santé agréé au sujet de l’échographie, du test prénatal non invasif (NIPT) ou de l’amniocentèse — voir les {acogLink} ou {medlineLink}.',
    acogLinkText: 'recommandations de l’ACOG sur les tests prénatals',
    medlineLinkText: 'MedlinePlus : les tests prénatals',
  },
  geo: {
    hub5Label: 'Prédicteur de genre IVF–FET',
    hub5Desc: 'Lectures du tableau pour transfert d’embryons congelés, FIV fraîche et don d’ovocytes — les deux dates comparées.',
    hub6Label: 'Testeur de précision des grossesses passées',
    hub6Desc: 'Testez le tableau avec vos enfants réels — obtenez votre score lunaire familial.',
    hub7Label: 'Calendrier chinois de genre 2027',
    hub7Desc: 'Année de la Chèvre de Feu : carte complète des mois lunaires, le piège du passage au Nouvel An chinois du 6 février et matrice des années de naissance.',
    hub8Label: 'Calendrier chinois de genre 2028',
    hub8Desc: 'Édition du cinquième mois intercalaire : les 13 mois lunaires cartographiés avec des fenêtres de dates exactes.',
  },
};
