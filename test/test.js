import assert from 'assert';
import myModule from '../index';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

describe('myModule', () => {
  it('should return "Hello, World!" when called with no arguments', () => {
    assert.equal(myModule.sayHello(), 'Hello, World!');
  });
});
