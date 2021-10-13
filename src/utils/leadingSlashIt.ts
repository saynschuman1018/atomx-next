export const leadingSlashIt = function(url: string) {
  return url.slice(1) === '/' ? url : `/${url}`
}
