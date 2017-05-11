var tabCols = [
            [3,0,0,1,1,1],
            [2,0,2,0,0,1],
            [2,0,1,1,0,1],
            [2,0,1,1,1,1],
            [1,1,1,1,2,0],
            [1,0,0,3,0,0]
          ];

var tabRows = [
            [1,0,0,1,3,1],
            [1,0,1,0,0,1],
            [1,0,1,1,0,1],
            [1,1,1,1,1,0],
            [1,2,2,1,1,0],
            [1,0,0,1,0,0]
          ];

var tableau = document.querySelector("#page")

var reorder = function(){
  for(var i=0;i<tabCols.length;i++){
    for(var j=0;j<tabCols[i].length;j++)
    {
      if(tabCols[i][j]==0){
        tabCols[i].splice(j,1);
        tabCols[i].push(0);
        tabRows[i].splice(j,1);
        tabRows[i].push(0);
      }
    }
  }
}

reorder();

var draw = function(){
  var game = "";
  var color = "black";
  for(var i=0;i<tabCols.length;i++){
    game += "<tr>";
    for(var j=0;j<tabCols[i].length;j++)
    {
      if(tabCols[i][j]>1||tabRows[i][j]>1) color="yellow";
      else color = "black";
      if(tabCols[i][j]>0) game+='<td colspan="'+tabCols[i][j]+'" rowspan="'+tabRows[i][j]+'" style="background-color:'+color+'"></td>';
    }
    game += "</tr>";
  }
  tableau.innerHTML = game;
}
draw();


var memory = {};
document.addEventListener('click',function(e){
  memory.target = e.target;
  for(var i=0;i<tableau.querySelector("tbody").childNodes.length;i++){
    for(var j=0;j<tableau.querySelector("tbody").childNodes[i].childNodes.length;j++)
    {
      if(e.target==tableau.querySelector("tbody").childNodes[i].childNodes[j])
      {
          memory.i = i;
          memory.j = trouverPositionCols(i,j);
      }
    }
  }
})

document.addEventListener('keyup',function(e){
  if(e.key=="ArrowRight"){
    if(tabCols[memory.i][memory.j]>1)
    {
      if(tabCols[memory.i][memory.j+1]==1&&tabRows[memory.i][memory.j+1]==1){
        ancienneValeur = tabCols[memory.i][memory.j];
        tabCols[memory.i][memory.j]=1;
        tabCols[memory.i][memory.j+1] = ancienneValeur;
      }
    }
  }
  if(e.key=="ArrowLeft"){
    if(tabCols[memory.i][memory.j]>1)
    {
      if(tabCols[memory.i][memory.j-1]==1&&tabRows[memory.i][memory.j-1]==1){
        ancienneValeur = tabCols[memory.i][memory.j];
        tabCols[memory.i][memory.j]=1;
        tabCols[memory.i][memory.j-1] = ancienneValeur;
      }
    }
  }
  if(e.key=="ArrowDown"){
    var taille = tabRows[memory.i][memory.j];
    if(taille>1)
    {
      if(tabCols[memory.i+taille][trouverPositionRows(memory,taille)]==1&&tabRows[memory.i+taille][trouverPositionRows(memory,taille)]==1){
        ancienneValeur = taille;
        tabRows[memory.i][memory.j]=1;
        tabCols[memory.i][memory.j]=1;
        tabRows[memory.i+1][trouverPositionRows(memory,1)] = ancienneValeur;
        tabCols[memory.i+1][trouverPositionRows(memory,1)] = 1;
        tabRows[memory.i+taille][trouverPositionRows(memory,taille)] = 0;
        tabCols[memory.i+taille][trouverPositionRows(memory,taille)] = 0;
      }
    }
  }
  if(e.key=="ArrowUp"){
    var taille = tabRows[memory.i][memory.j];
    if(taille>1)
    {
      console.log("test taille passed");
      if(tabCols[memory.i-1][trouverPositionRows(memory,-1)]==1&&tabRows[memory.i-1][trouverPositionRows(memory,-1)]==1){
        console.log("test previous passed");
        ancienneValeur = taille;
        console.log((memory.i+taille-1)+' / '+memory.j);
        tabRows[memory.i][memory.j]=0;
        tabCols[memory.i][memory.j]=0;
        console.log("-1 :::: "+trouverPositionRows(memory,-1));
        tabRows[memory.i-1][trouverPositionRows(memory,-1)] = taille;
        tabCols[memory.i-1][trouverPositionRows(memory,-1)] = 1;
        tabRows[memory.i+taille-1][trouverPositionRows(memory,(taille-1))]=1;
        tabCols[memory.i+taille-1][trouverPositionRows(memory,(taille-1))]=1;
      }
    }
  }
  reorder();
  showTables();
  draw();
})


var showTables = function(){
  resultat = "";
  resultat2 = "";
  for(var i=0;i<tabCols.length;i++){
    for(var j=0;j<tabCols[i].length;j++)
    {
      resultat += tabCols[i][j] + ' ,';
      resultat2 += tabRows[i][j] + ' ,';
    }
    resultat += "\n";
    resultat2 += "\n";
  }
  console.info("####################################");
  console.log(resultat);
  console.log(resultat2);
}

var trouverPositionCols = function(i,pos){
  var k=-1;
  var z=0;
  for(var j=0;j<tabCols[i].length;j++)
  {
    if(tabCols[i][j]>0)k++;
    if(k==pos){
      z=j;
      break;
    }
  }
  return z;
}

var trouverPositionRows = function(memo,offset){
  posx = memo.i;
  posy = memo.j;
  console.log(posx+' / '+posy);
  var somme = 0;
  var somme2 = 0;
  var z=0;
  for(var j=0;j<posy;j++)
  {
    somme += tabCols[posx][j];
  }
  for(var j=0;j<tabCols[posx+offset].length;j++)
  {
    somme2 += tabCols[posx+offset][j];
    if(somme==somme2){
      z = j+1;
      break;
    }
  }
  return z;
}
