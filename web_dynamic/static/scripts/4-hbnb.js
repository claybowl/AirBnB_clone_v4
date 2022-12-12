$(document).ready( () => {
    const amenities = [];
    $('input[type="checkbox"]').change( () => {
      if (this.checked) {
        amenities.push(this.id);
      } else {
        const i = amenities.indexOf(this.id);
        if (i >= 0) {
          amenities.splice(i, 1);
        };
      };
      $('div.Amenities h4').text('Amenities: ' + amenities.join(', '));
    });

    places('http://941ce1b754e9.7399d2e2.hbtn-cod.io:5001/api/v1/places_search/');

    $.get('http://941ce1b754e9.7399d2e2.hbtn-cod.io:5001/api/v1/status/', function (data, textStatus) {
        if (textStatus === 'success') {
          if (data.status === 'OK') {
            $('#api_status').addClass('available');
          } else {
            $('#api_status').removeClass('available');
          }
        }
    });
});

function places (url) {
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function(data) {
      for (const place of data) {
        $.get('http://941ce1b754e9.7399d2e2.hbtn-cod.io:5001/api/v1/users' + place.user_id, function (userData) {
          let multguests = '';
          if (place.max_guest != 1) {
            let multguests ='s';
          }
          let multrooms = ''
          if (place.number_rooms != 1) {
            let multrooms ='s';
          }
          let multbathroom = ''
          if (place.number_bathrooms != 1) {
            let multbathroom ='s';
          }
          let html = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${multguests}</div>
                  <div class="number_rooms">${place.number_rooms } Bedroom${multrooms}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${multbathroom}</div>
          </div>
          <div class="user">
                  <b>Owner:</b> ${userData.first_name} ${userData.last_name}
                </div>
                <div class="description">
            ${place.description}
                </div>
            </article>`;
        $('.places').append(html);
        });
      }
    }
  });
}

$.ajax({
    type: 'POST',
    url: 'http://941ce1b754e9.7399d2e2.hbtn-cod.io:5001/api/v1/users',
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      $('section.places article').remove();
      displayPlaces(url);
      }
});

$('button').click(function() {
    $.ajax({
        type: 'POST',
        url: 'http://941ce1b754e9.7399d2e2.hbtn-cod.io:5001/api/v1/users',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: Object.keys(amenities) }),
        dataType: 'json',
        success: function(data) {
          $('section.places article').remove();
          displayPlaces(url);
        }
    });
});
