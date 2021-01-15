let index = 0;
let order = [];
let tabReponse = [];
let choosed = false;
let dataJson;
let afficherCorrectionState = false;
let choosedQuestion;
let indexOrder = 0;

$.ajax({
    url: "question.json",
    type: "GET",
    dataType: "json",
    success:function(data){
        dataJson = data;
        order = randomTab(data.len);
        resetAll(data);

        accepter(choosedQuestion);
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
            clickReponse($(this))
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
            if(indexOrder <= order.length - 1){
                resetAll(data);
                choosed = null;
            }
            else{
                if(!afficherCorrectionState){
                    reset();
                    afficherCorrectionState = true;
                    afficherCorrection(tabReponse);
                }
            }
        }
    })
}

function resetAll(data){
    $(".reponse").remove();
    choosed = false;
    choosedQuestion = afficher(dataJson);
    accepter(choosedQuestion);

}

function afficherCorrection(tab){
    $("#question").html("").css({
        fontSize: "2rem"
    });
    for(let i = 0; i<tab.length; i++) {
        if(tab[i][0] !== tab[i][1])
            document.getElementById("question").innerHTML += "A la question : " + dataJson["question" + order[i]].question + " vous avez repondu " + tab[i][0] + " a la place de " + tab[i][1] + "<br>"
    }
}

