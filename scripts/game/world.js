/**
 * @depends cake.js
 * @depends GameContainer.js
 * @depends jquery.min.js
 */

/*
  Snippet for removing value from javascript array.
*/
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while(L && this.length){
        what = a[--L];
        while((ax= this.indexOf(what))!= -1){
            this.splice(ax, 1);
        }
    }
    return this;
}

init = function() {
  var c = E.canvas(GameContainer.width, GameContainer.height);
  var d = E('div', { id: 'container' });
  d.appendChild(c);
  document.getElementById("game_container").appendChild(d);

  var c2 = E.canvas(80, 50);
  document.getElementById("current_shape_container").appendChild(c2);

  var game = new GameContainer(c, new NextShape(c2));

  ;(function($) {

    $("#new_button").click(function() {
      game.restart();
      game.start();
    });

    $("#save_button").click(function() {
      if ($("#username").val() != "" && !!$("#username").val()) {
        $.post('http://oivoodoo.no.de/create', {
          score: {
            username: $("#username").val(),
            scores: $("#scores").html()
          }
        }, function() {
          update_scores_table();
        });
      }
      $("#game_over").fadeOut();
      return false;
    });

    $("#close_button").click(function() {
      $("#game_over").fadeOut();
      return false;
    });

    function update_scores_table() {
      $("#scores_table").html('');
      $.getJSON('http://oivoodoo.no.de/top/json', function(data) {
        var html = "";
        $.each(data, function(i, o) {
          html += "<li>" + o.username + ": " + o.scores + "</li>";
        });
        $("#scores_table").html(html);
      });
    };

    update_scores_table();
  })($);
};
