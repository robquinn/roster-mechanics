import { adminUserFields } from './user-views'

const userFieldValidation = (user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser): void => {
  const keysGiven = Object.keys(user)

  if (
    !keysGiven.every((key: string) =>
      adminUserFields.includes(key as keyof RosterMechanics.GoogleApps.Admin.Schema.GoogleUser),
    )
  ) {
    throw new Error('User Object Includes Invalid Keys.')
  }

  if (typeof user.addresses !== 'object' && !Array.isArray(user.addresses) && typeof user.addresses !== 'undefined') {
    throw new Error('User Object Key "addresses" is not an array of objects or undefined.')
  }
  if (typeof user.agreedToTerms !== 'boolean' && typeof user.agreedToTerms !== 'undefined') {
    throw new Error('User Object Key "agreedToTerms" is not a boolean or undefined.')
  }
  if (typeof user.aliases !== 'object' && !Array.isArray(user.aliases) && typeof user.aliases !== 'undefined') {
    throw new Error('User Object Key "aliases" is not an array of objects or undefined.')
  }
  if (typeof user.archived !== 'boolean' && typeof user.archived !== 'undefined') {
    throw new Error('User Object Key "archived" is not a boolean or undefined.')
  }
  if (typeof user.changePasswordAtNextLogin !== 'boolean' && typeof user.changePasswordAtNextLogin !== 'undefined') {
    throw new Error('User Object Key "changePasswordAtNextLogin" is not a string or undefined.')
  }
  if (typeof user.creationTime !== 'string' && typeof user.creationTime !== 'undefined') {
    throw new Error('User Object Key "creationTime" is not a string or undefined.')
  }
  if (typeof user.customSchemas !== 'object' && typeof user.customSchemas !== 'undefined') {
    throw new Error('User Object Key "customSchemas" is not an objects or undefined.')
  }
  if (typeof user.customerId !== 'string' && typeof user.customerId !== 'undefined') {
    throw new Error('User Object Key "customerId" is not a string or undefined.')
  }
  if (typeof user.deletionTime !== 'string' && typeof user.deletionTime !== 'undefined') {
    throw new Error('User Object Key "deletionTime" is not a string or undefined.')
  }
  if (typeof user.emails !== 'object' && !Array.isArray(user.emails) && typeof user.emails !== 'undefined') {
    throw new Error('User Object Key "emails" is not an array of objects or undefined.')
  }
  if (typeof user.etag !== 'string' && typeof user.etag !== 'undefined') {
    throw new Error('User Object Key "etag" is not a string or undefined.')
  }
  if (
    typeof user.externalIds !== 'object' &&
    !Array.isArray(user.externalIds) &&
    typeof user.externalIds !== 'undefined'
  ) {
    throw new Error('User Object Key "externalIds" is not an array of objects or undefined.')
  }
  if (typeof user.gender !== 'object' && typeof user.gender !== 'undefined') {
    throw new Error('User Object Key "gender" is not an object or undefined.')
  }
  if (typeof user.hashFunction !== 'string' && typeof user.hashFunction !== 'undefined') {
    throw new Error('User Object Key "hashFunction" is not a string or undefined.')
  }
  if (typeof user.id !== 'string' && typeof user.id !== 'undefined') {
    throw new Error('User Object Key "id" is not a string or undefined.')
  }
  if (typeof user.ims !== 'object' && !Array.isArray(user.ims) && typeof user.ims !== 'undefined') {
    throw new Error('User Object Key "ims" is not an array of objects or undefined.')
  }
  if (typeof user.includeInGlobalAddressList !== 'boolean' && typeof user.includeInGlobalAddressList !== 'undefined') {
    throw new Error('User Object Key "includeInGlobalAddressList" is not a boolean or undefined.')
  }
  if (typeof user.ipWhitelisted !== 'boolean' && typeof user.ipWhitelisted !== 'undefined') {
    throw new Error('User Object Key "ipWhitelisted" is not a boolean or undefined.')
  }
  if (typeof user.isAdmin !== 'boolean' && typeof user.isAdmin !== 'undefined') {
    throw new Error('User Object Key "isAdmin" is not a boolean or undefined.')
  }
  if (typeof user.isDelegatedAdmin !== 'boolean' && typeof user.isDelegatedAdmin !== 'undefined') {
    throw new Error('User Object Key "isDelegatedAdmin" is not a boolean or undefined.')
  }
  if (typeof user.isEnrolledIn2Sv !== 'boolean' && typeof user.isEnrolledIn2Sv !== 'undefined') {
    throw new Error('User Object Key "isEnrolledIn2Sv" is not a boolean or undefined.')
  }
  if (typeof user.isEnforcedIn2Sv !== 'boolean' && typeof user.isEnforcedIn2Sv !== 'undefined') {
    throw new Error('User Object Key "isEnforcedIn2Sv" is not a boolean or undefined.')
  }
  if (typeof user.isMailboxSetup !== 'boolean' && typeof user.isMailboxSetup !== 'undefined') {
    throw new Error('User Object Key "isMailboxSetup" is not a boolean or undefined.')
  }
  if (typeof user.keywords !== 'object' && !Array.isArray(user.keywords) && typeof user.keywords !== 'undefined') {
    throw new Error('User Object Key "keywords" is not an array of objects or undefined.')
  }
  if (typeof user.kind !== 'string' && typeof user.kind !== 'undefined') {
    throw new Error('User Object Key "kind" is not a string or undefined.')
  }
  if (typeof user.languages !== 'object' && !Array.isArray(user.languages) && typeof user.languages !== 'undefined') {
    throw new Error('User Object Key "languages" is not an array of objects or undefined.')
  }
  if (typeof user.lastLoginTime !== 'string' && typeof user.lastLoginTime !== 'undefined') {
    throw new Error('User Object Key "lastLoginTime" is not a string or undefined.')
  }
  if (typeof user.locations !== 'object' && !Array.isArray(user.locations) && typeof user.locations !== 'undefined') {
    throw new Error('User Object Key "locations" is not an array of objects or undefined.')
  }
  if (typeof user.name !== 'object' && typeof user.name !== 'undefined') {
    throw new Error('User Object Key "name" is not a object or undefined.')
  }
  if (
    typeof user.nonEditableAliases !== 'object' &&
    !Array.isArray(user.nonEditableAliases) &&
    typeof user.nonEditableAliases !== 'undefined'
  ) {
    throw new Error('User Object Key "nonEditableAliases" is not an array of objects or undefined.')
  }
  if (typeof user.notes !== 'object' && !Array.isArray(user.notes) && typeof user.notes !== 'undefined') {
    throw new Error('User Object Key "notes" is not an array of objects or undefined.')
  }
  if (typeof user.orgUnitPath !== 'string' && typeof user.orgUnitPath !== 'undefined') {
    throw new Error('User Object Key "orgUnitPath" is not a string or undefined.')
  }
  if (
    typeof user.organizations !== 'object' &&
    !Array.isArray(user.organizations) &&
    typeof user.organizations !== 'undefined'
  ) {
    throw new Error('User Object Key "organizations" is not an array of objects or undefined.')
  }
  if (typeof user.password !== 'string' && typeof user.password !== 'undefined') {
    throw new Error('User Object Key "password" is not a string or undefined.')
  }
  if (typeof user.phones !== 'object' && !Array.isArray(user.phones) && typeof user.phones !== 'undefined') {
    throw new Error('User Object Key "phones" is not an array of objects or undefined.')
  }
  if (
    typeof user.posixAccounts !== 'object' &&
    !Array.isArray(user.posixAccounts) &&
    typeof user.posixAccounts !== 'undefined'
  ) {
    throw new Error('User Object Key "posixAccounts" is not an array of objects or undefined.')
  }
  if (typeof user.primaryEmail !== 'string' && typeof user.primaryEmail !== 'undefined') {
    throw new Error('User Object Key "primaryEmail" is not a string or undefined.')
  }
  if (typeof user.relations !== 'object' && !Array.isArray(user.relations) && typeof user.relations !== 'undefined') {
    throw new Error('User Object Key "relations" is not an array of objects or undefined.')
  }
  if (
    typeof user.sshPublicKeys !== 'object' &&
    !Array.isArray(user.sshPublicKeys) &&
    typeof user.sshPublicKeys !== 'undefined'
  ) {
    throw new Error('User Object Key "sshPublicKeys" is not an array of objects or undefined.')
  }
  if (typeof user.suspended !== 'boolean' && typeof user.suspended !== 'undefined') {
    throw new Error('User Object Key "suspended" is not a boolean or undefined.')
  }
  if (typeof user.suspensionReason !== 'string' && typeof user.suspensionReason !== 'undefined') {
    throw new Error('User Object Key "suspensionReason" is not a string or undefined.')
  }
  if (typeof user.thumbnailPhotoEtag !== 'string' && typeof user.thumbnailPhotoEtag !== 'undefined') {
    throw new Error('User Object Key "thumbnailPhotoEtag" is not a string or undefined.')
  }
  if (typeof user.thumbnailPhotoUrl !== 'string' && typeof user.thumbnailPhotoUrl !== 'undefined') {
    throw new Error('User Object Key "thumbnailPhotoUrl" is not a string or undefined.')
  }
  if (typeof user.websites !== 'object' && !Array.isArray(user.websites) && typeof user.websites !== 'undefined') {
    throw new Error('User Object Key "websites" is not an array of objects or undefined.')
  }

  if (typeof user.recoveryEmail !== 'string' && typeof user.recoveryEmail !== 'undefined') {
    throw new Error('User Object Key "recoveryEmail" is not a string or undefined.')
  }
  if (typeof user.recoveryPhone !== 'string' && typeof user.recoveryPhone !== 'undefined') {
    throw new Error('User Object Key "recoveryPhone" is not a string or undefined.')
  }
}

export default userFieldValidation
