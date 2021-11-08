import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('# 간단한 앱 만들며 테스트 익히기', () => {
  describe('1. 기본 테스트', () => {
    beforeEach(() => {
      render(<App />);
    });

    test('카운터 시작값(기본값)은 0이다.', () => {
      const counterElement = screen.getByTestId('counter');
      expect(counterElement).toHaveTextContent(0);
    });

    it('마이너스(-) 버튼이 올바른 이름을 가진다', () => {
      const minusButtonElement = screen.getByTestId('button-minus');
      expect(minusButtonElement).toHaveTextContent('빼기');
    });

    test('플러스(+) 버튼이 올바른 이름을 가진다', () => {
      const plusButtonElement = screen.getByTestId('button-plus');
      expect(plusButtonElement).toHaveTextContent('더하기');
    });

    test('버튼 토글 테스트 OFF - Grey', () => {
      const onoffButtonElement = screen.getByTestId('button-onoff');
      expect(onoffButtonElement).toHaveStyle({backgroundColor: 'grey'});
    });
  });
  // fire Event
  describe('2. fire Event 테스트', () => {
    beforeEach(() => {
      render(<App />);
      const onoffButtonElement = screen.getByTestId('button-onoff');
      return fireEvent.click(onoffButtonElement);
    });

    test('플러스(+) 버튼을 눌렀을때, 카운트 수를 1이 된다.', () => {
      const plusButtonElement = screen.getByTestId('button-plus');
      fireEvent.click(plusButtonElement);

      const counterElement = screen.getByTestId('counter');
      expect(counterElement).toHaveTextContent('1');
    });

    test('버튼 토글 테스트 ON - BLUE / OFF - Grey', () => {
      const onoffButtonElement = screen.getByTestId('button-onoff');
      expect(onoffButtonElement).toHaveStyle({backgroundColor: 'blue'});

      fireEvent.click(onoffButtonElement);
      expect(onoffButtonElement).toHaveStyle({backgroundColor: 'grey'});
    });

    test('카운트가 0일때, 마이너스(-) 버튼이 disabled', () => {
      const minusButtonElement = screen.getByTestId('button-minus');
      const plusButtonElement = screen.getByTestId('button-plus');

      expect(minusButtonElement).toBeDisabled();
      fireEvent.click(plusButtonElement);
      expect(minusButtonElement).not.toBeDisabled();
    });
  });
  describe('3. Repeating Setup - beforeEach', () => {
    describe('3.1. 플러스 버튼을 처음 눌렀을때,', () => {
      beforeEach(() => {
        render(<App />);
        const onoffButtonElement = screen.getByTestId('button-onoff');
        fireEvent.click(onoffButtonElement);
        const plusButtonElement = screen.getByTestId('button-plus');
        return fireEvent.click(plusButtonElement);
      });

      it('카운터 값이 1이다.' ,() => {
        const counterElement = screen.getByTestId('counter');
        expect(counterElement).toHaveTextContent(1);
      });

      it('마이너스(-)버튼이 활성화' ,() => {
        const minusButtonElement = screen.getByTestId('button-minus');
        expect(minusButtonElement).not.toBeDisabled()
      });
    });
  });
});

