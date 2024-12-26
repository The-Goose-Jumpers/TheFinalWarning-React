export function any(array, ...values) {
  return values.some(value => array.includes(value));
}

export function all(array, ...values) {
  return values.every(value => array.includes(value));
}
