
// playing sounds
function playAudio(url) {
    new Audio(url).play();
  }

var previousButton=[-1,-1];
var activeButton,imgCharacter=[-1,-1];
var turn,Player=['A','B'],plr=0;

function setPlayerImg(a,p)
{   
    imgCharacter[p]=a; 
 
    // select character
  document.getElementById("player2").innerHTML ="Player 2";
  playAudio('src/click.mp3');

}
 


// selecting character

function selectChar(v){
 if(plr<2)
    {document.querySelector('.c'+v).style.backgroundColor='#EA2234';
    document.querySelector('.c'+v).style.boxShadow ='10px 20px 40px #D93F0F';
   
   if(plr == 0 || v !== imgCharacter[0])
   {setPlayerImg(v,plr);
    plr++;
    }else{
        swal("Same Avatar","player 2 can not have same avatar","error");
        playAudio('src/Alert.mp3');}

}
else{
    // console.log('can select only 2 avatar');
    swal("Oops", "you can select only 2 avatar", "error");
    playAudio('src/Alert.mp3');
}
}

document.querySelector('.start-btn').addEventListener('click',function(){
    playAudio('src/click.mp3');
if(imgCharacter[0] != '-1' && imgCharacter[1] != '-1'){
    document.querySelector('.start').style.display='none';
    document.querySelector('.wrapper').style.display='block';

// inactive section
  for(var i=3;i<=8;i++)
    {for(var j=6;j>0;j--){
        if(i!==8 ||j!== 1)
        document.querySelector('.box'+i+j).style.background='#BEAEB7';  /*console.log('box'+i+j);*/}
    }

    initial();}
    else{
        // console.log('character not selected');
        swal("Oops", "Avatar not selected", "error");
        playAudio('src/Alert.mp3');   
    }
    
});


function initial(){
    //removing all other character 
    for(var i=1 ;i<=37; i++)
       document.querySelector(".c"+i).style.display="none";
     

    // assigning player image
        document.querySelector('#p1').style.display="block";
        document.querySelector('#p1').src = "src/img"+imgCharacter[0]+".png"; 
        document.querySelector('#p2').style.display="block";
        document.querySelector('#p2').src = "src/img"+imgCharacter[1]+".png";
        
    
turn=1; activeButton=previousButton=[-1,-1];
document.querySelector('#p1').style.backgroundColor='#5DCBBA';
document.querySelector('#p1').style.boxShadow='10px 20px 40px #85B98F';
document.querySelector('#p2').style.backgroundColor='#F2DC9B';
document.querySelector('#p2').style.boxShadow='10px 20px 40px #EF9348';
document.querySelector('.token-'+8+1).style.display='none';

}

function dothis(x,y) {
    activeButton=[x,y];
    // console.log('active ['+activeButton[0]+','+activeButton[1]+'] & previous ['+previousButton[0]+','+previousButton[1]+']');
    

if(previousButton[0] === -1 && previousButton[1] === -1){
    
     //active section
      if(x<3 || y>6)
      {document.querySelector('.token-'+x+y).style.display='block';
      previousButton=activeButton;
      playAudio('src/token.mp3');
      looses();

      //activating box
      for(var i=3;i<=8;i++){
         for(var j=6;j>0;j--){
             if(i!==8 || j!== 1)
          document.querySelector('.box'+i+j).style.background='antiquewhite'; /* console.log('box'+i+j);*/}
         }
     }
      else{
        //   alert(' start with  active section');
        swal("Not allowed", "start with  active section", "error");
        playAudio('src/Alert.mp3');   
      }
        
}
else if(( x > previousButton[0] &&  y < previousButton[1] ) || ( x > previousButton[0] && y === previousButton[1]  ) || ( x === previousButton[0] && y < previousButton[1]) ){
    if(x !== previousButton[0] && y !== previousButton[1])
       { if(Math.abs(x - previousButton[0]) === Math.abs(y - previousButton[1])){
          document.querySelector('.token-'+x+y).style.display='block';
          document.querySelector('.token-'+previousButton[0]+previousButton[1]).style.display='none';
          previousButton=activeButton; 
          playAudio('src/token.mp3');
          looses();
        }
        else{
            // console.log('can\'t move in that direction');
            swal("Not allowed", "can't move in that direction", "error");
            playAudio('src/Alert.mp3');  
        }
       }
       else{
    
        document.querySelector('.token-'+x+y).style.display='block';
        document.querySelector('.token-'+previousButton[0]+previousButton[1]).style.display='none';
        previousButton=activeButton; 
        playAudio('src/token.mp3');
        looses(); }
         
    }else{
        swal("Not allowed", "can't move in that direction", "error"); 
        playAudio('src/Alert.mp3');  
    }
  
}

function looses()
{    // turn is either 1 or 2
    if(activeButton[0] == 8 && activeButton[1] == 1)
    { console.log(Player[turn-1]+' looses the game');
        document.querySelector('#p'+turn).style.backgroundColor='#EA2234';
        document.querySelector('#p'+turn).style.boxShadow ='10px 20px 40px #D93F0F';
        
    setTimeout(() => { winner();}, 500);

    setTimeout(() => { reset();}, 3000);
      
    }else{
       
        document.querySelector('#p'+turn).style.backgroundColor='#F2DC9B';
        document.querySelector('#p'+turn).style.boxShadow='10px 20px 40px #EF9348';
        turn === 1 ? turn = 2 : turn = 1;
        document.querySelector('#p'+turn).style.backgroundColor='#5DCBBA';
        document.querySelector('#p'+turn).style.boxShadow='10px 20px 40px #85B98F';

    }
}

function reset(){   // display start menu
                    document.querySelector('.WinLose').style.display='none';
                     document.querySelector('.start').style.display='block'; 

                     // p1 and p2 
                     document.querySelector('#p1').style.display="none";
                     document.querySelector('#p2').style.display="none";
                      
                     //adding all other character 
                       for(var i=1 ;i<=37; i++)
                        {document.querySelector(".c"+i).style.display="block";
                        document.querySelector('.c'+i).style.backgroundColor='#5DCBBA';
                        document.querySelector('.c'+i).style.boxShadow ='10px 20px 40px #85B98F';}

                    // rersetting imgCharacter  & plr & player 1(inner html)
                    document.getElementById("player2").innerHTML ="Player 1";
                    imgCharacter=[-1,-1]; plr=0; 
}
function winner(){   
                     document.querySelector('.wrapper').style.display='none';
                     document.querySelector('.WinLose').style.display='block';
                     turn === 2 ? turn=1 : turn =2;
                     document.querySelector('#p').src='src/img'+imgCharacter[turn-1]+".png"; 
                     document.getElementById("win").innerHTML ="Player "+turn+" Winner !";

                     playAudio('src/winner.mp3');
}
