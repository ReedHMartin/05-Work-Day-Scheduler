$(function() {
    const hours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
    const currentHour = dayjs().hour();
  
    // Loop over each hour and create a new time block
    for (let i = 0; i < hours.length; i++) {
      const hour = hours[i];
      const hourValue = i + 8;
      const timeBlock = $('<div>')
        .attr('id', 'hour-' + hourValue)
        .addClass('row time-block');
  
      const hourCol = $('<div>')
        .addClass('col-2 col-md-1 hour text-center py-3')
        .text(hour);
  
      const descriptionCol = $('<textarea>')
        .addClass('col-8 col-md-10 description')
        .attr('rows', 3);
  
      const saveBtn = $('<button>')
        .addClass('btn saveBtn col-2 col-md-1')
        .attr('aria-label', 'save')
        .append($('<i>').addClass('fas fa-save').attr('aria-hidden', 'true'));
  
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
  