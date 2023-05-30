import getNumberEnding from '../format/get-number-ending'

const exponentialBackoffSync: RosterMechanics.Utils.General.Fn.ExponentialBackoffSync = <
  T extends (...args: unknown[]) => ReturnType<T>,
>({
  action,
  tryNumber = 1,
  maxNumTries = 10,
  name = 'default',
}: {
  action: T
  tryNumber?: number
  maxNumTries: number
  name: string
}): ReturnType<T> => {
  // version 1.0, written by --Hyde, 29 December 2022
  //  - see https://stackoverflow.com/a/74952372/13045193
  try {
    console.log(
      `Trying an async function (${name}) with exponential backoff for the ${
        tryNumber.toString() + getNumberEnding(tryNumber)
      } time`,
    )
    return action()
  } catch (err) {
    console.log('General.exponentialBackoffSync => error', err)
    if (tryNumber >= maxNumTries) {
      throw err
    }
    Utilities.sleep(2 ** (tryNumber - 1) * 1000)
    return exponentialBackoffSync({ action, tryNumber: tryNumber + 1, maxNumTries, name })
  }
}

export default exponentialBackoffSync
