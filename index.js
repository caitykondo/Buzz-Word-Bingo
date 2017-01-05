const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;


let buzzwordList = [];

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('HTML here');
});

app.get('/buzzwords', (req, res, next) => {
  res.json(buzzwordList);
});

app.post('/buzzwords', (req, res)=> {
  if (typeof req.body === 'object'){
    buzzwordList.push(req.body);
    res.json({'success': 'true'});
  }else{
    res.json({'success': 'false'});
  }
});

app.put('/buzzword', (req, res)=> {
  for(let i = 0; i < buzzwordList.length; i++){
    if (req.body.buzzWord === buzzwordList[i].buzzWord){
      let pointsValue = parseInt(buzzwordList[i].points);
      let reqPoints = parseInt(req.body.points);
      buzzwordList[i].points = pointsValue + reqPoints;
      buzzwordList[i].heard = true;
      res.json({'success': true,'newScore': buzzwordList[i].points});
    }
  }
});

app.delete('/buzzword', (req, res)=>{
  for(let i = 0; i < buzzwordList.length; i++){
    if(req.body.buzzWord === buzzwordList[i].buzzWord){
      buzzwordList.splice(i, 1, 0);
      res.json({'success': 'true'});
    }
  }
});

var server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s%s', host, port);
});