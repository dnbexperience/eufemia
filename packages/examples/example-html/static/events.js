// 1. The declarative way to set and handle events (only the way we SET the event is declarative)
//

function MyClass() {}
MyClass.prototype.on_click = function(e) {
  console.log('on_click', e);
};
MyClass.prototype.radio_change = function(e) {
  console.log('radio_change', e);
};
MyClass.prototype.dropdown_change = function(e) {
  console.log('dropdown_change', e);
};
MyClass.prototype.value_change = function(e) {
  console.log('value_change', e.value);
};
window.myClass = new MyClass(); // same as var myClass = new MyClass()

// 2. The imperative way of to set and handle events
//

// New Web Components Event API
var inptuEl = document.querySelector('dnb-input:not([on_change])');
inptuEl.addEvent('on_change', function(e) {
  console.log('value_change', e.value);
});
inptuEl.addEvent('on_submit', function(e) {
  console.log('value_submit', e.value);
});

// New Web Components Event API
document.querySelector('dnb-switch').addEvent('on_change', function(e) {
  console.log('switch.on_change', e.checked);
});
document
  .querySelector('.date-picker-event')
  .addEvent('on_change', function(e) {
    console.log('date-picker.on_change', e);
    document.querySelector('.my-date').innerHTML = e.date;
  });
document
  .querySelector('.dropdown-event')
  .addEvent('on_change', function(e) {
    console.log('dropdown.on_change', e.data);
  });
document
  .querySelector('.dropdown-event')
  .addEvent('on_select', function(e) {
    console.log('dropdown.on_select', e.data);
  });
document.querySelector('.button').addEvent('on_click', function(e) {
  console.log('on_click', e);
});

// setTimeout(function () {
//   document.querySelector('.button').removeEvent(eventId);
// }, 3e3)
