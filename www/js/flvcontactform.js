function validate_email(address) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   if(reg.test(address) == false) {
      return false;
   }
   else
   return true;
}

function validate_phone(phone){
	 var reg = /^[\:\-\.\_\(\) 0-9]+$/
        	if(reg.test(phone) == false) {
      return false;
   }
   else
   return true;
}


jQuery(document).ready(function(){
	jQuery('.flvcontactform .flvsubmit').click(validate_all);

})
function validate_all(){
     if(jQuery('.flvcontactform .flvname').val()!=undefined)
	 if(jQuery('.flvcontactform .flvname').val()=='') {
			jQuery('.flvcontactform .flvname').focus();
			return false;
		}
		
		if(jQuery('.flvcontactform .flvemail').val()!=undefined)
		if(validate_email(jQuery('.flvcontactform .flvemail').val())==false ) {
			jQuery('.flvcontactform .flvemail').focus();
			return false;
		}
		
		if(jQuery('.flvcontactform .flvphone').val()!=undefined)
		if(validate_phone(jQuery('.flvcontactform .flvphone').val())==false) {
			jQuery('.flvcontactform .flvphone').focus();
			return false;
		}
		
		if(jQuery('.flvcontactform .flvsubject').val()!=undefined)
		if(jQuery('.flvcontactform .flvsubject').val()==''){
			jQuery('.flvcontactform .flvsubject').focus();
			return false;
		}
		
		if(jQuery('.flvcontactform .flvmessage').val()!=undefined)
		if(jQuery('.flvcontactform .flvmessage').val()==''){
			jQuery('.flvcontactform .flvmessage').focus();
			return false;
		}
}
