import { TwitterApi } from 'twitter-api-v2';
import { TWEETS } from './content.js';

const DRY_RUN = process.argv.includes('--dry-run');

async function post() {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const hour = now.getUTCHours();
  const index = (dayOfYear * 16 + hour) % TWEETS.length;

  const tweet = TWEETS[index];
  const mainText = tweet.main;
  const replyText = tweet.reply;

  if (DRY_RUN) {
    console.log('[DRY RUN]');
    console.log(`Tweet: ${mainText.substring(0, 80)}...`);
    console.log(`Reply: ${replyText.substring(0, 80)}...`);
    console.log(`(${mainText.length} + ${replyText.length} chars) [index: ${index}]`);
    return;
  }

  const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
  });

  try {
    // Post main tweet
    const result = await client.v2.tweet(mainText);
    console.log(`✅ Tweet: ${result.data.id}`);

    // Self-reply (creates thread, boosts dwell time + engagement signal)
    const replyResult = await client.v2.reply(replyText, result.data.id);
    console.log(`✅ Reply: ${replyResult.data.id}`);
  } catch (err) {
    if (err.code === 403) {
      console.log('⚠️ 403 - possible duplicate, skipping');
      return;
    }
    console.error('❌ Error:', err.message || err);
    process.exit(1);
  }
}

post();
