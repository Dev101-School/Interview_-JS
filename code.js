//Tile constructor
function Tiles(t){
	for(this.typeTile = 0; this.typeTile<this.types.length; this.typeTile++){
		if(this.types[this.typeTile]==t)
			break;
		if(this.typeTile==this.types.length)
			throw "Type " + t + " invalid!";
	}
}

//Tile types and probability
Tiles.prototype.types = ["NS", "EW", "WS", "ES", "EN", "NW", "EWS", "ENS", "ENW", "NWS"];
Tiles.prototype.pivotTable = [1,0,3,4,5,2,7,8,9,6];

Tiles.prototype.getType = function(){
	return this.types[this.typeTile];
}

//Pivot tile
Tiles.prototype.pivot90 = function(){
	this.typeTile = this.pivotTable[this.typeTile];
}

//parse to JSON
Tiles.prototype.toJSON = function(){
	return { typeTile: this.typeTile };
}

//decode from JSON
Tiles.prototype.fromJSON = function(o){
	this.typeTile = o.typeTile;
}

//Pawn constructor
function Pawn(i, j, symbol, color){
	this.i = i;
	this.j = j;
	this.symbol = symbol;
	this.color = color;
}

Pawn.prototype.i=0;
Pawn.prototype.j=0;

function Labyrinth(size){
	this.size = size;
	if(size%2 == 0 || size <2) //Check size to be an odd number
		throw "Invalid table size: " + size + " ! ";
	var h = (size - 1)/2;
	mobileTiles = new Array(size*size - (h+1)*(h+1) + 1);//Movable tiles
	var i=0;
	for(j=0; j<4*h; j++){
		mobileTiles[i++] = new Tiles("NS");
	}
	for(j=0; j<2*h; j++){
		mobileTiles[i++] = new Tiles("EWS");
	}
	while(i<mobileTiles.length){
		mobileTiles[i++] = new Tiles("WS");
	}
	this.tiles = new Array(size*size);
	for(i=0; i<size*size; i++)
		this.tiles[i] = new Tiles("NS");
	
	this.cell(0, 0, new Tiles("ES"));
	this.cell(0, size-1, new Tiles("WS"));
	this.cell(size-1, size-1, new Tiles("NW"));
	this.cell(size-1, 0, new Tiles("EN"));
	for(i=1; i<h; i++){
		this.cell(0, 2*i, new Tiles("EWS"));
		this.cell(2*i, size-1, new Tiles("NWS"));
		this.cell(size-1, 2*i, new Tiles("ENW"));
		this.cell(2*i, 0, new Tiles("ENS"));
	}
	for(i=1; i<h; i++)
		for(j=1; j<h; j++){
			if(j>1 && j <= h-i)
				this.cell(2*i, 2*j, new Tiles("EWS"));
			else if(j>=i && j>h-i)
				this.cell(2*i, 2*j, new Tiles("NWS"));
			else if(j<i && j>=h-i)
				this.cell(2*i, 2*j, new Tiles("ENW"));
			else
				this.cell(2*i, 2*j, new Tiles("ENS"));
		}
	

	var l = mobileTiles.length;
	for(i=0; i<size-1; i++)
		for(j=0; j<size-1; j++)
			if(i%2 != 0 || j%2 != 0){
				r = Math.floor(Math.random()*l--);
				this.cell(i,j,mobileTiles[r]);
				mobileTiles[r] = mobileTiles[l];

				p = Math.floor(Math.random()*4);
				while(p-- > 0)
					this.cell(i,j).pivot90();
			}
		
	
	this.lastInsert = undefined;
	this.TileT = mobileTiles[0];
	this.Pawns = new Array(5);

	this.Pawns[0] = new Pawn(0, 0, '<i class="fa fa-rocket" aria-hidden="true"></i>', "black");
	this.Pawns[1] = new Pawn(0, size-1, '<i class="fa fa-plane" aria-hidden="true"></i>', "black");
	this.Pawns[2] = new Pawn(size-1, 0, '<i class="fa fa-motorcycle" aria-hidden="true"></i>', "black");
	this.Pawns[3] = new Pawn(size-1, size-1, '<i class="fa fa-ship" aria-hidden="true"></i>', "black");
	this.Pawns[4] = new Pawn(Math.floor(this.size / 2), Math.floor(this.size / 2), '<i class="fa fa-trophy" aria-hidden="true" fa-4x></i>', "black");

	this.score = [0, 0, 0, 0];

	this.curPlayer = 0;
	this.extraUsed = false;
}

