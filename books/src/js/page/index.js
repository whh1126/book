require(['../config'], function() {
    require(['jquery', 'better', 'flexible'], function($, BScroll, flexible) {
        //实例section实现页面拖动
        new BScroll('section');
        init();

        function init() {
            $.ajax({
                url: "/api/list",
                dataType: "json",
                success: function(data) {
                    render(data.data)
                }
            })
        }
        //渲染页面
        function render(data) {
            data.forEach(function(item) {
                var html = ``;
                html += `<div class="content">
                <div class="big">
                    <div class="continner">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="word">
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                        <span>${item.time}</span>
                    </div>
                </div>
            </div>`
                bigcontent.innerHTML += html;
            })
        }
    })
})