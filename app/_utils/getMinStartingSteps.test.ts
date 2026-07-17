import getMinStartingSteps from './getMinStartingSteps'

describe('getMinStartingSteps', () => {

  test.each([
    [[1, -4], 4],
    [[1, -2, -2], 4],
    [[1, -4, -2, 5], 6],
    [[-4], 5],
    [[10], 1],
    [[10, -1, -1, -1], 1],
    [[10, -1, -1, -10], 3],
    [[-10], 11],
    [[10, -5, -5], 1],
    [[10, -5, -5, 10], 1],
    [[-1], 2],
    [[1, -2], 2],
    [[1, -4, 4, -2, 5], 4],
  ])('returns correct min starting step', (input, expected) => {
    expect(getMinStartingSteps(input)).toBe(expected);
  })

});
