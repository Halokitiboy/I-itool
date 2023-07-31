export const  extractLinkFromString = (str)=> {
    // 定义匹配链接的正则表达式
    const regex = /(https?:\/\/[^\s]+)/g;
    
    // 使用正则表达式匹配链接
    const matches = str.match(regex);
    
    if (matches && matches.length > 0) {
      // 如果有匹配到链接，则返回第一个匹配到的链接
      return matches[0];
    } else {
      // 如果没有匹配到链接，则返回空字符串或者可以选择返回 null 或 undefined
      return "";
    }
  }