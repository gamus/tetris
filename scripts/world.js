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
  var game = new GameContainer(c);
  
  $("#new_button").click(function() {
    game.restart();  
  });
};
