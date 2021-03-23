import { TodoTimestampPipe } from './todo-timestamp.pipe';

describe('TodoTimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoTimestampPipe();
    expect(pipe).toBeTruthy();
  });
});
