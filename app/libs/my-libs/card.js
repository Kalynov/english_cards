function Card(options) {
    var parent = options.parent? options.parent :  document.body;
    var mainClass = options.class? options.class+" card":"card";
    var theme = options.theme? options.theme:"theme";
    var sourceText = options.sourceText? options.sourceText:"sourceText";
    var translateText = options.translate? options.translate:"Перевод";
    var color = ['blue',"green","grey","red","yelow"].sort(compareRandom)[0];

    this.data ={
        text:sourceText,
        color:color
    } 

    function compareRandom() {
        return Math.random() - 0.5;
    }

    var elem;
    function render(){
        var translate
        ///wrapper
        elem = document.createElement('div');
        elem.className = mainClass+" "+color;

        //title
        var title = new Title({
            parent:elem,
            class:"cardTitle",
            content:theme,
        });
        //source
        var sourceContainer = document.createElement('div');
        elem.appendChild(sourceContainer);
        sourceContainer.className = "source";
        sourceContainer.textContent = sourceText;

        //translate
        elem.onmousedown = hendler
        var timeOut
        function hendler(event){
            $(sourceContainer).animate({opacity:0},200,function(){
                toogleTraslate();
                $(sourceContainer).animate({opacity:1},200)
            })
        }

        //меняет текст карточки на перевод
        function toogleTraslate(){
            translate = translate? false:true;
            if (translate){
                sourceContainer.textContent = translateText;
                timeOut = setTimeout(function(){
                    translate=true
                    hendler()
                },6000)
            }else{
                sourceContainer.textContent = sourceText;
                clearTimeout(timeOut)
            }
        }

        //parent.appendChild(elem)
    };
    render()
    this.view = elem
}  

///////////////////////////////////////////////////////////////////////////////////////////////////

function CardContainer(options){
    var quantity = options.quantity? options.quantity:1;
    var parent = options.parent? options.parent:document.body;
    var cards = options.cards;

    //функция возвращающая случайное число в промежутке от 3 до 5
    function randomInteger() {
        var rand = 3 - 0.5 + Math.random() * 3
        rand = Math.round(rand);
        return rand;
    }

    //формирует массив карт для заполнения колонки из массива переданных карт длинной от 3 до 5,(arrCards)
    function cardsForColumn(){
        var arrCards=[];
        var length = randomInteger();
        var card;
        for(var i=0;i<length;i++){
            var index = Math.floor(Math.random()*cards.length)
            arrCards.push(cards[index]);
            cards.splice(index,1);
        }
        return arrCards
    }
    
    // сортировка массива карт по уменьшению количества слов
    // принимает на вход массив экземпляров карт
    // возвращает отсортированный массив
    function sortMaxWord(arrCards){
        var result = arrCards.sort(mySort).reverse();
        return result;
        function mySort(a,b){
            return a.data.text.split(" ").length - b.data.text.split(" ").length
        }
    }

    var columnArr=[]

    //создает контейнер с нужным количеством колонок для карт
    function render(){
        var cardContainer = document.createElement("div");
        cardContainer.className = "cardsContainer";
        parent.appendChild(cardContainer);
        for (var i=0;i<quantity;i++){
            var column = document.createElement("div");
            column.className = "column";
            cardContainer.appendChild(column)
            columnArr.push(column)
        }
    }

    // заполняет колонки отсортированными карточками
    function appendCard(){
        columnArr.forEach(function(elem,i){
            sortMaxWord(cardsForColumn(cards)).forEach(function(el){
                elem.appendChild(el.view)
            })
        })
    }

    render();
    appendCard();

}
