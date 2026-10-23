import type { PartialDictionary } from '../translations';

export const dic: PartialDictionary = {
  predictor: {
    stepDobValue: '{dob} → {age} anos na época da concepção',
    stepLunarValue: 'ano lunar de nascimento {birth} → ano lunar de concepção {year} = {age} (虚岁)',
    stepMonthValue: '{date} → mês lunar {month}',
    stepCellValue: 'linha {age} × coluna {month} → {gender}',
    genderBoy: 'MENINO',
    genderGirl: 'MENINA',
    boyWord: 'um menino',
    girlWord: 'uma menina',
    leapNote: ' (mês intercalar — veja nosso guia de Runyue abaixo)',
    shareText: 'O Previsor Chinês de Bebês diz que a nossa idade lunar {age} × mês lunar {month} aponta para {genderWord}! chinesebabypredictor.com',
  },
  trust: {
    badge: 'Revisão editorial',
    byline: 'Pesquisado e compilado por nosso Time de Pesquisa em Parentalidade e Astrologia Lunar',
    body: 'Toda explicação, valor do gráfico e conversão de datas neste site foi pesquisada e compilada por nosso Time de Pesquisa em Parentalidade e Astrologia Lunar e conferida com estudos demográficos publicados, incluindo o {studyLink}.',
    studyLinkText: 'análise do registro populacional sueco de 2010 (2,8 milhões de nascimentos)',
    disclaimerTitle: 'Aviso de folclore e conteúdo médico.',
    disclaimerBody: 'O Chinese Baby Predictor é uma ferramenta folclórica antiga baseada nos métodos lunares tradicionais da dinastia Qing e foi criado estritamente para curiosidade cultural e fins de entretenimento. Ele não fornece diagnóstico médico, determinação do sexo fetal nem planejamento reprodutivo. Para uma determinação do sexo medicamente precisa, consulte um profissional de saúde licenciado sobre o ultrassom, o teste pré-natal não invasivo (NIPT) ou a amniocentese — veja o {acogLink} ou o {medlineLink}.',
    acogLinkText: 'orientação do ACOG sobre testes pré-natais',
    medlineLinkText: 'MedlinePlus: Testes Pré-Natais',
  },
  geo: {
    hub5Label: 'Previsor de gênero IVF e FET',
    hub5Desc: 'Leitura do gráfico com transferência de embriões congelados, FIV fresca e óvulos doados — as duas datas comparadas.',
    hub6Label: 'Testador de precisão de gestações passadas',
    hub6Desc: 'Teste o gráfico com seus filhos reais — receba seu placar lunar familiar.',
    hub7Label: 'Calendário chinês de gênero 2027',
    hub7Desc: 'Ano da Cabra de Fogo: mapa completo dos meses lunares, a pegadinha da virada do Ano Novo Chinês em 6 de fevereiro e matriz dos anos de nascimento.',
    hub8Label: 'Calendário chinês de gênero 2028',
    hub8Desc: 'Edição do quinto mês intercalar: todos os 13 meses lunares mapeados com janelas de datas exatas.',
  },
};
