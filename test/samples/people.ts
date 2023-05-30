export const samplePerson1: () => RosterMechanics.GoogleApis.People.Person =
  (): RosterMechanics.GoogleApis.People.Person => ({
    resourceName: 'people/dCAUYyNT13qD3y7ZVMhUxsdfMjk4MjM3MTA0NTA3OTUwNzQ',
    etag: '%EiMBAgMFBgcICQoLDA0ODxsdfUWGSEiIyQlJicuNDU3PT4/QBoBCA==',
    metadata: {
      sources: [
        {
          type: 'DOMAIN_CONTACT',
          id: 'ZDcFh1hP6esdfji5uhCXBqjgOIjQa9m',
        },
      ],
      objectType: 'PERSON',
    },
    names: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hPsdfxVji5uhCXBqjgOIjQa9m',
          },
        },
        displayName: 'Dave Hamburger',
        familyName: 'Hamburger',
        givenName: 'Dave',
        displayNameLastFirst: 'Dave Hamburger',
        // unstructuredName: '#Marketing',
      },
    ],
    photos: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hP6e6sdffi5uhCXBqjgOIjQa9m',
          },
        },
        url: 'https://lh3.googleusercontent.com/cm/AOLgnvvd3SZT4MvVblT0sdfsdfuzE9Ie00WEoCcBE0X0uayrNlqV169fGT-aoua8c=s100',
        default: true,
      },
    ],
    emailAddresses: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hP6esdfji5uhCsdfgOIjQa9m',
          },
          // sourcePrimary: true,
        },
        value: 'dave.hamburger@somecompany.com',
        type: 'work',
        formattedType: 'Work',
      },
    ],
    biographies: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hP6e6sdfdfuhCXBqjgOIjQa9m',
          },
        },
        value: 'dave.hamburger@somecompany.com\ndiane.walo@somecompany.com',
        contentType: 'TEXT_PLAIN',
      },
    ],
    relations: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hP6e6TsdfuhCXBqjgOIjQa9m',
          },
        },
        person: 'ron.howard@somecompany.com',
        type: 'manager',
        formattedType: 'Manager',
      },
    ],
  })

export const samplePerson2: () => RosterMechanics.GoogleApis.People.Person =
  (): RosterMechanics.GoogleApis.People.Person => ({
    resourceName: 'people/dCAUYyNT13qasdf7ZVMhUxsdfMjk4MjM3MTA0NTA3OTUwNzQ',
    etag: '%EiMBAgMFBgcICQoLDA0ODxsdsdfEiIyQlJicuNDU3PT4/QBoBCA==',
    metadata: {
      sources: [
        {
          type: 'DOMAIN_CONTACT',
          id: 'ZDcFh1hP6esdfsdfXBqjgOIjQa9m',
        },
      ],
      objectType: 'PERSON',
    },
    names: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hPsaasdf5uhCXBqjgOIjQa9m',
          },
        },
        displayName: 'Elisa Hamburger',
        familyName: 'Hamburger',
        givenName: 'Elisa',
        displayNameLastFirst: 'Elisa Hamburger',
        // unstructuredName: '#Marketing',
      },
    ],
    photos: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hP6e6asdf5uhCXBqjgOIjQa9m',
          },
        },
        url: 'https://lh3.googleusercontent.com/cm/AOLgnvvd3SZTasdfasdfsdfsdfuzE9Ie00WEoCcBE0X0uayrNlqV169fGT-aoua8c=s100',
        default: true,
      },
    ],
    emailAddresses: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hwqerdfuhCsdfgOIjQa9m',
          },
          // sourcePrimary: true,
        },
        value: 'elisa.hamburger@somecompany.com',
        type: 'work',
        formattedType: 'Work',
      },
    ],
    biographies: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hPwqerruhCXBqjgOIjQa9m',
          },
        },
        value: 'elisa.hamburger@somecompany.com\nrich.walo@somecompany.com',
        contentType: 'TEXT_PLAIN',
      },
    ],
    relations: [
      {
        metadata: {
          primary: true,
          source: {
            type: 'DOMAIN_CONTACT',
            id: 'ZDcFh1hPwqerfuhCXBqjgOIjQa9m',
          },
        },
        person: 'ron.howard@somecompany.com',
        type: 'manager',
        formattedType: 'Manager',
      },
    ],
  })

export default [samplePerson1(), samplePerson2()]
