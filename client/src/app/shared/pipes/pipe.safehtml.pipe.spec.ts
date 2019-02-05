import { Pipe.SafehtmlPipe } from './pipe.safehtml.pipe';

describe('Pipe.SafehtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new Pipe.SafehtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
