import React from "react";
import { getTweets, resetDatabase } from "../api/TwitterAPI";
import { Tweet } from "../api/types";
import { TwitterFeed } from "./TwitterFeed";
import styles from "./styles.module.css";

export default function App() {
  const [tweets, setTweets] = React.useState<Tweet[]>([]);
  const [scrollY, setScrollY] = React.useState<number>(0);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, []);

  React.useEffect(() => {
    if (
      window.innerHeight + scrollY >= document.body.scrollHeight &&
      tweets.length > 0
    ) {
      const lastTweet = tweets[tweets.length - 1];
      (async () => {
        const fetchedTweets = await getTweets(undefined, lastTweet.id);
        setTweets((prevTweets: Tweet[]) => [...prevTweets, ...fetchedTweets]);
      })();
      return;
    }

    if (scrollY > 0) {
      return;
    }

    const timer = setTimeout(async () => {
      let lastFetchedTweetId;

      if (tweets.length > 0) {
        if (tweets[0].id > 10000) {
          // (covered border case: we went over id 10000, therefore we have to reset
          // the database and start fetching from id 0)
          const databaseWasReset = await resetDatabase();
          // if resetDatabase() was successful, we will request tweet with id 0
          // otherwise, we will request the latest tweet once again,
          // this means that the next time useEffect runs, tweets[0].id will be truthy again,
          // allowing us to retry running resetDatabase() until it succeeds
          // (covered border case: resetDatabase() fails)
          lastFetchedTweetId = databaseWasReset ? 0 : tweets[0].id;
        } else {
          // sets last tweet ID
          // this allows fetching by the last successfully fetched tweet
          // (covered border case: a fetch has failed, and tweets shouldn't be skipped)
          lastFetchedTweetId = tweets[0].id;
        }
      }

      const fetchedTweets = await getTweets(lastFetchedTweetId);

      setTweets((prevTweets: Tweet[]) => [...fetchedTweets, ...prevTweets]);
    }, 2e3);
    return () => clearTimeout(timer);
  }, [tweets, scrollY]);

  return (
    <div className={styles.appWrapper}>
      {tweets.length > 0 && <TwitterFeed tweets={tweets} />}
    </div>
  );
}
