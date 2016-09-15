$(document).ready(function() {
  var on, start, strict, c, k, w, r, computer_color, turn;
  var computer_count = 0;
  var player_count = 0;
  var z = 0;
  var computer_arr = [];
  var player_arr = [];
  var player_choices_check = false;
  var colors = ['red', 'yellow', 'blue', 'green'];

  reset();

  function reset() {
    on = false;
    start = false;
    strict = false;
    computer_count = 0;
    player_count = 0;
    z = 0;
    computer_arr = [];
    player_arr = [];
    computer_color = '';
    turn = '';
    player_choices_check = false;
    $('.slider_off').css('background-color', '#7EC0EE');
    $('.slider_on').css('background-color', 'black');
    $('.count').text('--');
    $('.count').css('color', '#660000');
    $('.start_button').css('background-color', 'crimson');
    $('.start_word').text('START');
    $('.strict_button').css('background-color', 'yellow');
    $('.strict_on').text('OFF');
    $('#green').css('opacity', '0.6');
    $('#red').css('opacity', '0.6');
    $('#yellow').css('opacity', '0.6');
    $('#blue').css('opacity', '0.6');
    window.clearTimeout(c);
    window.clearTimeout(k);
    window.clearTimeout(r);
    window.clearTimeout(w);
  }

  function slider_on() {
    on = true;
    $('.slider_off').css('background-color', 'black');
    $('.slider_on').css('background-color', '#7EC0EE');
    $('.count').css('color', 'crimson');
    $('.start_button').css('background-color', 'green');
    $('.start_word').text('START');
    $('.strict_button').css('background-color', 'orange');
    $('.strict_on').text('OFF');
  }

  function restart() {
    reset();
    slider_on();
  }

  function strict_restart() {
    reset();
    start = true;
    strict = true;
    turn = 'computer';
    slider_on();
    $('.start_button').css('background-color', 'crimson');
    $('.start_word').text('STOP');
    $('.strict_button').css('background-color', 'yellow');
    $('.strict_on').text('ON');
    c = setTimeout(computer_turn, 2000);
  }

  function sound_out(kolor) {
    if (turn === 'computer') {
      $('audio.'+kolor+'_sound')[0].play();
      $('#'+kolor).css('opacity', '0.9');
      k = setTimeout(function() {
        $('#'+kolor).css('opacity', '0.6');
      }, 500);
    }
  }

  function loop() {
    if (z === computer_count) {
      turn = 'player';
    } else if (z < computer_count) {
      sound_out(computer_arr[z]);
      setTimeout(loop, 1000);
      z++;
    }
  }

  function computer_turn() {
    if (on && start && turn === 'computer') {
      computer_color = colors[Math.floor(Math.random() * colors.length)];
      computer_count += 1;
      $('.count').text(computer_count);
      computer_arr.push(computer_color);
      z = 0;
      loop();
    }
  }

  function check_player_choice_with_computer() {
    if (player_count <= computer_count) {
      player_choices_check = true;
      if (player_arr[player_count-1] !== computer_arr[player_count-1]) {
        player_choices_check = false;
      } else {
        $('audio.'+player_arr[player_count-1]+'_sound')[0].play();
        $('#'+player_arr[player_count-1]).css('opacity', '0.9');
        k = setTimeout(function() {
          $('#'+player_arr[player_count-1]).css('opacity', '0.6');
        }, 500);
      }
    }
  }

  $('.slider_on').click(function() {
    slider_on();
  });

  $('.slider_off').click(function() {
    reset();
  });

  $('.start_button').click(function() {
    if (on) {
      if (start) {
        restart();
      } else {
        $('.start_button').css('background-color', 'crimson');
        $('.start_word').text('STOP');
        start = true;
        turn = 'computer';
        c = setTimeout(computer_turn, 1000);
      }
    }
  });

  $('.strict_button').click(function() {
    if (on) {
      if (strict) {
        $('.strict_button').css('background-color', 'orange');
        $('.strict_on').text('OFF');
        strict = false;
      } else {
        $('.strict_button').css('background-color', 'yellow');
        $('.strict_on').text('ON');
        strict = true;
      }
    }
  });

  function when_clicked(kolor) {
    if (on && start && turn === 'player') {
      $('#'+kolor).css('opacity', '0.9');
      k = setTimeout(function() {
        $('#'+kolor).css('opacity', '0.6');
      }, 500);
      if (strict) {
        k = setTimeout(function() {
          $('#'+kolor).css('opacity', '0.6');
        }, 500);
      }
      player_count += 1;
      player_arr.push(kolor);
      check_player_choice_with_computer();

      if (!player_choices_check) {
        $('audio.error_sound')[0].play();
        $('.count').text('ERR');
        if (strict) {
          $('.count').text('ERR');
        }
        player_arr = [];
        if (strict) {
          r = setTimeout(function() {
            strict_restart();
          }, 2000);
        } else {
          r = setTimeout(function() {
            $('.count').text('RE');
          }, 1000);
          r = setTimeout(function() {
            $('.count').text('TRY');
          }, 1500);
          r = setTimeout(function() {
            $('.count').text(computer_count);
            player_count = 0;
            z = 0;
            turn = 'computer';
            loop();
          }, 3500);
        }
      } else if (player_choices_check && player_count === computer_count) {
        if (player_count === 20) {
          $('audio.success_sound')[0].play();
          w = setTimeout(function() {
            $('.count').text('YOU');
          }, 500);
          w = setTimeout(function() {
            $('.count').text('WIN');
          }, 1500);
          r = setTimeout(function() {
            restart();
          }, 5000);
        } else {
          $('audio.'+kolor+'_sound')[0].play();
          turn = 'computer';
          player_count = 0;
          player_arr = [];
          c = setTimeout(computer_turn, 2000);
        }
      }
    }
  }

  $('#green').click(function() {
    when_clicked('green');
  });
  $('#red').click(function() {
    when_clicked('red');
  });
  $('#yellow').click(function() {
    when_clicked('yellow');
  });
  $('#blue').click(function() {
    when_clicked('blue');
  });

});
