const memberFieldValidation = (member: GoogleAppsScript.AdminDirectory.Schema.Member): void => {
  const memberFields = ['delivery_settings', 'email', 'etag', 'id', 'kind', 'role', 'status', 'type']
  const keysGiven = Object.keys(member)

  if (
    !keysGiven.every((key: string) => memberFields.includes(key as keyof GoogleAppsScript.AdminDirectory.Schema.Member))
  ) {
    throw new Error('Member Object Includes Invalid Keys.')
  }

  if (typeof member.delivery_settings !== 'string' && typeof member.delivery_settings !== 'undefined') {
    throw new Error('Member object key "delivery_settings" is not a string or undefined.')
  }
  if (typeof member.email !== 'string' && typeof member.email !== 'undefined') {
    throw new Error('Member object key "email" is not a string or undefined.')
  }
  if (typeof member.etag !== 'string' && typeof member.etag !== 'undefined') {
    throw new Error('Member object key "etag" is not a string or undefined.')
  }
  if (typeof member.id !== 'string' && typeof member.id !== 'undefined') {
    throw new Error('Member object key "id" is not a string or undefined.')
  }
  if (typeof member.kind !== 'string' && typeof member.kind !== 'undefined') {
    throw new Error('Member object key "kind" is not a string or undefined.')
  }
  if (typeof member.role !== 'string' && typeof member.role !== 'undefined') {
    throw new Error('Member object key "role" is not a string or undefined.')
  }
  if (typeof member.status !== 'string' && typeof member.status !== 'undefined') {
    throw new Error('Member object key "status" is not a string or undefined.')
  }
  if (typeof member.type !== 'string' && typeof member.type !== 'undefined') {
    throw new Error('Member object key "type" is not a string or undefined.')
  }
}

export default memberFieldValidation