Labyrinth.prototype.mClick = false;

Labyrinth.prototype.cell = function(i,j,c){
	if(c==undefined)
		return this.tiles[i*this.size + j];
	this.tiles[i*this.size + j] = c;
}

//Make the tiles and paint them
Labyrinth.prototype.post = function(){
	function postCell(td,pos,c){

		var t = c.getType();

		switch(pos){
			case 0: // northwest corner
  	  			c.topLeftCornerCell = td;
  	  			td.style.backgroundColor = "#3366ff";
  	  			break;
  	  		case 1: // north margin
  	  	  		c.topMarginCell = td;
  	  	  		td.style.backgroundColor = t.includes("N") ? "lightblue" : "#3366ff";
  	  	  		break;
  	  		case 2: // northeast corner
  	  	  		c.topRightCornerCell = td;
  	  	  		td.style.backgroundColor = "#3366ff";
  	  	  		break;
  	  		case 3: // west margin
  	  	  		c.leftMarginCell = td;
  	  	  		td.style.backgroundColor = t.includes("W") ? "lightblue" : "#3366ff";
  	  	  		break;
  	  		case 4: // center
  	  	  		c.centerCell = td;
  	  	  		td.style.backgroundColor = "lightblue";
  	  	  		break;
  	  		case 5: // east margin
  	  	  		c.rightMarginCell = td;
  	  	  		td.style.backgroundColor = t.includes("E") ? "lightblue" : "#3366ff";
  	  	  		break;
  	  		case 6: // southwest corner
  	  	  		c.bottomLeftCornerCell = td;
  	  	  		td.style.backgroundColor = "#3366ff";
  	  	  		break;
  	    	case 7: //south margin
  	  	  		c.bottomMarginCell = td;
  	  	  		td.style.backgroundColor = t.includes("S") ? "lightblue" : "#3366ff";
  	  	  		break;
  	    	case 8:	//southeast corner
  	  	  		c.bottomRightCornerCell = td;
  	  	  		td.style.backgroundColor = "#3366ff";
  	  	  		break;
		}
	}

	//Creates labyrinth table
	table = document.getElementById("labyrinth");
	 table.innerHTML = ""; 
	 for(row = 0; row<3*this.size; row++)
	 {
	 	  tr = document.createElement("TR");
	 	  	if(row % 3 == 1)
	 	  	  tr.style.height = "5ex"; 
	 	  	else
	 	  	  tr.style.height = "1ex"; 
	 	  for(col = 0; col<3*this.size; col++)
	 	  {
	 	  	  td = document.createElement("TD");
	 	  	  td.appendChild(document.createTextNode(" "));
	 	  	  var i = Math.floor(row/3);
	 	  	  var j = Math.floor(col/3);
	 	  	  
	 	  	  td.setAttribute("onclick", "clickCase(" + i + ", " + j + ")");
	 	  	  td.setAttribute("ondrop", "drop(event, " + i + ", " + j + ")");
	 	  	  td.setAttribute("ondragover", "allowDrop(event)");
	 	  	  var c = this.cell(i, j);
   	 	  	if(col % 3 == 1)
	 	  	    td.style.width = "5ex";
	 	    else
	 	  	    td.style.width = "1ex";
		  	postCell(td, (row % 3)*3 + (col % 3), c);
	 	  	tr.appendChild(td);
	 	  	}
	 	  	table.appendChild(tr);
	 	}

	//Creates tile table
	table = document.getElementById("tileT");
	table.innerHTML = ""; 
	for(row = 0; row<3; row++)
	{
	 	tr = document.createElement("TR");
	 	  if(row % 3 == 1)
	 	  	tr.style.height = "5ex"; 
	 	  else
	 	  	tr.style.height = "1ex"; 
	 	 for(col = 0; col<3; col++)
	 	 {
	 	  	td = document.createElement("TD");
	 	  	td.appendChild(document.createTextNode(" "));
   	 	  	if(col % 3 == 1)
	 	  		td.style.width = "5ex";
	 	  	else
	 	    	td.style.width = "1ex";
	 	  	postCell(td, (row % 3)*3 + (col % 3), this.TileT);
	 	  	tr.appendChild(td);
	 	  }
	 	  table.appendChild(tr);
	}
	 	
	for(i = 0; i < 5; i++){
		c = this.cell(this.Pawns[i].i, this.Pawns[i].j);
		c.centerCell.innerHTML = this.Pawns[i].symbol;
		c.centerCell.style.border = "0";
		c.centerCell.style.textAlign = "center";
		c.centerCell.style.color = this.Pawns[i].color;
	}

	for(i = 0; i < 4; i++){
		document.getElementById("score" + i).innerHTML = this.score[i];
	}

	showAccess(this.Pawns[this.curPlayer].i, this.Pawns[this.curPlayer].j);

	msg = document.getElementById("status-msg");
	msg.innerHTML = "";	

	this.save();
}

