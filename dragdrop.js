window.addEventListener('DOMContentLoaded', function(){
	document.body.addEventListener('dragover', function(e){
		e.preventDefault();
		
		e.stopPropagation();
		
		e.dataTransfer.dropEffect = 'copy';
		
		document.body.classList.add('dragover');
	});
	
	document.body.addEventListener('dragexit', function(){
		document.body.classList.remove('dragover');
	});
	
	document.body.addEventListener('drop', function(e){
		e.preventDefault();
		e.stopPropagation();
		
		document.body.classList.remove('dragover');
		
		if(!e.dataTransfer.files || !e.dataTransfer.files[0]){
			return;
		}
		
		handleImage(e.dataTransfer.files[0]);
	});
});

function handleImage(image){
	console.log(image);
}