import {namesReducer} from './names.redux';

describe('namesReducer', () => {

  it('should pass', () => {
    expect(false).toEqual(false);
  });

  it('should sort', () => {
    const inputState = {
      data: ['dd', 'aa', 'cc', 'bb'],
      description: 'melbourne'
    };

    const state = namesReducer(inputState, {type: '[name] SORT'});

    expect(state.data).toEqual([
      'aa',
      'bb',
      'cc',
      'dd',
    ]);

  })
});