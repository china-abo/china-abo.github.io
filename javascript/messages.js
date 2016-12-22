var log = function() {
    console.log.apply(console, arguments)
}
//创建野狗云服务
var config = {
  // 将 wild-rat-39764 替换成你自己的 AppID
  syncURL: "https://abo-messages.wilddogio.com/"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

//提交数据
var submitDisscus = function(name, content, time){
    ref.push({
            'name': name,
			'content': content,
			'time': time
		})
}
//提取数据
var getDisscus = function(){
    ref.on('child_added', function (snap) {
    	var val = snap.val();
    	submit(val.name, val.content, val.time);
    })
}
//监听键盘输入，改变字数提示
var input = function() {
    // var max = $('.text-input').attr('maxlength')
    $('.text-input').on('input', function() {
        var textLength = $('.text-input').val().length
        $('.limit').html(140 - textLength)
        // log($('.limit').val())
    })
}
//获取时间函数
var getTime = function functionName() {
    var d = new Date()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`
    return timeString

}
//增加留言
var submit = function(useName, text, time) {
    var message = `
    <div class="notes">
        <img src="img/doge.jpeg" alt="头像" />
        <p class="name"> ${useName}: <span class="message">  ${text}</span></p>
        <p class="time">${time}</p>
    </div>
    `
    $('.content').append(message)
    //清空输入框
    $('.text-input').val('')
    $('.user-name').val('')
    $('.limit').html('140')
}
var bind = function(){
    var btn = $('.btn-submit')
    btn.on('click', function() {
        var useName = $('.user-name').val()
        var text = $('.text-input').val()
        var time = getTime()
        submitDisscus(useName, text, time)
        // submit(useName, text, time)
    })
}
var __main = function(){
    input()
    bind()
    getDisscus()
}
__main()
// log(num.text())
