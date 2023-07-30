export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  export function formatCurrency(val: number){
    return "\u00A3" + (val/100).toFixed(2);
  }