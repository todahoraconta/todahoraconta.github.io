import { TwitterApi } from 'twitter-api-v2';
import { getContent } from './content.js';

const DRY_RUN = process.argv.includes('--dry-run');

async function post() {
  const tweet = getContent();

  if (DRY_RUN) {
    console.log('[DRY RUN] Would post:');
    console.log('---');
    console.log(tweet);
    console.log('---');
    console.log(`(${tweet.length} chars)`);
    return;
  }

  const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
  });

  try {
    const result = await client.v2.tweet(tweet);
    console.log(`✅ Posted: ${result.data.id}`);
    console.log(`   ${tweet.substring(0, 60)}...`);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

post();
