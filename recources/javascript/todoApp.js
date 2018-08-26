(function () {

    var data = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : {
        items: []
    };

    update_local_storage();

    function update_local_storage() {
        localStorage.setItem("todoList", JSON.stringify(data));
    };

    var todo = document.querySelector('#todo');
    var completed = document.querySelector('#completed');
    var item = document.querySelector('#item');

    document.querySelector('#add').addEventListener("click", add_item);
    item.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {

            add_item();
        }
    });

    if (data.items) {

        for (var i = 0; i < data.items.length; i++) {
            attach_to_dom(data.items[i]);
        };
        todo.addEventListener("click", button_click);
        completed.addEventListener("click", button_click);
    };

    function add_item() {
        if (!item.value) return;
        var current_item = {
            id: Math.floor(Math.random() * 100),
            value: item.value,
            completed: false
        };

        data.items.push(current_item);
        attach_to_dom(current_item);
        item.value = "";
        update_local_storage();
    };

    function button_click(event) {
        var target = event.target;
        
        if (target.parentNode.tagName !== "BUTTON") return;

        var li = target.parentNode.parentNode.parentNode;
        
        var data_id = parseInt(li.getAttribute('data-id'));
        
        if (target.parentNode.className == "remove") {
            remove_item(data_id);
            li.parentNode.removeChild(li);
        };

        if (target.parentNode.className == "complete") {
            update_item(data_id);
        };
        update_local_storage();
        
        console.log(li.parentNode);
        if(target.parentNode.className != "remove"){
            li.parentNode.removeChild(li);
        }
    };

    function update_item(search) {
        for (var j = 0; j < data.items.length; j++) {
            if (data.items[j].id == search) {
                data.items[j].completed = !data.items[j].completed;

                attach_to_dom(data.items[j]);
                break;
            };
        }
    };

    function remove_item(search) {
        data.items = data.items.filter(function (el) {
            return el.id !== search;
        });
    };

    function attach_to_dom(data) {
        var placeholder = data.completed ? completed : todo;
        // placeholder.innerHTML += render(data);
        placeholder.insertAdjacentHTML('afterbegin', render(data));
        

    };

    function render(data) {
        return (
            `
            <li data-id="${data.id}">${data.value}
                <div class="buttons">
                    <button class="complete"><i class="fas fa-check-circle fa-lg item-btn"></i></button>
                    <button class="remove"><i class="fas fa-minus-circle fa-lg item-btn"></i></button>
                </div>
            </li>
        `
        );
    };


})();