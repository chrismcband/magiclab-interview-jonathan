import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import TwitterFeed from './TwitterFeed';
import { TwitterFeedMock } from '../../mocks';

describe('TwitterFeed', () => {
  let wrapper: ShallowWrapper;

  describe('when it has no tweets', () => {
    beforeAll(() => {
      wrapper = shallow(<TwitterFeed tweets={[]} />);
    });

    it('should not render TweetComponents', () => {
      expect(wrapper.find('TweetComponent')).toHaveLength(0);
    });
  });

  describe('when it has tweets', () => {
    beforeAll(() => {
      wrapper = shallow(<TwitterFeed tweets={TwitterFeedMock} />);
    });

    it('should render one TweetComponent per tweet', () => {
      expect(wrapper.find('TweetComponent')).toHaveLength(
        TwitterFeedMock.length
      );
    });

    it('should pass correct tweets via props', () => {
      const propsTweets = wrapper
        .find('TweetComponent')
        .map((a) => (a.props() as any).tweet);
      expect(propsTweets).toEqual(TwitterFeedMock);
    });
  });
});
