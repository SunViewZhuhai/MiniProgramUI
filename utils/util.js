const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const dateFormat = (date, format) => {
    var rule = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S+": date.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in rule) {
      if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? rule[k] : ("00" + rule[k]).substr(("" + rule[k]).length));
      }
  }
  return format;
}

module.exports = {
  formatTime: formatTime,
  dateFormat: dateFormat,
}
