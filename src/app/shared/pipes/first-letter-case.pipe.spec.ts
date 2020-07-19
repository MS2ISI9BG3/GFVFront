import { FirstLetterCasePipe } from './first-letter-case.pipe';

describe('FirstLetterCasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterCasePipe();
    expect(pipe).toBeTruthy();
  });
});
