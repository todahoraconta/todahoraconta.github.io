import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

const REPLIES = [
  `E se o problema não fosse quantos dias, mas que cada hora precisa valer?\n\n#TodaHoraConta #CLT20`,
  `Trocar 6x1 por 5x2 é trocar a cor da parede. O problema é a fundação.\n\nCada hora deveria gerar dinheiro + direitos.\n\n#TodaHoraConta`,
  `40 milhões de informais não são resolvidos trocando escala.\n\nSão resolvidos quando cada hora trabalhada gera proteção.\n\n#TodaHoraConta`,
  `E se em vez de proibir escalas, a gente valorizasse cada hora?\n\nSalário por hora + direitos proporcionais + liberdade de escolha.\n\n#TodaHoraConta #CLT20`,
  `O debate tá travado em 6x1 vs 5x2. Mas e os 40M de informais?\n\nA CLT 2.0 resolve pra todos: cada hora vale.\n\n#TodaHoraConta`,
  `Proporcionalidade > imposição.\n\nCada hora gera dinheiro. Cada hora gera direitos. Sem exceção.\n\n#TodaHoraConta #CLT20`,
];

const SEARCH_QUERIES = [
  '#escala6x1 -is:retweet -is:reply lang:pt',
  '#FimDa6x1 -is:retweet -is:reply lang:pt',
  '"escala 6x1" -is:retweet -is:reply lang:pt',
  '"jornada de trabalho" -is:retweet -is:reply lang:pt',
];

async function findAndReply() {
  const query = SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];

  try {
    const results = await client.v2.search(query, {
      max_results: 10,
      'tweet.fields': 'public_metrics,author_id',
      sort_order: 'relevancy',
    });

    if (!results.data?.data?.length) {
      console.log('No tweets found for:', query);
      return;
    }

    // Pick tweet with most engagement
    const sorted = results.data.data.sort((a, b) =>
      (b.public_metrics?.like_count || 0) - (a.public_metrics?.like_count || 0)
    );

    // Try up to 3 tweets in case some restrict replies
    for (const target of sorted.slice(0, 3)) {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];

      console.log(`Trying tweet ${target.id} (${target.public_metrics?.like_count || 0} likes)`);
      console.log(`Reply: ${reply.substring(0, 60)}...`);

      try {
        const result = await client.v2.reply(reply, target.id);
        console.log(`✅ Reply posted: ${result.data.id}`);
        return;
      } catch (err) {
        if (err.code === 403) {
          console.log('⚠️ 403 on this tweet, trying next...');
          continue;
        }
        if (err.code === 429) {
          console.log('⏳ Rate limited, stopping');
          return;
        }
        console.error('❌ Error:', err.message);
        process.exit(1);
      }
    }
    console.log('⚠️ All targets returned 403, skipping this run');
  } catch (err) {
    console.error('❌ Search error:', err.message);
    process.exit(1);
  }
}

findAndReply();
