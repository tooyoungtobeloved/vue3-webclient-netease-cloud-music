export function transforStandardTimeStringtTotime(
  str: string,
): number | string {
  return /^\d{2}:\d{2}\.\d{2,3}/.test(str)
    ? str.split(/:|\./g).reduce((prev, cur, idx): number => {
        if (idx === 0) {
          return Number(cur) * 60 + prev
        } else if (idx === 1) {
          return Number(cur) + prev
        } else {
          return Number(prev + '.' + cur)
        }
      }, 0)
    : str
}

export function transformTimeToStandardTime(time: number): string {
  const integer = Math.trunc(time / 60) + ''
  const decimal = Math.trunc(time % 60) + ''
  return integer.padStart(2, '0') + ':' + decimal.padStart(2, '0')
}