//Make the movement
Labyrinth.prototype.push = function(i, j){
	if(this.extraUsed){
		throw "Extra tile alread used!";
	}

	if(this.lastInsert != undefined){
		if(i == this.lastInsert[0]){
			if(Math.abs(j - this.lastInsert[1]) == this.size - 1){
				throw "Last extra tile was inserted opposite to this postion!";
			}
		}
		else if(j == this.lastInsert[1]){
			if(Math.abs(i - this.lastInsert[0]) == this.size - 1){
				throw "Last extra tile was inserted opposite to this postion!";
			}
		}
	}

	if(j % 2 == 0 && i % 2 == 0){
		throw "Invalid position!";
	}

	var tempTile;

	if(i == 0){
		for(k = i; k < this.size; k++){
			tempTile = this.cell(k ,j);
			this.cell(k, j, this.TileT);
			this.TileT = tempTile;
		}

		for(p = 0; p < 5; p++){
			if(this.Pawns[p].j == j){
				this.Pawns[p].i = (this.Pawns[p].i + 1) % this.size;
			}
		}
	}
	else if(i == this.size - 1){
		for(k = i; k >= 0; k--){
			tempTile = this.cell(k ,j);
			this.cell(k, j, this.TileT);
			this.TileT = tempTile;
		}

		for(p = 0; p < 5; p++){
			if(this.Pawns[p].j == j){
				this.Pawns[p].i = (this.Pawns[p].i + this.size - 1) % this.size;
			}			
		}
	}
	else if(j == 0){
		for(k = j; k < this.size; k++){
			tempTile = this.cell(i, k);
			this.cell(i, k, this.TileT);
			this.TileT = tempTile;
		}

		for(p = 0; p < 5; p++){
			if(this.Pawns[p].i == i){
				this.Pawns[p].j = (this.Pawns[p].j + 1) % this.size;
			}			
		}
	}
	else if(j == this.size - 1){
		for(k = j; k >= 0; k--){
			tempTile = this.cell(i, k);
			this.cell(i, k, this.TileT);
			this.TileT = tempTile;
		}

		for(p = 0; p < 5; p++){
			if(this.Pawns[p].i == i){
				this.Pawns[p].j = (this.Pawns[p].j + this.size - 1) % this.size;
			}			
		}
	}
	else{
		throw "Invalid position!";
	}

	if(this.lastInsert == undefined){
		this.lastInsert = new Array(2);
	}
	this.lastInsert[0] = i;
	this.lastInsert[1] = j;
	this.extraUsed = true;

	this.post();
}

//End turn and also checks if the player has won
Labyrinth.prototype.endTurn = function(){
	if(!this.extraUsed){
		throw "You must use the extra tile before ending your turn!";
	}

	if(this.Pawns[this.curPlayer].i == this.Pawns[4].i && this.Pawns[this.curPlayer].j == this.Pawns[4].j){
		this.score[this.curPlayer] += 1;

		this.Pawns[4].i = Math.floor(Math.random() * this.size);
		this.Pawns[4].j = Math.floor(Math.random() * this.size);
	}

	this.curPlayer = (this.curPlayer + 1) % 4;
	this.extraUsed = false;

	this.post();
}


function totAccess(){
}

