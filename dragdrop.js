window.addEventListener('DOMContentLoaded', function(){
	document.body.addEventListener('dragover', function(e){
		e.preventDefault();
		e.stopPropagation();
		
		e.dataTransfer.dropEffect = 'copy';
	});
	
	document.body.addEventListener('drop', function(e){
		e.preventDefault();
		e.stopPropagation();
	});
});

window.addEventListener('load', function(){
	initializeApp();
});

function handleImage(image){
	window.app.reset();
	
	if([
		'image/png',
		'image/gif',
		'image/jpeg',
		'image/svg+xml',
	].indexOf(image.type) == -1){
		window.app.error('Not an image!');
		
		return;
	}
	
	if(!window.app){
		return;
	}
	
	window.app.file.name = image.name;
	window.app.file.size = image.size;
	window.app.file.type = image.type;
	
	const fileReader = new FileReader();
	
	fileReader.onload = function(e){
		window.app.file.data = e.target.result;
		window.app.$forceUpdate();
	};
	
	fileReader.readAsDataURL(image);
}

function initializeApp(){
	window.app = new Vue({
		el: '#main',
		
		data: {
			currentlyDragOver: false,
			
			errorMessage: '',
			
			file: {
				name: false,
				size: 0,
				type: '',
			},
		},
		
		methods: {
			dragExit: function(){
				this.currentlyDragOver = false;
			},
			
			dragOver: function(){
				this.currentlyDragOver = true;
			},
			
			drop: function(e){
				console.log(e);
				
				this.currentlyDragOver = false;
				
				if(!e.dataTransfer.files || !e.dataTransfer.files[0]){
					return;
				}
				
				handleImage(e.dataTransfer.files[0]);
			},
			
			error: function(errorMessage){
				this.errorMessage = errorMessage;
			},
			
			reset: function(){
				this.errorMessage = '';
				this.file.data = '';
				this.file.name = false;
				this.file.size = 0;
				this.file.type = '';
			},
		},
	});
}