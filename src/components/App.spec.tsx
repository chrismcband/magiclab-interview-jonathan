import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from './App';
import { TwitterFeedMock } from '../mocks';
import * as TwitterAPI from '../api/TwitterAPI';

describe('App', () => {
  afterAll(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('when fetching data', () => {
    let container: HTMLDivElement;
    let setTweetFeedMock: jest.Mock;

    beforeAll(async () => {
      container = document.createElement('div');
      document.body.appendChild(container);
      setTweetFeedMock = jest.fn();

      jest
        .spyOn(TwitterAPI, 'getTweets')
        .mockImplementation(() => Promise.resolve(TwitterFeedMock));

      jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [[], setTweetFeedMock]);

      jest.useFakeTimers();

      await act(async () => {
        render(<App />, container);
      });
    });

    it('should call setTimeout with 2s timeout', () => {
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2e3);
    });

    describe('after timeout', () => {
      beforeAll(async () => {
        await act(async () => {
          jest.runAllTimers();
        });
      });

      it('should have set tweet feed with mock', () => {
        expect(setTweetFeedMock).toHaveBeenCalledTimes(1);
        expect(setTweetFeedMock).toHaveBeenCalledWith(expect.any(Function));
      });
    });
  });
});
