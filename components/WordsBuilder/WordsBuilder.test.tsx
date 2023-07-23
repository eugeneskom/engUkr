import React from 'react';
import { render, fireEvent, RenderAPI } from '@testing-library/react-native';
import WordsBuilder from './WordsBuilder';
import { wordTranslation } from '../../types/types';

describe('WordsBuilder', () => {
  let component: RenderAPI;

  const mockSet: wordTranslation = {
    eng: 'test',
    ukr: 'тест',
  };

  beforeEach(() => {
    component = render(<WordsBuilder set={mockSet} />);
  });

  it('renders the correct initial state', () => {
    // Check if the Ukrainian word is correctly displayed
    expect(component.getByText('тест')).toBeTruthy();

    // Check if the English word is correctly scrambled and displayed
    mockSet.eng.split('').forEach(letter => {
      expect(component.getByText(letter)).toBeTruthy();
    });
  });

  it('handles letter presses correctly', () => {
    // Simulate pressing the first letter
    fireEvent.press(component.getByText('t'));

    // Check if the pressed letter is removed from the list
    expect(component.queryByText('t')).toBeNull();

    // Check if the word being built is displayed correctly
    expect(component.getByText('t')).toBeTruthy();
  });

  // Add more tests as needed
});
