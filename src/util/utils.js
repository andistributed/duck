function formatTime(v,sep) {
  return v?v.split('T').join(sep||' ').split('+')[0]:'';
}

function formatTimeEach(rows,keys,sep) {
  if(rows) for (var i = 0; i < rows.length; i++) {
    for(var k of keys) rows[i][k] = formatTime(rows[i][k],sep);
  }
  return rows;
}

export default {
  formatTime: formatTime,
  formatTimeEach: formatTimeEach
};
