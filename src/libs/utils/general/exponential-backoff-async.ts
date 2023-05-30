import getNumberEnding from '../format/get-number-ending'

const exponentialBackoffAsync: RosterMechanics.Utils.General.Fn.ExponentialBackoffAsync = async <
  T extends (...args: unknown[]) => Promise<unknown>,
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
}): Promise<unknown> => {
  // version 1.0, written by --Hyde, 29 December 2022
  //  - see https://stackoverflow.com/a/74952372/13045193
  try {
    console.log(
      `Trying an async function (${name}) with exponential backoff for the ${
        tryNumber.toString() + getNumberEnding(tryNumber)
      } time`,
    )
    return await action()
  } catch (err) {
    console.log('General.exponentialBackoffAsync_ => error', err)
    if (tryNumber >= maxNumTries) {
      throw err
    }
    Utilities.sleep(2 ** (tryNumber - 1) * 2000)
    return await exponentialBackoffAsync({ action, tryNumber: tryNumber + 1, maxNumTries, name })
  }
}

export default exponentialBackoffAsync
