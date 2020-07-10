import React from 'react';
import { TweetComponent } from './TweetComponent';
import { Props } from './types';
import { Tweet } from '../../api/types';
import styles from './styles.module.css';

export default function TwitterFeed(props: Props) {
  const { tweets } = props;

  return (
    <div className={styles.twitterFeedWrapper}>
      {tweets.map((tweet: Tweet) => (
        <TweetComponent
          key={`tweet-component-${tweet.id}-${tweet.timeStamp}`}
          tweet={tweet}
        />
      ))}
    </div>
  );
}
