var TriviaGame = {
  MaxTime: 10000,
  QuestionTime: 0,  
  TransitionTime: 5000,
  QuestionsRight: 0,
  QuestionsWrong: 0,
  QuestionTimedOut: 0,
  QuestionsLeft: 0,
  CurQuestion: 0,
  GameInterval:"",
  GameTimeOut:"",
  Question: function (Q, A, C){
    this.Question = Q;
    this.Answer = A;
    this.Choice = C;    
  },
  arrQuestion: [],
  reset: function () {
    clearTimeout(TriviaGame.GameTimeOut);
    clearInterval(TriviaGame.GameInterval);
    TriviaGame.gameMusicPlayer = document.getElementById("MusicToggle");
    $("#splash").show();
    $("#run").hide();
    $("#TriviaOutcome").hide();
    

    var Qi = new TriviaGame.Question("What was the first console video game that allowed the game to be saved?","The Legend of Zelda",["The Legend of Zelda","Rush In Attack","A Bards Tale","Super Mario Brothers"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("Regarding data storage, what dose the acronym SSD stand for?","Solid State Drive",["Solid State Drive","Sequential Storage Drive","Solid State Disk","Sequential State Drive"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("Created in 2009 what was the first decentralized cryptocurrency?","Bitcoin",["Bitcoin","CryptoCoin","Visa","Debit Card"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("What does the acronym USB stand for when referring to a computer port?","Universal Serial Bus",["Universal Serial Bus","Universal State Bus","User Storage Bank","Unconnectable System Bucket"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("What do you call the small image icons used to express emotions or ideas in digital communications?","Emoji",["Emoji","Lol","Smiley","Emoticon"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("When referring to a computer monitor, what does the acronym LCD stand for?","Liquid Crystal Display",["Liquid Crystal Display","Laser Control Display","Lamda Cascading Digital","Line Crystal Dongle"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("When talking about computer mermory, what does the acronym ROM stand for?","Read Only Memory",["Read Only Memory","Random Only Memory","Rest Only Memory","Reset Off Memory"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("What do the letters in the acronym CD-ROM stand for?","Compact Disk Read Only Memory",["Compact Disk Read Only Memory","Computer Disk Read On Memory","Computer Digital Read Only Memory","Compound Digital Random Off Memory"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("Nintendo is a consumer electronics and video game company founded in what country?","Japan",["Japan","Korea","Germany","US"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("In a photo editing program, what do the letters RGB stand for?","Red, Green and Blue",["Red, Green and Blue", "Roy G. Biv", "Random Get Bit","Red, Green and Black"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("The first person shooter video game Doom was first released in what year?","1993",["1993","1992","1995","1994"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("In what year was the first Apple computer released?","1976",["1976","1974","1973","1970"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("In what year did Nintendo release its first game console in North America?","1985",["1985","1984","1986","1981"]);
    TriviaGame.arrQuestion.push(Qi);
    
    Qi = new TriviaGame.Question("In database programming, SQL is an acronym for what?","Structured Query Language",["Structured Query Language","Standard Question Language","Standard Query Language","Stochastic Question Limit"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("When referring to computer memory, what does the acronym RAM stand for?","Random Acess Memory",["Random Acess Memory","Read Access Memory","ROM Accessible Memory","Read Account Mapping"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("With over 17 million units produced, what was the highest selling single model of personal computer ever?","Commodore 64",["Commodore 64","IBM Clone","Apple II","Macintosh"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("Who is credited with inventing the first mechanical computer?","Charles Babbage",["Charles Babbage","Alan Turing","William Oughtred","Thomas A. Edison"]);
    TriviaGame.arrQuestion.push(Qi);

    TriviaGame.QuestionsLeft = TriviaGame.arrQuestion.length;
    CurQuestion = 0;
   
  },
  start(){
      $("#splash").hide();
      $("#run").show();
      $("#TriviaOutcome").hide();
      $("#timer").text(TriviaGame.timeConverter(TriviaGame.QuestionTime/1000));
      document.getElementById("SFX").play();
      TriviaGame.newquestion();
  },
  newquestion: function (){
    if(TriviaGame.CurQuestion < TriviaGame.arrQuestion.length){
      $("#timer").text("00:10");
      $("#splash").hide();
      $("#TriviaOutcome").hide();      
      $("#run").show();
      this.QuestionTime = this.MaxTime;
      $("#AskQuestion").text(this.arrQuestion[TriviaGame.CurQuestion].Question);
      
      clearInterval(TriviaGame.GameInterval);
      
      TriviaGame.GameInterval = setInterval(function(){TriviaGame.tick()},1000);
      var arrAns = [];
      var cnt = 1;
      $("#but1").empty();
      $("#but2").empty();
      $("#but3").empty();
      $("#but4").empty();
      
      while(arrAns.length < 4)
      {
        var rnd = Math.floor(Math.random() * 4);
        if(!arrAns.includes(rnd)){
          arrAns.push(rnd);
      
          var buttext = this.arrQuestion[TriviaGame.CurQuestion].Choice[rnd];
        
          var but = $("<button onclick='TriviaGame.answer(this)' class='ansbutton' id='ansbutton" + rnd + "'>" + buttext + "</button>");
          $("#but" + cnt).append(but);
        
          cnt ++;
        } 
      }

    }else{
      TriviaGame.gameover();
    }
      
  },
  right: function() {
    clearInterval(TriviaGame.GameInterval);
    $("#TriviaOutcome").show();      
    $("#run").hide();
    
    $("#outcomeTime").text("Correct!!!");
    $("#outcome").text("Time Remaining: " + TriviaGame.timeConverter(TriviaGame.QuestionTime/1000) + " seconds") ;
    $("#outcomeAnswer").text("");


    this.QuestionsRight ++;
    TriviaGame.CurQuestion++;
    TriviaGame.GameTimeOut = setTimeout(function(){TriviaGame.newquestion()},TriviaGame.TransitionTime);
  },
  wrong: function () {
    clearInterval(TriviaGame.GameInterval);
    
    $("#TriviaOutcome").show();      
    $("#run").hide();
    
    $("#outcomeTime").text("Incorrect");
    $("#outcome").text("Time Remaining: " + TriviaGame.timeConverter(TriviaGame.QuestionTime/1000) + " seconds") ;
    $("#outcomeAnswer").text("The correct answer was: " + this.arrQuestion[TriviaGame.CurQuestion].Answer);

    this.QuestionsWrong ++;
    TriviaGame.CurQuestion++;    
    TriviaGame.GameTimeOut = setTimeout(function(){TriviaGame.newquestion()},TriviaGame.TransitionTime);
  },
  gameover: function(){
    clearInterval(TriviaGame.GameInterval);
    $("#TriviaOutcome").show();      
    $("#run").hide();


    $("#outcomeTime").text("Game Over");
    $("#outcome").text("You answered " + this.QuestionsRight + " question(s) out of " + this.arrQuestion.length + " questions, correctly!");
    $("#outcomeAnswer").text("You didn't answer " + this.QuestionTimedOut + " question(s) and got "+ this.QuestionsWrong +" question(s) wrong.");

    TriviaGame.GameTimeOut = setTimeout(function(){TriviaGame.reset()},TriviaGame.TransitionTime*2);
  },
  tick: function(){
    TriviaGame.QuestionTime -= 1000;
    $("#timer").text(TriviaGame.timeConverter(TriviaGame.QuestionTime/1000));
    if(TriviaGame.QuestionTime <= 0){
      TriviaGame.timeout();      
    }    
  },
  answer: function(button){
      clearInterval(TriviaGame.GameInterval);
      document.getElementById("SFX").play();
      if(button.innerText===this.arrQuestion[TriviaGame.CurQuestion].Answer){
        this.right();
      }else{
        this.wrong();
      }

  },
  timeout: function() {
    clearInterval(TriviaGame.GameInterval);
    document.getElementById("SFX").play();
    $("#TriviaOutcome").show();      
    $("#run").hide();

    $("#outcomeTime").text("Time Out");
    $("#outcome").text("Time Remaining: " + TriviaGame.timeConverter(TriviaGame.QuestionTime/1000) + " seconds") ;
    $("#outcomeAnswer").text("The correct answer was: " + this.arrQuestion[TriviaGame.CurQuestion].Answer);

    TriviaGame.QuestionTimedOut++;
    TriviaGame.CurQuestion++;
    TriviaGame.GameTimeOut = setTimeout(function(){TriviaGame.newquestion()},TriviaGame.TransitionTime);
  },
  gameMusicPlayer:"", 
  gameSFXPlayer:document.getElementById("SFX"),
  gameMusic:$("#MusicToggle"),
  gameSFX:$("#SFX"),
  bGameMusicOn: true,
  mToggle: function () {    
    if(TriviaGame.bGameMusicOn){
      TriviaGame.gameMusicPlayer.pause();
      $("#MusicLabel").text("Music(Off)");
    }else{
      TriviaGame.gameMusicPlayer.play();  
      $("#MusicLabel").text("Music(On)");  
    }
    TriviaGame.bGameMusicOn = (!TriviaGame.bGameMusicOn);
  },
  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
}
$(document).ready(function(){{
  TriviaGame.reset();
  $("#Go").on('click', TriviaGame.start);
}});
