export function getItem(item: any) {
  if (import.meta.client) {
    return localStorage.getItem(item)
  } else {
    return undefined
  }
}

export function setItem(item: any, value: any) {
  if (import.meta.client) {
    localStorage.setItem(item, value)

    return true
  } else {
    return false
  }
}