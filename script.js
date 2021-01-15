let index = 0;
let order = [];
let tabReponse = [];
let choosed = false;
let dataJson;
let afficherCorrectionState = false;
let choosedQuestion;
let indexOrder = 0;
let run = false;
let seconde = 0;

$.ajax({
    url: "question.json",
    type: "GET",
    dataType: "json",
    success:function(data){
        dataJson = data;
        order = randomTab(data.len);
        start(data);
        startTimer();
    }
})

function chooseRandom(max){return Math.trunc(Math.random() * max) + 1;}

function randomTab(max){
    let tab = [];
    let random = chooseRandom(max);
    while(tab.length < max ){
        if(tab.includes(random)){random = chooseRandom(max);}
        else{tab.push(random);}
    }
    return tab;
}

function afficher(data){
    let choosedIndex = "question" + order[index];
    $("#question").text(data[choosedIndex].question);
    for(let i = 1; i < data[choosedIndex].len + 1; i++){
        let reponse = document.createElement("div");
        reponse.className = "reponse";
        $("#reponseDiv").append(reponse);
        $(reponse).click(function() {
            reset();
            clickReponse($(this));
        })

    }
    let indexTab = 0;
    for(property in data[choosedIndex].reponse){
        $(".reponse").get(indexTab).innerHTML = property
        indexTab++;
    }
    index++;
    return data[choosedIndex].reponse;
}

function clickReponse(elem){
    choosed = elem;
    elem.css({
        border : "1px solid red"
    })
}

function reset(){
    choosed = false;
    $(".reponse").css({
        border : "1px solid black"
    })
}

function accepter(data){
    $("#accepter").unbind("click").click(function(){
        let indexElem = 0;
        let matchIndex;
        for(let i in data) {
            indexElem++;
            if (data[i]) {
                matchIndex = i;
                break;
            }
        }

        if(typeof(choosed) === "object"){
            tabReponse.push([choosed.html(), matchIndex]);
            indexOrder++;
            if(indexOrder < order.length){
                resetAll(data);
                choosed = null;
            }
            else{
                console.log("else")
                if(!afficherCorrectionState){
                    reset();
                    afficherCorrectionState = true;
                    afficherCorrection(tabReponse);
                    afficherResetButton();
                    run = false;
                }
            }
        }
    })
}

function resetAll(){
    $(".reponse").remove();
    $("#question").html("");
    choosed = false;
    choosedQuestion = afficher(dataJson);
    accepter(choosedQuestion);


}

function afficherCorrection(tab){
    let point = 0;
    $("#question").html("").css({
        fontSize: "2rem"
    });
    for(let i = 0; i<tab.length; i++) {
        if(tab[i][0] !== tab[i][1]){
            document.getElementById("question").innerHTML += "A la question : " + dataJson["question" + order[i]].question + " vous avez repondu " + tab[i][0] + " a la place de " + tab[i][1] + "<br>";
        }
        else{
            point ++;
        }
    }
    let score = document.createElement("span");
    score.id = "score";
    score.innerHTML += "Score : " + point + "/" + tab.length;
    $("#question").append(score);
}

$("#accepter").mousedown(()=>{
    $("#accepter").css({
        backgroundColor: "red"
    })
}).mouseup(()=>{
    $("#accepter").css({
        backgroundColor: "white"
    })
})

function start(){
    $("#question").html("");
    $("#start").show();
    $("#start").click(()=>{
        afficherCorrectionState = false;
        tabReponse = [];
        indexOrder = 0;
        run = true;
        index = 0;
        seconde = 0;
        $("#start").hide();
        resetAll();
        accepter(choosedQuestion);
        $("#question").css({
            fontSize: "4rem"
        });
    })
}

function startTimer(){
    let timer = function (){
        setTimeout(() => {
            if(run){
                afficherTime(seconde);
                seconde ++;
            }
            timer();
        },1000);
    }
    timer();
}

function afficherTime(time){
    $("#time").html(time + "<br>secondes");
}

function afficherResetButton(){
    let resetButton = document.createElement("div");
    resetButton.innerHTML = "Restart";
    resetButton.id = "reset";
    $(resetButton).click(() => {
        index = 0;
        start(dataJson);
        $(resetButton).remove();
    })
    $("#action").append(resetButton);
}