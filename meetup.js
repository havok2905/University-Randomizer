var MeetupSDK = function(key) {
  this.key = key;
};

MeetupSDK.root = 'https://api.meetup.com';

MeetupSDK.prototype.getEventRsvps = function(eventID, callback) {
  var route = MeetupSDK.root + '/2/rsvps?event_id=' + eventID + '&key=' + this.key;
  $.get(route, callback);
};

MeetupSDK.prototype.getEvents = function(venueID, callback) {
  var route = MeetupSDK.root + '/2/events?venue_id=' + venueID + '&key=' + this.key;
  $.get(route, callback);
};

MeetupSDK.prototype.currentEventID = function(response) {
  return response.results[0].id;
};

MeetupSDK.prototype.currentEventName = function(response) {
  var eventObj = response.results[0];
  return eventObj.group.name + ' : ' + eventObj.name;
};

MeetupSDK.prototype.rsvpNames = function(rsvps) {
  return rsvps.results.map(function(rsvp) {
    return rsvp.member.name;
  });
};