totAccess.prototype = Array.prototype;
totAccess.prototype.add = function(i,j){
	var c = labyrinth.cell(i,j);
	if(this.indexOf(c) >= 0)
		return;
	this.push(c);
	var t = c.getType();
	if(t.includes("N") && i>0){
		adj = labyrinth.cell(i-1,j);
		tAdj = adj.getType();
		if(tAdj.includes("S"))
			this.add(i-1, j);
	}
	if(t.includes("E") && j<labyrinth.size-1){
		adj = labyrinth.cell(i,j+1);
		tAdj = adj.getType();
		if(tAdj.includes("W"))
			this.add(i,j+1);
	}
	if(t.includes("S") && i<labyrinth.size-1){
		adj = labyrinth.cell(i+1,j);
		tAdj = adj.getType();
		if(tAdj.includes("N"))
			this.add(i+1,j);
	}
	if(t.includes("W") && j>0){
		adj = labyrinth.cell(i,j-1);
		tAdj = adj.getType();
		if(tAdj.includes("E"))
			this.add(i,j-1);
	}

}

Labyrinth.prototype.totalAccess = function(i,j){
	tilesAccess = new totAccess();
	tilesAccess.add(i,j);
	return tilesAccess;
}

//Shows accessible path
function showAccess(i,j){
	var total = labyrinth.totalAccess(i,j);
	for(i = 0; i<total.length; i++)
  	{
	    total[i].centerCell.style.backgroundColor = "#9999ff";
	    var t = total[i].getType();

	    if(t.includes("N"))
	      total[i].topMarginCell.style.backgroundColor = "#9999ff";
	    if(t.includes("E"))
	      total[i].rightMarginCell.style.backgroundColor = "#9999ff";
	    if(t.includes("S"))
	      total[i].bottomMarginCell.style.backgroundColor = "#9999ff";
	    if(t.includes("W"))
	      total[i].leftMarginCell.style.backgroundColor = "#9999ff";
    }
}

//Moves the pawn
function clickCase(i,j){
	if(labyrinth.extraUsed){
		try{
			var total = labyrinth.totalAccess(labyrinth.Pawns[labyrinth.curPlayer].i, labyrinth.Pawns[labyrinth.curPlayer].j);
			if(total.indexOf(labyrinth.cell(i,j)) < 0)
				throw "Invalid movement!";
			labyrinth.Pawns[labyrinth.curPlayer].i = i;
			labyrinth.Pawns[labyrinth.curPlayer].j = j;
			labyrinth.post();
		}
		catch(err){
			msg = document.getElementById("status-msg");
			msg.innerHTML = "Error: " + err;
		}
		labyrinth.mClick = true;
	}
	else{
		msg = document.getElementById("status-msg");
		msg.innerHTML = "Error: Use the extra tile first!";
	}
}

function deselect(){
	if(labyrinth.mClick)
		labyrinth.mClick = false;
	else
		labyrinth.post;
}

//Parse from JSON
Labyrinth.prototype.fromJSON = function(s){
	o = JSON.parse(s);
	this.size = o.size;
	this.tiles = new Array(this.size*this.size);
	for(i=0; i<this.size*this.size; i++){
		this.tiles[i] = new Tiles("NS");
		this.tiles[i].fromJSON(o.tiles[i]);
	}
	this.TileT = new Tiles("NS");
	this.TileT.fromJSON(o.TileT);


	this.lastInsert = o.lastInsert;
	
	this.Pawns = new Array(4);
	for(p = 0; p < 5; p++){
		this.Pawns[p] = o.Pawns[p];
	}

	this.curPlayer = o.curPlayer;
	this.extraUsed = o.extraUsed;
	this.score = o.score;
}

function serialize(){
	var msg = document.getElementById("status-msg");
	msg.innerHTML = JSON.stringify(labyrinth);

	labyrinth = new Labyrinth(3);
	labyrinth.fromJSON(msg.innerHTML);

	labyrinth.mClick = true;
	labyrinth.post();
	msg.innerHTML = "Labyrinth set and unset!";
}

Labyrinth.prototype.save = function(){
	localStorage.setItem("labyrinth", JSON.stringify(labyrinth));
	//msg.innerHTML = "Game Saved!";
}
