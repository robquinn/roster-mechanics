import { describe, expect, it } from '@jest/globals'
import makeQueryParams from '../../../../../src/libs/utils/general/make-query-params'

describe('makeQueryParams', () => {
  it('should return query params string given object of query params', async () => {
    expect(
      await makeQueryParams({
        readMask: 'addresses,ageRanges',
        sources: ['DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE', 'DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE'],
        pageToken: 'asdf',
        theObject: {
          obj1: 'obj1value',
          obj2: 'obj2value',
          obj3: 'obj3value',
        },
        number: 2134,
        asdf: null,
        undef: undefined,
      }),
    ).toBe(
      '?readMask=addresses,ageRanges&sources=DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE&sources=DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE&pageToken=asdf&obj1=obj1value&obj2=obj2value&obj3=obj3value&number=2134&asdf=null&undef=undefined',
    )
  })
})
