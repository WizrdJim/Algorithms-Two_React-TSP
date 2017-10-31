const fs = require('fs');
//durh
const usaCityDump = () => {
    let data = fs.readFileSync(__dirname+'/data/usaCitiesSmall.txt', 'utf8');  
    const arr = [];
    let ys = /   /g;
    let xs =/ /;
    let name = / \| /;
    let closebracket = /\r/;
    data = data.replace(ys, '","y":"');
    data = data.split('\n');
    for (let i = 0; i < data.length - 1; i++) {
      data[i] = data[i].replace(xs, '{"x":"');
      data[i] = data[i].replace(name, '","name":"');
      data[i] = data[i].replace(closebracket, '"}');
      arr.push(JSON.parse(data[i]));
      // let obj = JSON.parse(data[i]);
      // arr.push(obj);
    }
    // console.log(Cities);
    //console.log(data);
  return arr
}

module.exports = usaCityDump;
