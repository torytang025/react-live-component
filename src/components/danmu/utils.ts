export function getWsEndpoint() {
  if (window.location.protocol === 'http:') {
    return `ws://${window.location.hostname}:8000`;
  } else if (window.location.protocol === 'https:') {
    return `wss://${window.location.hostname}:8000`;
  } else {
    console.warn('获取ws地址失败');
  }
}
