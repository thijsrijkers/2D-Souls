var $player = $('.player');
var $boss = $('.boss');
var bossNPC = 0;
$(".bonfire").hide();
$(".player").hide();
$(".boss").hide();
$("#death").hide();
$("#water").hide();
var leftCheck = 0;
document.getElementById("testmessage").innerHTML = "W=LEFT, D=RIGHT, Q=ROLL, E=ATTACK/INTERACT";
var bossAttackTime = 1400;
var bossWalkTime = 400;
var bossChoice = "Normal";
var flask = 2;
document.getElementById('flask').innerHTML = flask;
document.addEventListener("keydown",keyDownHandler, false);	
document.getElementById('bossname').innerHTML = "Sister Friede";

/////
////
//// PLAYER FUNCTION
////
////
////


function walkLeft()
{  
	var offsets = $('.player').offset();
	var left = offsets.left;
	var key = event.key 
	console.log(left);
	console.log(key);
	if(left > 8)
	{
		setTimeout(function() { $player.removeClass('walk'); }, 300);
		$('.player').addClass('walk');
		$player.addClass('.player').css({ marginLeft:'-=10px'});	
	}
}

function walkRight()
{
	var offsets = $('.player').offset();
	var left = offsets.left;
	var key = event.key 
	console.log(left);
	console.log(key);
	if(left < 840)
	{
		setTimeout(function() { $player.removeClass('walk'); }, 750);
		$('.player').addClass('walk');
		$player.addClass('.player').css({ marginLeft:'+=10px'});
	}    
}

function roll()
{
	var staminaPlayer = $('.staminaplayer').width();
	var offsets = $('.player').offset();
	var left = offsets.left;
	var key = event.key 
	console.log(left);
	console.log(key);
	if(staminaPlayer > 20)
	{
		if(left < 760)
		{
			$('.staminaplayer').addClass('.staminaplayer').css({ width:'-=40px'}); 
			setTimeout(function() { $player.removeClass('roll'); }, 300);
			$('.player').addClass('roll');
			$player.addClass('.player').css({ marginLeft:'+=100px'});
		}   
	} 
}

function rollLeft()
{
	var staminaPlayer = $('.staminaplayer').width();
	var offsets = $('.player').offset();
	var left = offsets.left;
	var key = event.key 
	console.log(left);
	console.log(key);
	if(staminaPlayer > 20)
	{
		if(left > 115)
		{
			$('.staminaplayer').addClass('.staminaplayer').css({ width:'-=40px'}); 
			setTimeout(function() { $player.removeClass('roll'); }, 300);
			$('.player').addClass('roll');
			$player.addClass('.player').css({ marginLeft:'-=100px'});
		}   
	} 
}

function attack()
{
	var staminaPlayer = $('.staminaplayer').width();
	var offsetPlayer = $('.player').offset();
	var offsetBoss = $('.boss').offset();
	var leftPlayer = offsetPlayer.left;
	var leftBoss = offsetBoss.left;
	var key = event.key 
	var hit = leftBoss - leftPlayer;
	console.log(leftPlayer);
	console.log(leftBoss);
	console.log(key);
	if(leftPlayer < 850)
	{
		if(staminaPlayer > 20)
		{
		setTimeout(function() { $player.removeClass('attack'); }, 150);
		$('.player').addClass('attack');
		if(hit > -80 && hit < 25)
			{
				var hpBoss = $('.healthboss').width();
				console.log("AN HIT HAS BEEN DETECTED");
				console.log(hpBoss);
				if(hpBoss > 0)
				{
					$('.healthboss').addClass('.healthboss').css({ width:'-=20px'}); 
				}
			}
			$('.staminaplayer').addClass('.staminaplayer').css({ width:'-=60px'}); 
			$player.addClass('.player').css({ marginLeft:'+=5px'}); 
		}
	}
}

