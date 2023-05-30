declare namespace RosterMechanics {
  namespace GoogleApps {
    namespace Gmail {
      namespace Fn {
        type GetSignatureHtml = ({
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
        }) => Promise<string>
        type GetSignatureOfficeInfo = (officeName: string) => Promise<Objs.OfficeInfo>
      }

      namespace Objs {
        interface OfficeInfo {
          address: {
            street: string
            city: string
            state: string
            zip: string
          }
          link: string
        }
      }
    }
  }
}
