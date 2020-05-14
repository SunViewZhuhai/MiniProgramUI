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

const getDateRange = (startDate, len, isPast, format) => {
  let sign = isPast ? -1 : 1
  let list = []
  for(var i=0;i<len;i++){
    let temp = new Date(startDate.valueOf())
    temp.setDate(temp.getDate() + i * sign)
    list.push(temp)
  }
  list = list.sort((a,b) => {return a-b}) 
  return list.map(x => dateFormat(x, format))
}
// fn: (param) => { params.property }
const groupBy = (list, fn) => {
  const groups = {};
  list.forEach(function (o) {
      const group = fn(o);
      groups[group] = groups[group] || [];
      groups[group].push(o);
  });
  return groups;
}
module.exports = {
  formatTime: formatTime,
  dateFormat: dateFormat,
  getDateRange: getDateRange,
  groupBy: groupBy
}
