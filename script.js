$(function () {
  // Define hours array and get the current hour using Day.js
  const hours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
  const currentHour = dayjs().hour();

  // Set the text of the element with ID "currentDay" to the current date using Day.js
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // Add a click event listener to all the save buttons in the time blocks
  $('.saveBtn').on('click', function () {
    // Get the ID of the parent time block and the value of the description textarea element
    const key = $(this).parent().attr('id');
    const value = $(this).siblings('.description').val();
    // Save the key-value pair in local storage
    localStorage.setItem(key, value);
  });

  // Loop over each hour and create a new time block
  for (let i = 0; i < hours.length; i++) {
    const hour = hours[i];
    const hourValue = i + 8;
    // Create a new time block element with a unique ID
    const timeBlock = $('<div>')
      .attr('id', 'hour-' + hourValue)
      .addClass('row time-block');
    
    // Create the hour column with the corresponding hour value
    const hourCol = $('<div>')
      .addClass('col-2 col-md-1 hour text-center py-3')
      .text(hour);

    // Create the description column and get the saved value from local storage
    const descriptionCol = $('<textarea>')
      .addClass('col-8 col-md-10 description')
      .attr('rows', 3);
    const savedValue = localStorage.getItem('hour-' + hourValue);
    // If a saved value exists, set the description column's value to it
    if (savedValue) {
      descriptionCol.val(savedValue);
    }  
    
    // Create the save button element
    const saveBtn = $('<button>')
      .addClass('btn saveBtn col-2 col-md-1')
      .attr('aria-label', 'save')
      .append($('<i>').addClass('fas fa-save').attr('aria-hidden', 'true'));
  
    // Append the hour, description, and save button elements to the time block
    timeBlock.append(hourCol, descriptionCol, saveBtn);

    // Style the time block based on the current hour
    if (hourValue < currentHour) {
      timeBlock.addClass('past');
    } else if (hourValue === currentHour) {
      timeBlock.addClass('present');
    } else {
      timeBlock.addClass('future');
    }

    // Append the new time block to the container element
    $('.container-lg').append(timeBlock);
  }
});
