export default function catchErr(promise) {
  return promise.then(({ data }) => [null, data]).catch((err) => [err]);
}
