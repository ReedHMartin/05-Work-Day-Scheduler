$(function () {
  // Add a click event listener to all the save buttons in the time blocks
  $('.saveBtn').on('click', function () {
    // Get the ID of the parent time block and the value of the description textarea element
    const key = $(this).parent().attr('id');
    const value = $(this).siblings('.description').val();
    // Save the key-value pair in local storage
    localStorage.setItem(key, value);
  });

  // Loop through each time block on the page
  $('.time-block').each(function () {
    // Extract the hour from the ID of the time block
    const blockHour = parseInt($(this).attr('id').split('-')[1]);
    // Get the current hour using Day.js
    const currentHour = dayjs().hour();
    // Compare the block hour to the current hour and style the time block accordingly
    if (blockHour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });

  // Loop through each description element in the time blocks
  $('.description').each(function () {
    // Get the parent time block ID and retrieve the corresponding value from local storage
    const id = $(this).parent().attr('id');
    const savedValue = localStorage.getItem(id);
    // If a value is found, set the value of the description element to the saved value
    if (savedValue) {
      $(this).val(savedValue);
    }
  });

  // Set the text of the element with ID "currentDay" to the current date using Day.js
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));
});
