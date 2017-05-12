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
            [1,0,1,1,1,1],
            [1,2,2,1,1,0],
            [1,0,0,1,0,0]
          ];
var redPos = {i:2,j:0};
var tableau = document.querySelector("#page")

var draw = function(){
  var game = "";
  var style = "";
  for(var i=0;i<tabCols.length;i++){
    game += "<tr>";
    for(var j=0;j<tabCols[i].length;j++)
    {
      if(tabCols[i][j]>1||tabRows[i][j]>1) style='background:url(images/wood.jpg) no-repeat; border : 3px outset #713F1A;';
      else style = "background :none; border : none;";
      if(i==redPos.i&&j==redPos.j)style='background:url(images/redwood.jpg) no-repeat; border : 3px outset #713F1A;';
      if(tabCols[i][j]>0) game+='<td colspan="'+tabCols[i][j]+'" rowspan="'+tabRows[i][j]+'" style="'+style+'"></td>';
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
    console.log(memory);
    var taille = tabCols[memory.i][memory.j]
    if(taille>1)
    {
      if(tabCols[memory.i][memory.j+taille]==1&&tabRows[memory.i][memory.j+taille]==1){
        tabCols[memory.i][memory.j]=1;
        tabRows[memory.i][memory.j]=1;
        tabCols[memory.i][memory.j+1] = taille;
        tabRows[memory.i][memory.j+1] = 1;
        tabCols[memory.i][memory.j+taille] = 0;
        tabRows[memory.i][memory.j+taille] = 0;
        if(memory.i==redPos.i&&memory.j==redPos.j) redPos = {i:memory.i, j:memory.j+1};
        memory.j++;
      }
    }
  }
  if(e.key=="ArrowLeft"){
    var taille = tabCols[memory.i][memory.j];
    if(taille>1)
    {
      if(tabCols[memory.i][memory.j-1]==1&&tabRows[memory.i][memory.j-1]==1){
        tabCols[memory.i][memory.j-1] = taille;
        tabRows[memory.i][memory.j-1] = 1;
        tabCols[memory.i][memory.j]=0;
        tabRows[memory.i][memory.j]=0;
        tabCols[memory.i][memory.j+taille-1] = 1;
        tabRows[memory.i][memory.j+taille-1] = 1;
        if(memory.i==redPos.i&&memory.j==redPos.j) redPos = {i:memory.i, j:memory.j-1};
        memory.j--;
      }
    }
  }
  if(e.key=="ArrowDown"){
    var taille = tabRows[memory.i][memory.j];
    if(taille>1)
    {            
      if(tabCols[memory.i+taille][memory.j]==1&&tabRows[memory.i+taille][memory.j]==1){
        tabRows[memory.i][memory.j]=1;
        tabCols[memory.i][memory.j]=1;
        tabRows[memory.i+1][memory.j] = taille;
        tabCols[memory.i+1][memory.j] = 1;
        tabRows[memory.i+taille][memory.j] = 0;
        tabCols[memory.i+taille][memory.j] = 0;
        if(memory.i==redPos.i&&memory.j==redPos.j) redPos = {i:memory.i+1, j:memory.j};
        memory.i++;
      }
    }
  }
  if(e.key=="ArrowUp"){
    var taille = tabRows[memory.i][memory.j];
    if(taille>1)
    {      
      if(tabCols[memory.i-1][memory.j]==1&&tabRows[memory.i-1][memory.j]==1){
        tabRows[memory.i][memory.j]=0;
        tabCols[memory.i][memory.j]=0;
        tabRows[memory.i-1][memory.j] = taille;
        tabCols[memory.i-1][memory.j] = 1;        
        tabRows[memory.i+taille-1][memory.j]=1;
        tabCols[memory.i+taille-1][memory.j]=1;
        if(memory.i==redPos.i&&memory.j==redPos.j) redPos = {i:memory.i-1, j:memory.j};
        memory.i--;
      }
    }
  }
  draw();
  console.log(redPos);
  if(redPos.i==2&&redPos.j==4) gameOver();
})

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

var gameOver = function(){
  document.querySelector("#page").style.display = "none";
  document.querySelector("#gameOver").style.display = "block";
}