function heal()
{
	var healthplayer = $('.healthplayer').width();
	var key = event.key 
	console.log(key);
	if(flask > 0)
	{
		if(healthplayer < 121)
		{
				$('.healthplayer').addClass('.healthplayer').css({ width:'+=60px'});
				flask -= 1; 
				document.getElementById('flask').innerHTML = flask;
		} 
	}
}


(function staminaReg() {
	var staminaPlayer = $('.staminaplayer').width();
	if(staminaPlayer < 150){
		$('.staminaplayer').addClass('.staminaplayer').css({ width:'+=40px'}); 
	}
	setTimeout(staminaReg, 800);

})();


/////
////
//// BOSS FUNCTION
////
////
////

(function move() {
	var hpPlayer = $('.healthplayer').width();
	var bossPlayer = $('.healthboss').width();
	if(hpPlayer < 1){
		$(".player").remove(); 
		$("#water").hide();
		setTimeout(function() { document.getElementById('mySound').pause(); }, 400);
		setTimeout(function() { document.getElementById('died').play(); }, 500);
		setTimeout(function() { $("#death").show(); }, 1000);
		
	}
	if(bossPlayer < 1){
		$(".boss").hide(); 
		$(".bonfire").show();
	}
	var offsetPlayer = $('.player').offset();
	var offsetBoss = $('.boss').offset();
	var leftPlayer = offsetPlayer.left;
	var leftBoss = offsetBoss.left;
	var cal = offsetPlayer.left - offsetBoss.left;
	console.log(leftPlayer);
	console.log(leftBoss)
	if(cal < -50)
	{
		walkLeftBoss();
	}else if(cal > 50)
	{
		walkRightBoss();
	}
	setTimeout(move, bossWalkTime);
})();

(function bossattack() {
	var offsetPlayer = $('.player').offset();
	var offsetBoss = $('.boss').offset();
	var leftPlayer = offsetPlayer.left;
	var leftBoss = offsetBoss.left;
	var hit = leftBoss - leftPlayer;
	console.log(hit);
	console.log(hit);
	console.log(hit);
	console.log(hit);
	console.log(hit);
	console.log("Hit");
	if( $('.boss').is(':visible') )
	{
		if(bossNPC == 0)
		{
			var random = Math.floor((Math.random() * 2) + 1);
			console.log("SisterFriede_Attack"+random);
			if(random == 1 && hit < 300 && hit > 100)
			{

					setTimeout(function() { $boss.removeClass('bossattackFriede'); }, 1000);
					$('.boss').addClass('bossattackFriede');
						var attackDone = 0;
						for(i=0; i<100; i++)
						{
							setTimeout(function() { 
								$boss.addClass('.boss').css({ marginTop:'-=1px'});
							}, 10);
							if(i == 50)
							{
								$boss.addClass('.boss').css({ marginLeft:'-=220px'});
							}
							if(i == 99)
							{
								$boss.addClass('.boss').css({ marginTop:'+=1px'});
								attackDone = 1;
							}
						}
						if(attackDone == 1)
						{	
							var counterState = 100;

								do
								{
									setTimeout(function() {
										$boss.addClass('.boss').css({ marginTop:'+=1px'});
									}, 200);
									counterState -= 1;
									console.log("Ik kom hier");
								}while(counterState > 0);
						}
						if(hit > -150 && hit < 300)
						{
							$('.healthplayer').addClass('.healthplayer').css({ width:'-=20px'});  	
						}
			}
			else
			{
				if(hit > -180 && hit < 50)
				{
					setTimeout(function() { $boss.removeClass('bossattack'); }, 1000);
					$('.boss').addClass('bossattack');
					$boss.addClass('.boss').css({ marginLeft:'-=5px'});
					if(hit > -100 && hit < 45)
					{	
						$('.healthplayer').addClass('.healthplayer').css({ width:'-=50px'});    
					}
				}		
			}
		}
		else
		{
			if(hit > -180 && hit < 50)
			{
				setTimeout(function() { $boss.removeClass('bossattack'); }, 150);
				$('.boss').addClass('bossattack');
				$boss.addClass('.boss').css({ marginLeft:'-=5px'});
				if(hit > -100 && hit < 45)
				{	
					$('.healthplayer').addClass('.healthplayer').css({ width:'-=70px'});    
				}
			}
		}
	}
	setTimeout(bossattack, bossAttackTime);
})();

