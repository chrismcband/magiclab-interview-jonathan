import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import TweetComponent, { generateDate, generateText } from './TweetComponent';
import { TwitterFeedMock } from '../../../mocks';

describe('TweetComponent', () => {
  let wrapper: ShallowWrapper;
  const tweetMock = TwitterFeedMock[0];

  describe('generateDate', () => {
    describe('date with single digit minutes', () => {
      it('should generate printable date', () => {
        const singleDigitMinuteTimestamp = 1593961315730;
        const printableDate = generateDate(singleDigitMinuteTimestamp);
        expect(printableDate).toEqual('5 Jul, 16:01');
      });
    });
    describe('date with multiple digit minutes', () => {
      it('should generate printable date', () => {
        const multiDigitMinuteTimestamp = 1593969316292;
        const printableDate = generateDate(multiDigitMinuteTimestamp);
        expect(printableDate).toEqual('5 Jul, 18:15');
      });
    });
  });

  describe('generateText', () => {
    it('should generate printable text', () => {
      const printableText = generateText(tweetMock);
      expect(printableText).toEqual(
        `"Oh, sir, you are the very man whom I have longed to meet," cried\nthe little fellow with outstretched hands and quivering fingers.`
      );
    });
  });

  describe('when it renders a tweet', () => {
    beforeAll(() => {
      wrapper = shallow(<TweetComponent tweet={tweetMock} />);
    });

    it('should render tweet with correct information', () => {
      expect(wrapper.find('.name').text()).toBe(tweetMock.username);
      expect(wrapper.find('.id').text()).toBe(`#${tweetMock.id}`);
      expect(wrapper.find('.date').text()).toBe(
        generateDate(tweetMock.timeStamp)
      );
      expect(wrapper.find('.content').text()).toBe(generateText(tweetMock));
      expect(wrapper.find('.image').props().src).toBe(tweetMock.image);
    });
  });
});
