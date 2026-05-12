import { TwitterApi } from 'twitter-api-v2';
import { TWEETS } from './content.js';

const DRY_RUN = process.argv.includes('--dry-run');

async function post() {
  // Use day of year + hour to cycle through all tweets without repeating
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const hour = now.getUTCHours();
  const index = (dayOfYear * 16 + hour) % TWEETS.length;

  // Add timestamp variation to avoid duplicate detection
  const suffixes = ['', ' 💡', ' ⚡', ' 🔥', ' 👇', ' 🧵', ' ↓'];
  const suffixIndex = (dayOfYear + hour) % suffixes.length;

  const tweet = TWEETS[index] + suffixes[suffixIndex];

  if (DRY_RUN) {
    console.log('[DRY RUN] Would post:');
    console.log('---');
    console.log(tweet);
    console.log('---');
    console.log(`(${tweet.length} chars) [index: ${index}]`);
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
    console.log(`   Index: ${index}, Chars: ${tweet.length}`);
  } catch (err) {
    if (err.code === 403 && err.message?.includes('duplicate')) {
      console.log('⚠️ Duplicate detected, skipping');
      return;
    }
    console.error('❌ Error:', err.message || err);
    process.exit(1);
  }
}

post();
