export function formatMoney(n){
  if (n == null) return '-'
  return Number(n).toLocaleString()
}
