$(document).ready(function() {
	// Handle the request payment key button click
	// Live event due to button not being added until AJAX calls with OnePage are complete
	$('#dwolla_generate_payment_key').live("click", function (){
		// Verify account ID
		var accountId = $('#dwolla_account_id').val();
		if (accountId == null || accountId.length < 12 || /[^0-9\-]/.test(accountId)) {
			alert('Invalid Dwolla account ID number. Please enter your account number following the pattern : ###-###-####');
			return false;
		}		
		// Remove any potential previous progress area
		$('.dwolla_progress').remove();
		
		// Show progress area
		$('#dwolla_generate_payment_key').after('<div class="dwolla_progress">Requesting payment key...</div>');

		checkout.queueAjaxRequest({
			url: checkout.pageLinks.checkout,
			data: 'action=requestPaymentKey&accountId=' + accountId,
			type: 'post',
			beforeSendMsg: 'Requesting Payment Key',
			success: function (data){
					if(data == 'true'){
						$('#dwolla_generate_payment_key').text("Payment key has been sent to your email address associated with your Dwolla account");
					}
					if (data == 'false'){
						alert('There was an error requesting the payment key, please inform ' + checkout.storeName + ' about this error.');
					}	
					//TODO detect faultcode
			},
			errorMsg: 'There was an error requesting the payment key, please inform ' + checkout.storeName + ' about this error.'
		});
		return false;
	});
});