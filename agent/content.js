const TWEETS = [
  // === ABERTURA / CONCEITO ===
  `E se o problema do trabalho no Brasil não fosse trabalhar demais, mas trabalhar sem que cada hora valha alguma coisa?\n\nToda hora deveria gerar dinheiro + direitos. Sem exceção.\n\n#TodaHoraConta #CLT20\n\ntodahoraconta.com`,

  `O Congresso quer trocar 6x1 por 5x2.\n\nIsso é como trocar a cor da parede de uma casa com a fundação rachada.\n\nO problema não é quantos dias. É que cada hora precisa valer.\n\n#TodaHoraConta @clt20`,

  `Descanso é um direito.\nTrabalhar também.\n\nO erro é transformar qualquer um dos dois em obrigação.\n\n#TodaHoraConta #CLT20 @clt20`,

  // === HUMANO / EMOCIONAL ===
  `Tem gente que precisa de uma hora a mais hoje pra pagar uma conta.\nTem gente que quer concentrar trabalho pra viajar depois.\nTem gente que prefere trabalhar de madrugada.\n\nPor que a lei decide por elas?\n\n#TodaHoraConta @clt20`,

  `Trabalhou 5 meses e foi demitido?\n\nCLT atual: perdeu tudo.\nCLT 2.0: acumulou 5 meses de direitos. Ponto.\n\nProporcionalidade > tudo ou nada.\n\n#TodaHoraConta #CLT20\n\ntodahoraconta.com`,

  `O direito ao descanso é inviolável.\nO momento de exercê-lo é decisão do trabalhador.\n\nIsso não elimina o descanso. Elimina o paternalismo.\n\n#TodaHoraConta @clt20`,

  // === EXEMPLOS REAIS ===
  `Hoje um motoboy trabalha pra 3 apps sem proteção nenhuma.\n\nNa CLT 2.0, cada hora dele gera FGTS, férias e seguro. Automaticamente.\n\nIsso é proteção real, não proteção de papel.\n\n#TodaHoraConta @clt20\n\ntodahoraconta.com`,

  `A diarista que trabalha em 4 casas não tem direito a nada.\n\nNa CLT 2.0, cada hora em cada casa acumula proteção. Sem burocracia.\n\n#TodaHoraConta #CLT20 @clt20`,

  `O jovem que quer trabalhar fim de semana pra juntar dinheiro?\n\nNa CLT 2.0: ganha 200% do salário mínimo/hora e acumula férias em dobro.\n\nPor escolha. Não por obrigação.\n\n#TodaHoraConta @clt20`,

  // === DADOS ===
  `40 milhões de brasileiros trabalham informalmente.\n14 milhões estão na escala 6x1.\n\nO PL do governo resolve pra 14 milhões.\nA CLT 2.0 resolve pra 54 milhões.\n\nQual faz mais sentido?\n\n#TodaHoraConta @clt20\n\ntodahoraconta.com`,

  `500 mil afastamentos por doenças do trabalho em 2024.\n\nA solução não é proibir trabalho. É valorizar cada hora e dar liberdade real de escolha.\n\n#TodaHoraConta #CLT20 @clt20`,

  // === EMPREGADOR ===
  `Empregador: você sabe exatamente quanto custa cada hora do seu funcionário?\n\nNa CLT atual, nem o contador sabe.\nNa CLT 2.0, é uma conta só. Sem passivo oculto.\n\nIsso não é contra trabalhador. É a favor de clareza.\n\n#TodaHoraConta @clt20`,

  `Pequeno empresário com medo de contratar por causa do passivo trabalhista?\n\nNa CLT 2.0: custo fixo por hora. Sem surpresas. Sem processo.\n\nBom pra quem contrata e pra quem trabalha.\n\n#TodaHoraConta @clt20\n\ntodahoraconta.com`,

  // === FILOSÓFICO / PROVOCATIVO ===
  `O maior risco é fingir proteção onde ela não existe.\n\n40 milhões de informais que tal.\n\n#TodaHoraConta #CLT20 @clt20`,

  `A CLT atual parte de um pressuposto:\n"O trabalhador não é capaz de decidir sobre sua própria vida."\n\nA CLT 2.0 inverte:\n"O trabalhador é adulto. O Estado garante o piso, não a decisão."\n\n#TodaHoraConta @clt20`,

  `Proibir alguém de trabalhar mais não é proteção.\nÉ tirar dela o direito de decidir a própria vida.\n\nVamos falar de proporcionalidade.\n\n#TodaHoraConta @clt20\n\ntodahoraconta.com`,

  `Trabalhar em horário especial deixa de ser punição e passa a ser uma escolha valorizada.\n\nDomingo = 200%\nFeriado = 200%\nMadrugada = +50%\n\nQuem escolhe, ganha mais.\n\n#TodaHoraConta #CLT20 @clt20`,

  // === COMPARATIVO DIRETO ===
  `CLT atual:\n- Unidade: mês\n- Escala: engessada\n- Seguro: tudo ou nada\n\nCLT 2.0:\n- Unidade: hora\n- Escala: livre\n- Seguro: proporcional\n\nQual parece mais justa?\n\n#TodaHoraConta @clt20`,

  `Na CLT atual, quem trabalha pouco perde tudo.\nQuem trabalha muito, às vezes ganha o mesmo.\n\nNa CLT 2.0: 1 hora = direito. 10.000 horas = proporcionalmente mais.\n\nSem saltos artificiais. Sem exclusão.\n\n#TodaHoraConta @clt20`,

  // === CALL TO ACTION ===
  `Isso faz sentido pra você?\n\nNão é proposta de partido. Não é de sindicato.\nÉ um convite ao debate.\n\ntodahoraconta.com\n\n#TodaHoraConta #CLT20 @clt20`,

  `Conhece alguém que trabalha informal e não tem proteção nenhuma?\n\nManda esse link: todahoraconta.com\n\nA CLT 2.0 é pra essas pessoas.\n\n#TodaHoraConta @clt20`,
];

export function getContent() {
  const hour = new Date().getHours();
  const day = new Date().getDay();

  // Weighted selection: peak hours get provocative/data tweets
  let pool;
  if (hour >= 7 && hour <= 9 || hour >= 18 && hour <= 22) {
    pool = TWEETS.filter((_, i) => i < 6 || i >= 9);
  } else if (hour >= 12 && hour <= 14) {
    pool = TWEETS.filter((_, i) => i >= 3 && i < 12);
  } else {
    pool = TWEETS.filter((_, i) => i >= 13);
  }

  const dayOffset = new Date().getDate() * 7 + hour;
  const index = dayOffset % pool.length;

  return pool[index];
}
