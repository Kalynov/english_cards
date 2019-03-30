function Title(options) {
    var parent = options.parent? options.parent :  document.body;
    var mainClass = options.class? options.class+" titleContainer":"titleContainer";
    var content = options.content? options.content:"Title"


    var elem;
    (function render(){
        ///wrapper
        elem = document.createElement('div');
        elem.className = mainClass;

        //content
        var title = document.createElement('span');
        elem.appendChild(title);
        title.className = "title";
        title.textContent = content;

        parent.appendChild(elem)
    })();
}  
