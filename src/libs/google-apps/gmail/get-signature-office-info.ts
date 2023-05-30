import getActualOffice from '../../utils/general/get-actual-office'
import RussLyonConfig from '../../../config/company/russ-lyon'

const getSignatureOfficeInfo: RosterMechanics.GoogleApps.Gmail.Fn.GetSignatureOfficeInfo = async (
  officeName: string,
): Promise<RosterMechanics.GoogleApps.Gmail.Objs.OfficeInfo> => {
  const actualOffice = await getActualOffice(officeName as RosterMechanics.Utils.General.Offices.Office)
  return {
    address: {
      street: (await RussLyonConfig).offices[actualOffice].address.street,
      city: (await RussLyonConfig).offices[actualOffice].address.city,
      state: (await RussLyonConfig).offices[actualOffice].address.state,
      zip: (await RussLyonConfig).offices[actualOffice].address.zip,
    },
    link: (await RussLyonConfig).offices[actualOffice].link,
  }
}

export default getSignatureOfficeInfo
