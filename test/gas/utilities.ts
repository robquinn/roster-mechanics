import moment from 'moment-timezone'

type IUtilities = RosterMechanics.Test.Utilities.IUtilities

export default class Utilities implements IUtilities {
  private readonly moment: typeof moment
  private readonly sleepFn: (ms: number) => Promise<void>
  constructor() {
    this.moment = moment
    this.sleepFn = async (ms: number) => {
      await new Promise((resolve) => {
        const timeoutRef = setTimeout(resolve, ms)
        timeoutRef.unref()
      })
    }
  }

  sleep(milliseconds: number): void {
    this.sleepFn(milliseconds)
      .then(() => ({}))
      .catch((err) => {
        console.log('Utilities.sleep() ERRROR', err)
      })
  }

  formatDate(date: Date, timeZone: string, format: string): string {
    let momentFormat = ''
    if (format === 'yyyy-MM-dd') momentFormat = 'YYYY-M-D'
    else if (format === 'MM/dd/yyyy HH:mm') momentFormat = 'M/D/YYYY hh:mm'

    return this.moment(date).tz(timeZone).format(momentFormat)
  }

  // eslint-disable-next-line class-methods-use-this
  formatString(template: string, ...args: Array<string | number | object>): string {
    // %o or %O Object
    // %d or %i Integer
    // %s String
    // %f floating point
    const re = /(%\d*\.*\d*[oOdisf])+/g

    const numDigitsAfterDecimal = (strSubstitute: string): number => {
      // const regexpBeforeDecimal = /(?<=(%))\d*(?=(.\d*[idf]))/g
      const regexpAfterDecimal = /(?<=(%\d*.))\d*(?=([idf]))/g
      const numDigitsMatch = strSubstitute.match(regexpAfterDecimal)
      const numDigits = numDigitsMatch != null && numDigitsMatch?.length > 0 ? parseInt(numDigitsMatch[0], 10) : 0
      return numDigits
    }
    const matches = template.match(re)

    let formated = template

    if (matches != null) {
      matches.forEach((substitue, idx) => {
        switch (true) {
          case /%[oO]/g.test(substitue):
            formated = formated.replace(substitue, JSON.stringify(args[idx]))
            break
          case /%\d*\.*\d*[di]/g.test(substitue): {
            const intDigits = numDigitsAfterDecimal(substitue)

            const integer = Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumIntegerDigits: intDigits,
              useGrouping: false,
            }).format(parseInt(args[idx] as string, 10))

            formated = formated.replace(substitue, integer)

            break
          }

          case /%[s]/g.test(substitue): {
            formated = formated.replace(substitue, args[idx] as string)
            break
          }
          case /%\d*\.*\d*[f]/g.test(substitue): {
            const fpDigits = numDigitsAfterDecimal(substitue)
            console.log('fpDigits', fpDigits)
            const fp = Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: fpDigits,
              useGrouping: false,
            }).format(parseInt(args[idx] as string, 10))

            formated = formated.replace(substitue, fp)

            break
          }
          default:
            formated = formated.replace(substitue, (args[idx] as string | number).toString())
            break
        }
      })
    }
    return formated
  }
}
