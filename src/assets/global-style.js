// 扩大可点击区域
const extendClick = () => {
    return `
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}
// 一行文字溢出部分用... 代替
const noWrap = () => {
    return `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `
}

export default {
    'font-size-s': '12px',
    'font-size-m': '14px',
    'font-size-l': '16px',
    'font-size-ll': '18px',
    'font-size-ss': '10px',
    'theme-color': '#d44439',
    "border-color": '#e4e4e4',
    'font-color-desc': '#2E3030',
    'background-color': '#f2f3f4',
    'font-color-light': '#f1f1f1',
    'font-color-desc-v2': '#bba8a8',// 略淡
    'highlight-background-color': '#fff',
    'theme-color-shadow': 'rgba (212, 68, 57, .5)',
    'background-color-shadow': 'rgba (0, 0, 0, 0.3)',
    extendClick,
    noWrap
}
