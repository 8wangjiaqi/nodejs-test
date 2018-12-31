/* global fetch: true */
$(function(){
  var $todo  = $('#todo'),
      $btnOk = $('#okButton'),
      $out   = $('#output');
  
  var items = [];

  getItems();

  $btnOk.click(function(){
    //通过get方法请求api接口，得到数据
    if($todo.val() === '') return;
    fetch('http://192.168.133.144:8080', {method: 'POST', body: $todo.val()});
    items.push($todo.val());

    showData();
  });

  function getItems() {
    fetch('http://192.168.133.144:8080/').then(function(res)      {
        res.text().then(function(txt) {
        items = JSON.parse(txt);
        showData();
                                    
        });
              
      });
          
    }

    function showData() {
      $out.html('');

      var $ul  = $('<ul></ul>');
      $ul.html(items.map(function(item) { return '<li>' + item + '</li>';  }).join('\n'));
      $out.append($ul);
    }                   
    
});
