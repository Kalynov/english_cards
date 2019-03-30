
var myData
  
function is_touch_device() {
    if('ontouchstart' in window || navigator.maxTouchPoints){
        document.body.className = "tuch"
    }
};


let cardContainer = document.createElement("div")
cardContainer.className = "cardContainer";
document.body.appendChild(cardContainer)

var date = new DateWrapper({
    parent:document.body
});

var titleWrap = document.createElement("div")
titleWrap.className ="titleWrapp";
document.body.appendChild(titleWrap);

var title = new Title({
    content:"New Phrases for today",
    parent:titleWrap,
})
let cardsArray=[];

function cb(){
    myData.forEach(element => {
        var card = new Card({
            theme:element.theme,
            sourceText:element.sourceText,
            translate:element.translation,
            parent:cardContainer
        })
        cardsArray.push(card);
    });
    let cardsWrap = document.createElement("div")
    cardsWrap.className = "cardsWrap"
    document.body.appendChild(cardsWrap)
    let cards = new CardContainer({
        parent:cardsWrap,
        cards:cardsArray,
        quantity:3,
    })
}


var myd3 = d3.json("data/phrases.json",function(error,data){
    myData = data;
    cb()
});



