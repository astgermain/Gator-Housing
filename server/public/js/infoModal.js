$('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('name2') // Extract info from data-* attributes
    var description = button.data('description') // Extract info from data-* attributes
    var location = button.data('location') // Extract info from data-* attributes
    var city = button.data('city') // Extract info from data-* attributes
    var state = button.data('state') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text(recipient)
    modal.find('.description').text("Description: " + description)
    modal.find('.location').text("Street Address: " +location)
    modal.find('.city').text("City: " +city)
    modal.find('.state').text("State: " +state)
    
  })