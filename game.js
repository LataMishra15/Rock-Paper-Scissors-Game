let userScore=0;
let compScore=0;
let round =1;

const choices= document.querySelectorAll(".choice");
const msg= document.querySelector("#msg");
const compImg = document.querySelector("#comp-move");

const updateRound=()=>{
    round++;
    document.querySelector("#round").innerText=`Round ${round}`;
};
const updateStar=()=>{
    star=["☆☆☆","⭐☆☆","⭐⭐☆","⭐⭐⭐"];
    document.querySelector("#user-star").innerText=star[userScore];
    document.querySelector("#comp-star").innerText=star[compScore];
};

const drawGame=()=>{
    msg.innerText="Its a Draw🌟";
    updateRound();
};
const showWinner=(userWin)=>{
    if(userWin){
        userScore++;
        msg.innerText="You Win the Round!🎉💗 ";
    }else{
        compScore++;
        msg.innerText="Computer Wins the Round... ";
    }
    updateRound();
    updateStar();
    Gameover();
};

const genCompChoice=()=>{
    const option =["Rock","Paper","Scissor"];
    const randomIndex=Math.floor(Math.random()*3);
    return option[randomIndex];
};
const playGame=(userCHoice)=>{
    console.log("user choice=" ,userCHoice);
    const compCHoice=genCompChoice();
    console.log("comp choice=",compCHoice);

    if(userCHoice===compCHoice){
        drawGame();
    }else{
        let userWin= true;
        if(userCHoice==="Rock"){
            userWin= compCHoice==="Paper"? false:true;
        }else if(userCHoice==="Paper"){
            userWin= compCHoice==="Scissor"? false:true;
        }else{
            userWin= compCHoice==="Rock"? false:true;
        }
        showWinner(userWin);
    }
    let img = document.createElement("img");
        // img.src = `${compCHoice}.png`;
        if(compCHoice==="Rock"){
            img.src="images/Rock img.png";
        }else if(compCHoice==="Paper"){
            img.src="images/Paper img.png";
        }else{
            img.src="images/Scissors img.png";
        }
        img.style.width="170px";
        img.style.height="180px";
        img.style.objectFit="cover";
        img.style.borderRadius="30px";
        compImg.innerText=" ";
        compImg.appendChild(img);

        setTimeout(() => {
        compImg.innerText= "✔";
        document.querySelector("#userStatus").innerText="Take your pick"
        msg.innerText=" ";
        }, 3000);
};
choices.forEach((val)=>{
    val.addEventListener("click",()=>{

        choices.forEach(c => c.style.pointerEvents = "none");

        const userCHoice= val.getAttribute("id");
        document.querySelector("#userStatus").innerText="You made a pick";
        playGame(userCHoice);

        choices.forEach(choice => {
        if (choice !== val) {
        choice.style.visibility = "hidden";
        }
        });

        setTimeout(() => {
            choices.forEach(c => c.style.pointerEvents = "auto");
            choices.forEach(choice => {
            choice.style.visibility= "visible";
            });
        }, 3000);
    });
});

const Gameover=()=>{
    if(userScore===3){
        localStorage.setItem("result","win");
    }else if(compScore===3){
        localStorage.setItem("result","lose");
    }else{
        return;
    }
        localStorage.setItem("userScore",userScore);
        localStorage.setItem("compScore",compScore);

        setTimeout(()=>{
            window.location.href="gameover.html";
        },2000);
    }