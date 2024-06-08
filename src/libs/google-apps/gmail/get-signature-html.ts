import getSignatureOfficeInfo from './get-signature-office-info'

const getSignatureHtml: RosterMechanics.GoogleApps.Gmail.Fn.GetSignatureHtml = async ({
  firstName,
  lastName,
  officeName,
  phoneNumber,
  emailAddress,
}: {
  firstName: string
  lastName: string
  officeName: string
  phoneNumber: string
  emailAddress: string
}): Promise<string> => {
  const officeInfo = await getSignatureOfficeInfo(officeName)
  return `<font style="font-family:Verdana,'sans-serif';font-size: 10pt;color:#333;">
<table width="600" border="0" cellspacing="0" cellpadding="0" style="line-height: 14px; font-size: 11px;">
<tr>
  <td width="106" rowspan="2" style="border-right: 1px solid #000;">
    <a href="https://www.russlyon.com/"><img src="https://russ-lyon.s3-us-west-1.amazonaws.com/images/russ-lyon-signature.png" width="96" height="88" border="0"></a>
  </td>
  <td width="8">
  </td>
<td colspan="6">
  <font style="font-family:Verdana,'sans-serif';font-weight:normal;color:#000;font-size:15px;">${firstName} ${lastName}</font>
  <br />
  <font style="font-family:Verdana,'sans-serif';color:#000;font-size:12px;font-weight:normal;">Global Real Estate Advisor</font>
  <br /><br />
  <font style="font-family:Verdana,'sans-serif';color:#000;font-size:12px;">Russ Lyon Sotheby's International Realty
  <br />
  <a href="${officeInfo.link}" style="font-family:Verdana,'sans-serif';color:#15c;text-decoration:none;font-weight:normal;">${officeInfo.address.street}, ${officeInfo.address.city}, ${officeInfo.address.state} ${officeInfo.address.zip}</a>
  <br />
  <a href="tel:${phoneNumber}" style="font-family:Verdana,'sans-serif';color:#15c;text-decoration:none;font-weight:normal;">${phoneNumber}</a> | <a href="mailto:${emailAddress}" style="font-family:Verdana,'sans-serif';color:#15c;text-decoration:none;font-weight:normal;">${emailAddress}</a> | <a href="https://www.russlyon.com" style="font-family:Verdana,'sans-serif';color:#15c;text-decoration:none;font-weight:normal;font-size:12px;">russlyon.com</a></font>
 </td>
</tr>
</table>
</p>
<br />
`
}

export default getSignatureHtml
