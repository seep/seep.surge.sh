export function pick(arr) {

  if (Array.isArray(arr)) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

}
