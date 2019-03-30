function DateWrapper(options) {
    var parent = options.parent? options.parent :  document.body;
    var mainClass = options.class? options.class+" dateWrapper":"dateWrapper";
    var nowDate = new Date()
    var arrDate = nowDate.toString().split(" ")
    var month = arrDate[1]
    var date = arrDate[2]
    var elem;
    (function render(){
        ///wrapper
        elem = document.createElement('div');
        elem.className = mainClass;
        //number
        var number = document.createElement('div');
        elem.appendChild(number);
        number.className = "number";
        number.textContent = date;
        //month
        var monthWrap = document.createElement('div');
        elem.appendChild(monthWrap);
        monthWrap.className = "month";
        monthWrap.textContent = month;

        parent.appendChild(elem)
    })();
}  
