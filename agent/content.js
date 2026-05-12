const TWEETS = [
  // === ABERTURA / CONCEITO ===
  `E se o problema do trabalho no Brasil não fosse trabalhar demais, mas trabalhar sem que cada hora valha alguma coisa?\n\nToda hora deveria gerar dinheiro + direitos. Sem exceção.\n\n#TodaHoraConta #CLT20`,

  `O Congresso quer trocar 6x1 por 5x2.\n\nIsso é como trocar a cor da parede de uma casa com a fundação rachada.\n\nO problema não é quantos dias. É que cada hora precisa valer.\n\n#TodaHoraConta`,

  `Descanso é um direito.\nTrabalhar também.\n\nO erro é transformar qualquer um dos dois em obrigação.\n\n#TodaHoraConta #CLT20`,

  // === HUMANO / EMOCIONAL ===
  `Tem gente que precisa de uma hora a mais hoje pra pagar uma conta.\nTem gente que quer concentrar trabalho pra viajar depois.\nTem gente que prefere trabalhar de madrugada.\n\nPor que a lei decide por elas?\n\n#TodaHoraConta`,

  `Trabalhou 5 meses e foi demitido?\n\nCLT atual: perdeu tudo.\nCLT 2.0: acumulou 5 meses de direitos. Ponto.\n\nProporcionalidade > tudo ou nada.\n\n#TodaHoraConta #CLT20`,

  `O direito ao descanso é inviolável.\nO momento de exercê-lo é decisão do trabalhador.\n\nIsso não elimina o descanso. Elimina o paternalismo.\n\n#TodaHoraConta`,

  // === EXEMPLOS REAIS ===
  `Hoje um motoboy trabalha pra 3 apps sem proteção nenhuma.\n\nNa CLT 2.0, cada hora dele gera FGTS, férias e seguro. Automaticamente.\n\nIsso é proteção real, não proteção de papel.\n\n#TodaHoraConta`,

  `A diarista que trabalha em 4 casas não tem direito a nada.\n\nNa CLT 2.0, cada hora em cada casa acumula proteção. Sem burocracia.\n\n#TodaHoraConta #CLT20`,

  `O jovem que quer trabalhar fim de semana pra juntar dinheiro?\n\nNa CLT 2.0: ganha 200% do salário mínimo/hora e acumula férias em dobro.\n\nPor escolha. Não por obrigação.\n\n#TodaHoraConta`,

  // === DADOS ===
  `40 milhões de brasileiros trabalham informalmente.\n14 milhões estão na escala 6x1.\n\nO PL do governo resolve pra 14 milhões.\nA CLT 2.0 resolve pra 54 milhões.\n\nQual faz mais sentido?\n\n#TodaHoraConta`,

  `500 mil afastamentos por doenças do trabalho em 2024.\n\nA solução não é proibir trabalho. É valorizar cada hora e dar liberdade real de escolha.\n\n#TodaHoraConta #CLT20`,

  // === EMPREGADOR ===
  `Empregador: você sabe exatamente quanto custa cada hora do seu funcionário?\n\nNa CLT atual, nem o contador sabe.\nNa CLT 2.0, é uma conta só. Sem passivo oculto.\n\nIsso não é contra trabalhador. É a favor de clareza.\n\n#TodaHoraConta`,

  `Pequeno empresário com medo de contratar por causa do passivo trabalhista?\n\nNa CLT 2.0: custo fixo por hora. Sem surpresas. Sem processo.\n\nBom pra quem contrata e pra quem trabalha.\n\n#TodaHoraConta`,

  // === FILOSÓFICO / PROVOCATIVO ===
  `O maior risco é fingir proteção onde ela não existe.\n\n40 milhões de informais que tal.\n\n#TodaHoraConta`,

  `A CLT atual parte de um pressuposto:\n"O trabalhador não é capaz de decidir sobre sua própria vida."\n\nA CLT 2.0 inverte:\n"O trabalhador é adulto. O Estado garante o piso, não a decisão."\n\n#TodaHoraConta #CLT20`,

  `Proibir alguém de trabalhar mais não é proteção.\nÉ tirar dela o direito de decidir a própria vida.\n\nVamos falar de proporcionalidade.\n\n#TodaHoraConta`,

  `Trabalhar em horário especial deixa de ser punição e passa a ser uma escolha valorizada.\n\nDomingo = 200%\nFeriado = 200%\nMadrugada = +50%\n\nQuem escolhe, ganha mais.\n\n#TodaHoraConta #CLT20`,

  // === COMPARATIVO DIRETO ===
  `CLT atual:\n- Unidade: mês\n- Escala: engessada\n- Seguro: tudo ou nada\n\nCLT 2.0:\n- Unidade: hora\n- Escala: livre\n- Seguro: proporcional\n\nQual parece mais justa?\n\n#TodaHoraConta`,

  `Na CLT atual, quem trabalha pouco perde tudo.\nQuem trabalha muito, às vezes ganha o mesmo.\n\nNa CLT 2.0: 1 hora = direito. 10.000 horas = proporcionalmente mais.\n\nSem saltos artificiais. Sem exclusão.\n\n#TodaHoraConta`,

  // === CALL TO ACTION ===
  `Isso faz sentido pra você?\n\nNão é proposta de partido. Não é de sindicato.\nÉ um convite ao debate.\n\ntodahoraconta.com\n\n#TodaHoraConta #CLT20`,

  `Conhece alguém que trabalha informal e não tem proteção nenhuma?\n\nManda esse link: todahoraconta.com\n\nA CLT 2.0 é pra essas pessoas.\n\n#TodaHoraConta`,
];

export function getContent() {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const seed = Date.now();

  // Weighted selection: peak hours get provocative/data tweets
  let pool;
  if (hour >= 7 && hour <= 9 || hour >= 18 && hour <= 22) {
    // Peak: provocative, data, CTA
    pool = TWEETS.filter((_, i) => i < 6 || i >= 9);
  } else if (hour >= 12 && hour <= 14) {
    // Lunch: human, examples
    pool = TWEETS.filter((_, i) => i >= 3 && i < 12);
  } else {
    // Off-peak: philosophical, comparisons
    pool = TWEETS.filter((_, i) => i >= 13);
  }

  // Pseudo-random based on timestamp to avoid repeats within same day
  const dayOffset = new Date().getDate() * 7 + hour;
  const index = dayOffset % pool.length;

  return pool[index];
}
