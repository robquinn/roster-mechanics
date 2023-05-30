const urlFetchAppParamsFieldValidation: RosterMechanics.Test.UrlFetchApp.Fn.UrlFetchAppParamsFieldValidation = (
  params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions,
): void => {
  const memberFields = [
    'contentType',
    'headers',
    'method',
    'payload',
    'useIntranet',
    'validateHttpsCertificates',
    'followRedirects',
    'muteHttpExceptions',
    'escaping',
  ]
  const keysGiven = Object.keys(params)

  if (
    !keysGiven.every((key: string) => memberFields.includes(key as keyof GoogleAppsScript.AdminDirectory.Schema.Member))
  ) {
    throw new Error('UrlFetchApp params Object Includes Invalid Keys.')
  }

  if (typeof params.contentType !== 'string' && typeof params.contentType !== 'undefined') {
    throw new Error('UrlFetchApp params object key "contentType" is not a string or undefined.')
  }
  if (typeof params.headers !== 'object' && typeof params.headers !== 'undefined') {
    throw new Error('UrlFetchApp params object key "headers" is not a object or undefined.')
  }
  if (
    params.method !== 'get' &&
    params.method !== 'delete' &&
    params.method !== 'patch' &&
    params.method !== 'post' &&
    params.method !== 'put' &&
    typeof params.method !== 'undefined'
  ) {
    throw new Error(
      "UrlFetchApp params object key 'method' is not 'get' | 'delete' | 'patch' | 'post' | 'put' or undefined.",
    )
  }
  if (
    typeof params.payload !== 'object' &&
    typeof params.payload !== 'string' &&
    typeof params.payload !== 'undefined'
  ) {
    throw new Error('UrlFetchApp params object key "payload" is not a object or string or undefined.')
  }
  if (typeof params.useIntranet !== 'boolean' && typeof params.useIntranet !== 'undefined') {
    throw new Error('UrlFetchApp params object key "useIntranet" is not a boolean or undefined.')
  }
  if (
    typeof params.validateHttpsCertificates !== 'boolean' &&
    typeof params.validateHttpsCertificates !== 'undefined'
  ) {
    throw new Error('UrlFetchApp params object key "validateHttpsCertificates" is not a boolean or undefined.')
  }
  if (typeof params.followRedirects !== 'boolean' && typeof params.followRedirects !== 'undefined') {
    throw new Error('UrlFetchApp params object key "followRedirects" is not a boolean or undefined.')
  }
  if (typeof params.muteHttpExceptions !== 'boolean' && typeof params.muteHttpExceptions !== 'undefined') {
    throw new Error('UrlFetchApp params object key "muteHttpExceptions" is not a boolean or undefined.')
  }
  if (typeof params.escaping !== 'boolean' && typeof params.escaping !== 'undefined') {
    throw new Error('UrlFetchApp params object key "escaping" is not a boolean or undefined.')
  }
}

export default urlFetchAppParamsFieldValidation
