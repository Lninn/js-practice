export const UTILS = {
  log: console.log.bind(console),
  e(s) {
    return document.querySelectorAll(s);
  },
  $(s) {
    return this.e(s)[0];
  },
  $s(s) {
    return this.e(s);
  },
};