function walkLeftBoss()
{  
	var offsets = $('.boss').offset();
	var left = offsets.left;
	console.log(left);
	if(left > 30)
	{
		setTimeout(function() { $boss.removeClass('walkboss'); }, 750);
		$('.boss').addClass('walkboss');
		$boss.addClass('.boss').css({ marginLeft:'-=20px'});	
	}
}

function walkRightBoss()
{
	var offsets = $('.boss').offset();
	var left = offsets.left;
	console.log(left);
	if(left < 800)
	{
		setTimeout(function() { $boss.removeClass('walkboss'); }, 750);
		$('.boss').addClass('walkboss');
		$boss.addClass('.boss').css({ marginLeft:'+=40px'});
	}    
}
////
////
//// MEAN FUNCTIONS
////
////

function off() {
	document.getElementById('mySound').play();
	document.getElementById("overlay").style.display = "none";
	var bossChoice = $("#bossChoice option:selected" ).text();
	var mode = $("#mode option:selected" ).text();
	if(bossChoice == "Sister Friede")
	{
		document.getElementById('bossname').innerHTML = "Sister Friede";
		$(".boss").css("background-image", "url(animationBOSSfriede.png)"); 
	}
	if(mode == "Hard")
	{
		bossAttackTime = bossAttackTime -600;
		bossWalkTime = bossWalkTime -200;
	}
	$(".player").show();
	$(".boss").show();
	$("#water").show();
}

function bonfireCheck() {
	var offsetPlayer = $('.player').offset();
	var offsetBonfire = $('.bonfire').offset();
	var leftPlayer = offsetPlayer.left;
	var leftBonfire = offsetBonfire.left;
	var inRange = leftBonfire - leftPlayer;
	console.log(inRange);
	if( $('.bonfire').is(':visible') )
	{
		console.log("Bonfire is visible");
		if(inRange > -60 && inRange < 60)
		{
			$(".bonfire").hide();
			if(bossAttackTime > 601)
			{
				bossAttackTime =  bossAttackTime - 200;
			}
			if(bossWalkTime > 99)
			{
				bossWalkTime =  bossWalkTime - 50; 
			}
			bossNPC = bossNPC + 1;
			if(bossNPC > 0)
			{
				document.getElementById('bossname').innerHTML = "Soul of Cinder";
				$(".boss").css("background-image", "url(animationBOSS.png)"); 
			}
			$(".boss").show(); 
			$boss.addClass('.boss').css({ marginLeft:'600px'});
			$('.healthboss').addClass('.healthboss').css({ width:'490px'}); 
			$('.healthplayer').addClass('.healthplayer').css({ width:'180px'});  
			$('.staminaplayer').addClass('.staminaplayer').css({ width:'180px'}); 
		}
	}
}

function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	console.log(keyPressed);

	if (keyPressed == "D")
	{	
			leftCheck = 0;
			keyPressed.onkeydown = walkRight();	
			$(".player").css("background-image", "url(animation.png)"); 	
	}

	else if (keyPressed == "R")
	{	
			keyPressed.onkeydown = heal();	
	}

	else if (keyPressed == "A")
	{	
			leftCheck = 1;
			keyPressed.onkeydown = walkLeft();	
			$(".player").css("background-image", "url(animationReverse.png)"); 	
	}
	else if (keyPressed =="Q")
	{
		if(leftCheck == 0)
		{
			keyPressed.onkeydown = roll();	
		}
		else
		{
			keyPressed.onkeydown = rollLeft();
		}	
	}
	else if (keyPressed =="E")
	{
		keyPressed.onkeydown = attack();		
		keyPressed.onkeydown = bonfireCheck();	
	}
}