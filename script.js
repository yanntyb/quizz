let index = 0;
let order = [];
let tabReponse = []

$.ajax({
    url: "question.json",
    type: "GET",
    dataType: "json",
    success:function(data){
        order = randomTab(data.len);
        afficher(data)
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
    let choosedIndex = "question" + order[index]
    $("#question").text(data[choosedIndex].question);
    for(let i = 1; i < data[choosedIndex].len + 1; i++){
        let reponse = document.createElement("div");
        reponse.className = "reponse";
        $("#reponseDiv").append(reponse);
        $(reponse).click(function() {
            clickReponse($(this))
        })
    }
    let indexTab = 0;
    for(property in data[choosedIndex].reponse){
        $(".reponse").get(indexTab).innerHTML = property
        indexTab++;
    }
}

function clickReponse(elem){
    console.log(elem)
}
