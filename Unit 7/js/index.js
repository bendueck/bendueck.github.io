//Code written by myself but inspired by YouTube video by Web Dev Simplified https://www.youtube.com/watch?v=YeFzkC2awTM //

// runs code when page is loading // 
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

//these functions remove the cart items, change the quantity, and add to cart//
function ready() {
var removeCartItemButtons = document.getElementsByClassName('button-remove')
for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i]
  button.addEventListener('click', removeCartItem)
 }

 var quantityInputs = document.getElementsByClassName('cart-quantity-input')
 for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i]
  input.addEventListener('change', quantityChanged)
 }

 var addToCartButtons = document.getElementsByClassName('shop-item-button')
 for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i]
  button.addEventListener('click', addToCartClicked)
 }

 document.getElementsByClassName('button-purchase')[0].addEventListener('click', purchaseClicked)
}

// thanks user for making a purchase and clears cart //
function purchaseClicked() {
  alert('Thank you for your purchase!')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

// removes cart item and updates cart total //
function removeCartItem(event) {
  var buttonClicked = event.target 
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

// updates item quantity and updates cart total //
function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

//adds specific item details when adding to cart//
function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  console.log(title, price, imageSrc)
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

//continued adding item to cart and alert if item has been added. uses html//
function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item has already been added to the cart')
      return
    }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="button button-remove" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('button-remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('$',''))
    var quantity = quantityElement.value
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

// Below code from unit 4. Accessed from https://www.cssscript.com/responsive-sliding-hamburge-menu/#google_vignette //

const hamburger = document.querySelector(".hamburger")
const nav_menu = document.querySelector(".nav-menu")

hamburger.addEventListener("click",()=>{
  hamburger.classList.toggle("active");
  nav_menu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  nav_menu.classList.remove("active");
}))

// Music Player //
/*
	AUTHOR: Osvaldas Valutis, www.osvaldas.info
*/
(function($, window, document, undefined) {
  var isTouch = 'ontouchstart' in window,
      eStart = isTouch ? 'touchstart' : 'mousedown',
      eMove = isTouch ? 'touchmove' : 'mousemove',
      eEnd = isTouch ? 'touchend' : 'mouseup',
      eCancel = isTouch ? 'touchcancel' : 'mouseup',
      secondsToTime = function(secs) {
          var hours = Math.floor(secs / 3600),
              minutes = Math.floor(secs % 3600 / 60),
              seconds = Math.ceil(secs % 3600 % 60);
          return (hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0' + hours + ':' : hours + ':') + (minutes.toString().length < 2 ? '0' + minutes : minutes) + ':' + (seconds.toString().length < 2 ? '0' + seconds : seconds);
      },
      canPlayType = function(file) {
          var audioElement = document.createElement('audio');
          return !!(audioElement.canPlayType && audioElement.canPlayType('audio/' + file.split('.').pop().toLowerCase() + ';').replace(/no/, ''));
      };

  $.fn.audioPlayer = function(params) {
      var params = $.extend({
              classPrefix: 'audioplayer',
              strPlay: '',
              strPause: '',
              strVolume: ''
          }, params),
          cssClass = {},
          cssClassSub = {
              playPause: 'playpause',
              playing: 'playing',
              time: 'time',
              timeCurrent: 'time-current',
              timeDuration: 'time-duration',
              bar: 'bar',
              barLoaded: 'bar-loaded',
              barPlayed: 'bar-played',
              volume: 'volume',
              volumeButton: 'volume-button',
              volumeAdjust: 'volume-adjust',
              noVolume: 'novolume',
              mute: 'mute',
              mini: 'mini'
          };

      for (var subName in cssClassSub)
          cssClass[subName] = params.classPrefix + '-' + cssClassSub[subName];

      this.each(function() {
          if ($(this).prop('tagName').toLowerCase() != 'audio')
              return false;

          var $this = $(this),
              audioFile = $this.attr('src'),
              isAutoPlay = $this.get(0).getAttribute('autoplay'),
              isAutoPlay = isAutoPlay === '' || isAutoPlay === 'autoplay' ? true : false,
              isLoop = $this.get(0).getAttribute('loop'),
              isLoop = isLoop === '' || isLoop === 'loop' ? true : false,
              isSupport = false;

          if (typeof audioFile === 'undefined') {
              $this.find('source').each(function() {
                  audioFile = $(this).attr('src');
                  if (typeof audioFile !== 'undefined' && canPlayType(audioFile)) {
                      isSupport = true;
                      return false;
                  }
              });
          } else if (canPlayType(audioFile)) isSupport = true;

          var thePlayer = $('<div class="' + params.classPrefix + '">' + (isSupport ? $('<div>').append($this.eq(0).clone()).html() : '<embed src="' + audioFile + '" width="0" height="0" volume="100" autostart="' + isAutoPlay.toString() + '" loop="' + isLoop.toString() + '" />') + '<div class="' + cssClass.playPause + '" title="' + params.strPlay + '"><a href="#">' + params.strPlay + '</a></div></div>'),
              theAudio = isSupport ? thePlayer.find('audio') : thePlayer.find('embed'),
              theAudio = theAudio.get(0);

          if (isSupport) {
              thePlayer.find('audio').css({
                  'width': 0,
                  'height': 0,
                  'visibility': 'hidden'
              });
              thePlayer.append('<div class="' + cssClass.time + ' ' + cssClass.timeCurrent + '"></div><div class="' + cssClass.bar + '"><div class="' + cssClass.barLoaded + '"></div><div class="' + cssClass.barPlayed + '"></div></div><div class="' + cssClass.time + ' ' + cssClass.timeDuration + '"></div><div class="' + cssClass.volume + '"><div class="' + cssClass.volumeButton + '" title="' + params.strVolume + '"><a href="#">' + params.strVolume + '</a></div><div class="' + cssClass.volumeAdjust + '"><div><div></div></div></div></div>');

              var theBar = thePlayer.find('.' + cssClass.bar),
                  barPlayed = thePlayer.find('.' + cssClass.barPlayed),
                  barLoaded = thePlayer.find('.' + cssClass.barLoaded),
                  timeCurrent = thePlayer.find('.' + cssClass.timeCurrent),
                  timeDuration = thePlayer.find('.' + cssClass.timeDuration),
                  volumeButton = thePlayer.find('.' + cssClass.volumeButton),
                  volumeAdjuster = thePlayer.find('.' + cssClass.volumeAdjust + ' > div'),
                  volumeDefault = 0,
                  adjustCurrentTime = function(e) {
                      theRealEvent = isTouch ? e.originalEvent.touches[0] : e;
                      theAudio.currentTime = Math.round((theAudio.duration * (theRealEvent.pageX - theBar.offset().left)) / theBar.width());
                  },
                  adjustVolume = function(e) {
                      theRealEvent = isTouch ? e.originalEvent.touches[0] : e;
                      theAudio.volume = Math.abs((theRealEvent.pageX - volumeAdjuster.offset().left) / volumeAdjuster.width());
                  },
                  updateLoadBar = setInterval(function() {
                    if (theAudio.buffered.length > 0) {
                      barLoaded.width((theAudio.buffered.end(0) / theAudio.duration) * 100 + '%');
                      if (theAudio.buffered.end(0) >= theAudio.duration)
                          clearInterval(updateLoadBar);
                    }
                  }, 100);

              var volumeTestDefault = theAudio.volume,
                  volumeTestValue = theAudio.volume = 0.111;
              if (Math.round(theAudio.volume * 1000) / 1000 == volumeTestValue) theAudio.volume = volumeTestDefault;
              else thePlayer.addClass(cssClass.noVolume);

              timeDuration.html('&hellip;');
              timeCurrent.text(secondsToTime(0));

              theAudio.addEventListener('loadeddata', function() {
                  timeDuration.text(secondsToTime(theAudio.duration));
                  volumeAdjuster.find('div').width(theAudio.volume * 100 + '%');
                  volumeDefault = theAudio.volume;
              });

              theAudio.addEventListener('timeupdate', function() {
                  timeCurrent.text(secondsToTime(theAudio.currentTime));
                  barPlayed.width((theAudio.currentTime / theAudio.duration) * 100 + '%');
              });

              theAudio.addEventListener('volumechange', function() {
                  volumeAdjuster.find('div').width(theAudio.volume * 100 + '%');
                  if (theAudio.volume > 0 && thePlayer.hasClass(cssClass.mute)) thePlayer.removeClass(cssClass.mute);
                  if (theAudio.volume <= 0 && !thePlayer.hasClass(cssClass.mute)) thePlayer.addClass(cssClass.mute);
              });

              theAudio.addEventListener('ended', function() {
                  thePlayer.removeClass(cssClass.playing);
              });

              theBar.on(eStart, function(e) {
                      adjustCurrentTime(e);
                      theBar.on(eMove, function(e) {
                          adjustCurrentTime(e);
                      });
                  })
                  .on(eCancel, function() {
                      theBar.unbind(eMove);
                  });

              volumeButton.on('click', function() {
                  if (thePlayer.hasClass(cssClass.mute)) {
                      thePlayer.removeClass(cssClass.mute);
                      theAudio.volume = volumeDefault;
                  } else {
                      thePlayer.addClass(cssClass.mute);
                      volumeDefault = theAudio.volume;
                      theAudio.volume = 0;
                  }
                  return false;
              });

              volumeAdjuster.on(eStart, function(e) {
                      adjustVolume(e);
                      volumeAdjuster.on(eMove, function(e) {
                          adjustVolume(e);
                      });
                  })
                  .on(eCancel, function() {
                      volumeAdjuster.unbind(eMove);
                  });
          } else thePlayer.addClass(cssClass.mini);

          if (isAutoPlay) thePlayer.addClass(cssClass.playing);

          thePlayer.find('.' + cssClass.playPause).on('click', function() {
              if (thePlayer.hasClass(cssClass.playing)) {
                  $(this).attr('title', params.strPlay).find('a').html(params.strPlay);
                  thePlayer.removeClass(cssClass.playing);
                  isSupport ? theAudio.pause() : theAudio.Stop();
              } else {
                  $(this).attr('title', params.strPause).find('a').html(params.strPause);
                  thePlayer.addClass(cssClass.playing);
                  isSupport ? theAudio.play() : theAudio.Play();
              }
              return false;
          });

          $this.replaceWith(thePlayer);
      });
      return this;
  };
})(jQuery, window, document);
