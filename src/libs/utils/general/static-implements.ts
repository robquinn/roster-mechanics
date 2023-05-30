/* class decorator */
function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    return constructor
  }
}
export default staticImplements
