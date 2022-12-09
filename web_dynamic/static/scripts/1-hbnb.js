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
});
