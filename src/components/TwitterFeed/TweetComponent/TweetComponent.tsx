import React from 'react';
import { Props, Months } from './types';
import { Tweet } from '../../../api/types';
import styles from './styles.module.css';

const FALLBACK_IMAGE =
  'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';

export function generateDate(transactionDate: number): string {
  const date = new Date(transactionDate);
  const minutes = date.getMinutes();
  const minutesWithLeadingZeros = minutes < 10 ? `0${minutes}` : minutes;

  return `${date.getDate()} ${
    Months[date.getMonth()]
  }, ${date.getHours()}:${minutesWithLeadingZeros}`;
}

export function generateText(tweet: Tweet): string {
  return tweet.text.split(`${tweet.id}. `)[1];
}

function setUpFallbackImage(ev: React.SyntheticEvent<HTMLImageElement, Event>) {
  (ev.target as HTMLImageElement).src = FALLBACK_IMAGE;
}

export default function TweetComponent(props: Props) {
  const { tweet } = props;

  const date = generateDate(tweet.timeStamp);

  return (
    <div className={styles.tweetWrapper}>
      <img
        className={styles.image}
        src={tweet.image}
        onError={setUpFallbackImage}
        alt={'profile'}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.tweetHeader}>
          <span className={styles.name}>{tweet.username}</span>
          <div className={styles.nameSeparator}>·</div>
          <span className={styles.date}>{date}</span>
          <span className={styles.id}>{`#${tweet.id}`}</span>
        </div>
        <div className={styles.content}>{generateText(tweet)}</div>
      </div>
    </div>
  );
}
