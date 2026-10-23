import type { PartialDictionary } from '../translations';

export const dic: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → {age} años al momento de la concepción',
    stepLunarValue: 'año lunar de nacimiento {birth} → año lunar de concepción {year} = {age} (虚岁)',
    stepMonthValue: '{date} → mes lunar {month}',
    stepCellValue: 'fila {age} × columna {month} → {gender}',
    genderBoy: 'NIÑO',
    genderGirl: 'NIÑA',
    boyWord: 'un niño',
    girlWord: 'una niña',
    leapNote: ' (mes bisiesto — consulta nuestra guía de Runyue abajo)',
    shareText: 'El Predictor Chino de Bebés dice que nuestra edad lunar {age} × mes lunar {month} apunta a {genderWord}! chinesebabypredictor.com',
  },
  trust: {
    badge: 'Revisión editorial',
    byline: 'Investigado y elaborado por nuestro Equipo de Investigación de Crianza y Astrología Lunar',
    body: 'Cada explicación, valor del cuadro y conversión de fechas de este sitio fue investigado y elaborado por nuestro Equipo de Investigación de Crianza y Astrología Lunar y verificado con estudios demográficos publicados, incluido el {studyLink}.',
    studyLinkText: 'análisis del registro poblacional sueco de 2010 (2,8 millones de nacimientos)',
    disclaimerTitle: 'Aviso de folclore y contenido médico.',
    disclaimerBody: 'El Predictor Chino de Bebés es una herramienta folclórica antigua basada en los métodos lunares tradicionales de la dinastía Qing y está diseñado estrictamente para curiosidad cultural y fines de entretenimiento. No proporciona diagnóstico médico, determinación del sexo fetal ni planificación reproductiva. Para una determinación del sexo médicamente precisa, consulta a un profesional sanitario autorizado sobre la ecografía, las pruebas prenatales no invasivas (NIPT) o la amniocentesis — consulta la {acogLink} o el {medlineLink}.',
    acogLinkText: 'guía del ACOG sobre pruebas prenatales',
    medlineLinkText: 'MedlinePlus: pruebas prenatales',
  },
  geo: {
    hub5Label: 'Predictor de género IVF y FET',
    hub5Desc: 'Lecturas del cuadro con transferencia de embriones congelados, FIV fresca y óvulos donados — ambas fechas comparadas.',
    hub6Label: 'Comprobador de precisión de embarazos pasados',
    hub6Desc: 'Pon a prueba el cuadro con tus hijos reales — recibe tu marcador lunar familiar.',
    hub7Label: 'Calendario chino del género 2027',
    hub7Desc: 'Año de la Cabra de Fuego: mapa completo de los meses lunares, la trampa del cambio de Año Nuevo chino del 6 de febrero y matriz de los años de nacimiento.',
    hub8Label: 'Calendario chino del género 2028',
    hub8Desc: 'Edición del quinto mes bisiesto: los 13 meses lunares mapeados con ventanas de fechas exactas.',
  },
};
