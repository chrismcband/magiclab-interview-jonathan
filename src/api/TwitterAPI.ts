import { Tweet } from "./types";

const API_URL = `https://magiclab-twitter-interview.herokuapp.com/jonathan-bursztyn`;
const TWEET_FETCH_COUNT = 50;

export async function getTweets(
  afterId?: number,
  beforeId?: number
): Promise<Tweet[]> {
  let requestURL = `${API_URL}/api?count=${TWEET_FETCH_COUNT}`;

  if (afterId || afterId === 0) {
    requestURL = `${requestURL}&afterId=${afterId}`;
  }

  if (beforeId || beforeId === 0) {
    requestURL = `${requestURL}&beforeId=${beforeId}`;
  }

  const response = await fetch(requestURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    console.error("Couldn't fetch tweets");
    return [];
  }
  return await response.json();
}

export async function resetDatabase(): Promise<boolean> {
  const response = await fetch(`${API_URL}/reset`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    console.error("Couldn't reset database");
  }
  return response.ok;
}
