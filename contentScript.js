

// detect if video.muted???
// allow listen in wallpaper video?
// allow set general volume for every page???
// issue: sound break when leave page some minutes?

(()=>{

	const classVolumeBtn = '.mute-icon.browse-mode';
	const classVolumeBtn2 = '.mute-icon.one_column';
	const classVideoPlayer = '.video-player'
	const idExtVolumeDiv = 'extension-volume-div';
	const classExtVolumeInput = 'extension-volume-input';
	let lastVolumeRate = 0.5;

	let replaceVolume = ()=>{

		let listBtnVolume = [
		...document.querySelectorAll(classVolumeBtn),
		...document.querySelectorAll(classVolumeBtn2),
		];
		console.log('found: ', listBtnVolume.length);

		for(let btnVolume of listBtnVolume) {
			if(btnVolume.id != idExtVolumeDiv) {
				if(btnVolume.style.display != 'none') {
					
					console.log('about to hde default volume');

					// hide default volume
					btnVolume.style.display = 'none';

					// show extension volume
					if(btnVolume.parentNode.getElementsByClassName(classExtVolumeInput).length > 0){
						return;
					}

					console.log('about to show extension-volume');

					let currentVolumeRate = document.querySelector(classVideoPlayer).volume;
					const html = `
					<div class="${btnVolume.className} cls-ext-vol" id="${idExtVolumeDiv}">

					<input class="${classExtVolumeInput}"
					style="position: absolute;
					top: 40%;
					transform: rotate(270deg);" 
					type="range" name="vol" min="0" max="100" value="${currentVolumeRate * 100}">

					</div>
					`;
					var div = document.createElement('div');
					div.innerHTML = html.trim();


					// btnVolume.parentNode.innerHTML += html;
					btnVolume.parentNode.appendChild(div.firstChild);


					// set lastVolume 
					let players = document.querySelectorAll(classVideoPlayer);
					for(let player of players) {
						player.volume = lastVolumeRate;
					}


				}
			}
		}
	};


	let loopReplaceVolume = ()=>{

		setTimeout(()=>{
			replaceVolume();
			setTimeout(loopReplaceVolume, 100);
		}, 100); 

	};
	loopReplaceVolume();


	let addHandler = ()=>{
		setTimeout(()=>{

			let listVol = document.getElementsByClassName(classExtVolumeInput);
			for(let vol of listVol) {
				vol.oninput = (event)=>{
					lastVolumeRate = event.target.value/ event.target.max;
					let players = document.querySelectorAll(classVideoPlayer);
					for(let player of players) {
						player.volume = lastVolumeRate;
					}
				};

				// sync with last volume
				let value = lastVolumeRate * 100;
				vol.value = value;
			}
			addHandler();
		}, 200); 
	};
	addHandler();


})();
