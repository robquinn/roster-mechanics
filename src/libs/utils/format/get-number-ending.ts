const getNumberEnding: RosterMechanics.Utils.Format.Fn.GetNumberEnding = (n: number): string => {
  const num = parseInt(n.toString()[n.toString().length - 1], 10)
  let ending
  switch (true) {
    case num === 1:
      ending = 'st'
      break
    case num === 2:
      ending = 'nd'
      break
    case num === 3:
      ending = 'rd'
      break
    case num === 0 || num === 4 || num === 5 || num === 6 || num === 7 || num === 8 || num === 9:
      ending = 'th'
      break
    default:
      ending = 'th'
      break
  }
  return ending
}

export default getNumberEnding
