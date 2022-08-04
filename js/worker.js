addEventListener('message', function (e) {
  let indata = JSON.parse(e.data)
  console.log(indata)
  switch (indata.type){
    case 'add1':
      postMessage(JSON.stringify({
        type: 'add1',
        num: indata.num+1
      }));
      break;
    case 'add2':
      postMessage(JSON.stringify({
        type: 'add2',
        num: indata.num+2
      }));
      break;
    default:  
      break;
  }
}, false);