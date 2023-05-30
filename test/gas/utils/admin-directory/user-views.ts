import pickObjKeys from '../general/pick-obj-keys'

export const publicUserFields: RosterMechanics.Test.Utils.Var.PublicUserFields = [
  'kind',
  'id',
  'etag',
  'primaryEmail',
  'name',
  'emails',
  'organizations',
  'phones',
  'languages',
]

export const adminUserFields: RosterMechanics.Test.Utils.Var.AdminUserFields = [
  'addresses',
  'agreedToTerms',
  'aliases',
  'archived',
  'changePasswordAtNextLogin',
  'creationTime',
  'customSchemas',
  'customerId',
  'deletionTime',
  'emails',
  'etag',
  'externalIds',
  'gender',
  'hashFunction',
  'id',
  'ims',
  'includeInGlobalAddressList',
  'ipWhitelisted',
  'isAdmin',
  'isDelegatedAdmin',
  'isEnforcedIn2Sv',
  'isEnrolledIn2Sv',
  'isMailboxSetup',
  'keywords',
  'kind',
  'languages',
  'lastLoginTime',
  'locations',
  'name',
  'nonEditableAliases',
  'notes',
  'orgUnitPath',
  'organizations',
  'password',
  'phones',
  'posixAccounts',
  'primaryEmail',
  'relations',
  'sshPublicKeys',
  'suspended',
  'suspensionReason',
  'thumbnailPhotoEtag',
  'thumbnailPhotoUrl',
  'websites',
  // maybe not these
  'recoveryEmail',
  'recoveryPhone',
]

export const adminDirectoryUserViews: RosterMechanics.Test.Utils.Fn.AdminDirectoryUserViews = ({
  user,
  customFieldMask,
}: {
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
  customFieldMask: string | undefined
}): RosterMechanics.Test.Utils.AdminDirectoryViews.Views => {
  return {
    basic: {
      domain_public: pickObjKeys(user, [...publicUserFields]),
      admin_view: pickObjKeys(user, [...adminUserFields]),
    },
    custom: {
      domain_public: pickObjKeys(user, [...publicUserFields]),
      admin_view:
        customFieldMask != null
          ? pickObjKeys(user, [...adminUserFields, `customSchemas.${customFieldMask}`])
          : pickObjKeys(user, [...adminUserFields, `customSchemas`]),
    },
    full: {
      domain_public: pickObjKeys(user, [...publicUserFields]),
      admin_view: pickObjKeys(user, [...adminUserFields]),
    },
  }
}

const getUserAdminDirectoryView: RosterMechanics.Test.Utils.Fn.GetUserAdminDirectoryView = ({
  customFieldMask,
  viewType,
  projection,
  user,
}: {
  customFieldMask: string | undefined
  viewType: 'domain_public' | 'admin_view'
  projection: 'basic' | 'custom' | 'full'
  user: RosterMechanics.GoogleApps.Admin.Schema.GoogleUser
}): RosterMechanics.GoogleApps.Admin.Schema.GoogleUser => {
  return adminDirectoryUserViews({ user, customFieldMask })[projection][viewType]
}

export default getUserAdminDirectoryView
