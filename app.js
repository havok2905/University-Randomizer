var api   = new MeetupSDK(APIKEY);
var names = [];

$(document).ready(main);


/*
 * Main function for event handling and event registration.
 */

function main() {
  api.getEvents(VENUEID, function(result) {
    var id = api.currentEventID(result);
    var name = api.currentEventName(result);
    $('h2').html(name);
    api.getEventRsvps('219481220', setPeople);
  });

  $('#winner button').on('click', winnerButton);
  $('#person-actions button').on('click', removeButton);
  $('#person-actions button').hide();
}


/*
 * Button that finds you a random winner and displays their name.
 */

function winnerButton() {
  var person = randomPerson(names);
  $('#winner p span')
    .html(person.name)
    .attr('data-index', person.index);
  $('#person-actions button').show();
}


/*
 * Button that removes a person from the names list and displays
   the action on screen.
 */

function removeButton() {
  var index = $('#winner p span').attr('data-index');
  $('#winner p span').html('');
  $('#winner p span').attr('data-index', '')
  $('#person-actions button').hide();
  names.splice(index, 1);
}


/*
 * Populates the names array with the names of people who RSVPed
 */

function setPeople(rsvps) {
  names = api.rsvpNames(rsvps);
}


/*
 * Returns a random person object with a name and placement in the
 * names array.
 */

function randomPerson(names) {
  nameIndex = Math.floor((Math.random() * names.length));
  return { name: names[nameIndex], index: nameIndex };
}
