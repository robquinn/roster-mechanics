import { describe, expect, it } from '@jest/globals'
import objectAreEqual from '../../../../../src/libs/utils/general/objects-are-equal'

const obj1 = {
  someprop1: 'somevalue1',
  someprop2: 'somevalue2',
  someprop3: 'somevalue3',
}

const obj2 = {
  someprop1: 'someothervalue1',
  someprop2: 'someothervalue2',
  someprop3: 'someothervalue3',
}

describe('objectAreEqual', () => {
  it('should return boolean value true for equal object', async () => {
    expect(await objectAreEqual(obj1, obj1)).toBe(true)
  })
  it('should return boolean value false for non equal object', async () => {
    expect(await objectAreEqual(obj1, obj2)).toBe(false)
  })
})
