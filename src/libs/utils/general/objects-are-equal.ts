const objectsAreEqual: RosterMechanics.Utils.General.Fn.ObjectsAreEqual = async (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): Promise<boolean> => {
  return await new Promise((resolve) => {
    const obj1Length = Object.keys(obj1).length
    const obj2Length = Object.keys(obj2).length

    if (obj1Length === obj2Length) {
      resolve(
        Object.keys(obj1).every((key) => Object.prototype.hasOwnProperty.call(obj2, key) && obj2[key] === obj1[key]),
      )
    }
    resolve(false)
  })
}

export default objectsAreEqual
