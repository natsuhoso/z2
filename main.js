

let map = {
	00: ['10', '10', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	01: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	02: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	03: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	04: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	05: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	06: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	07: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	08: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	09: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	10: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	11: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	12: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	13: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	14: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	15: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
}
let map2 = {
	00: ['00', '10', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	01: ['01', '10', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	02: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	03: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	04: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	05: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	06: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	07: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	08: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	09: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	10: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	11: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	12: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	13: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
	14: ['00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01'],
	15: ['01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00', '01', '00'],
}

let sumpleChunk = new Map()
for(let i=0; i<32; i++){
	sumpleChunk.set(i, map[i%16].concat(map[i%16]))
}
let sumpleChunk2 = new Map()
for(let i=0; i<32; i++){
	sumpleChunk2.set(i, map2[i%16].concat(map2[i%16]))
}

function c(x,y){return `${x},${y}`}
function mod(x,y){ return x%y>=0 ? x%y : x%y + y }

class Block{
	constructor(id, coordinate){
		this.id = id;
		this.co = coordinate;
	}
}


class Chunks{
	constructor(chunksdata){
		this.data = chunksdata;
	}
	scope(w_block_count, h_block_count, center_x, center_y, block_x, block_y){
		let chunks = this.data;
		let chunk_x = block_x>=0 ? block_x/32|0 : (block_x/32|0) - 1;
		let chunk_y = block_y>=0 ? block_y/32|0 : (block_y/32|0) - 1;
		for(let i=chunk_x-1; i<=chunk_x+1; i++){
		for(let j=chunk_y-1; j<=chunk_y+1; j++){
			this.chunkGen(i,j)
		}}
		let area = new Map();
		// let center_x = 16;
		// let center_y = 16;
		for(let i=0; i<w_block_count; i++){
			let x = block_x + i-center_x
			let chunk_i = x>=0 ? x/32|0 : (x/32|0)-1
		for(let j=0; j<h_block_count; j++){
			let y = block_y + j-center_y
			let chunk_j = y>=0 ? y/32|0 : (y/32|0)-1

			let chunk = chunks.get(c(chunk_i,chunk_j))
			let block0 = chunk[0].get(mod(y,32))[mod(x,32)]//////////////////////////////////////////
			let block1 = chunk[1].get(mod(y,32))[mod(x,32)]//////////////////////////////////////////
			area.set(c(i,j), [block0,block1])
		}}
		return area;
	}
	chunkGen(x,y){
		let chunks = this.data;
		if(chunks.has(c(x,y))){
			return 0;
		}
		if(x==0 && y==0){
			chunks.set(c(x,y), [sumpleChunk,sumpleChunk2])
		}else{
			chunks.set(c(x,y), [sumpleChunk,sumpleChunk2])
		}
		return 0;
	}
}

class Main{
	static onResize(func){
		let resizetimer = null;
		$(window).resize( ()=> { clearTimeout(resizetimer); resizetimer=setTimeout( ()=>{
			func();
		},1000)})
	}
	static draw(chunks){


		let $body = $('body')
		let $main = $('#main')
		$main.html('')

		// let filter_black = new Image();
		// let filter_white = new Image();
		// filter_black.src = 'img/filter_black.png'
		// filter_white.src = 'img/filter_white.png'
		let img = new Image();
		img.src = 'img/test.png';
		let $def_block = $(img);
		let w_block_count = 33
		let h_block_count = 32
		let center_x = 16;
		let center_y = 16;
		let blocklist = []
		for(let i=0; i<w_block_count; i++){for(let j=0; j<h_block_count; j++){
			blocklist[(i + j*w_block_count)*2] = $def_block.clone(true)
			blocklist[(i + j*w_block_count)*2+1] = $def_block.clone(true)
		}}

		function drawBlocks(x,y,z, isFirst=false){
			let vw = $body.width()
			let vh = $body.height()
			
			// let w_block_count = 33
			let block_size = vw/(w_block_count-1)|0
			// let h_block_count = (vh/block_size|0) + 1
			// let h_block_count = 32
			// let center_x = 16;
			// let center_y = 16;

			let area = chunks.scope(w_block_count, h_block_count, center_x, center_y, x, y)

			let left_margin = (w_block_count * block_size - vw) / 2
			let top_margin = (h_block_count * block_size - vh) / 2
			$main.css({
				'left': -left_margin,
				'top': -top_margin,
				'width': vw + left_margin,
				'height': vh + top_margin
			})
			let tmp_w = block_size * img.width/16
			let tmp_h = block_size * img.height/16


			// let $filter_black = $(filter_black);
			// let $filter_white = $(filter_white);
			// let $def_block = $(img);
			for(let i=0; i<w_block_count; i++){for(let j=0; j<h_block_count; j++){for(let k=0; k<2; k++){
				let this_x = x + i-center_x
				let this_y = y + j-center_y
				// let $block = $def_block.clone(true)
				let $block = blocklist[(i + j*w_block_count)*2+k]
				// let block_id = map[j%16][i%16] /////////////////////////////////////////////////////////////////////////////
				let block_id = area.get(c(i,j))[k]////////////////////////////////////////////////////////////////////////
				let img_y = parseInt( block_id[0] )
				let img_x = parseInt( block_id.slice(1) )

				let inset_top = block_size * img_y
				let inset_right = tmp_w - block_size * (img_x+1)
				let inset_bottom = tmp_h - block_size * (img_y+1)
				let inset_left = block_size * img_x

				let opacity = (z==0 && k==1) ? 0.5 : 1;

				$block.css({
					'background-color': 'transparent',
					'width': `${tmp_w}px`,
					'left': `${i * block_size - block_size * img_x}px`,
					'top': `${j * block_size - block_size * img_y}px`,
					'clipPath': `inset(${inset_top}px ${inset_right}px ${inset_bottom}px ${inset_left}px)`,
					'opacity': `${opacity}`
				})

				if(this_x==0 && this_y==-1){
					$block.css('background-color','black')
				}
				// if(this_x==0 && this_y==-1){
				// 	$block=$('<div>')
				// 	$block.addClass('testblock')
				// 	$block.css({
				// 		'display': 'block',
				// 		'position': 'relative',
				// 		'width': `${block_size/4}px`,
				// 		'height': `${block_size/4}px`,
				// 		'left': `${i * block_size -block_size/4}px`,
				// 		'top': `${j * block_size -block_size/4}px`,
				// 		'background-color': 'transparent',
				// 		'box-shadow': `${block_size/4}px ${block_size/4}px #58be89`
				// 	})
				// }
				// $block.click(function(){
				// 	console.log(this_x)
				// 	console.log(this_y)
				// })

				if(isFirst){
					$main.append($block)
				}


				// if(img_x==0){
				// 	// let $f_black = $filter_black.clone(true)
				// 	// let $f_white = $filter_white.clone(true)
				// 	// let $f_black2 = $filter_black.clone(true)
				// 	// let $f_white2 = $filter_white.clone(true)
				// 	let $f_black = $('<div>')
				// 	let $f_white = $('<div>')
				// 	let $f_black2 = $('<div>')
				// 	let $f_white2 = $('<div>')
				// 	$f_black.css({
				// 		'display': 'block',
				// 		'position': 'relative',
				// 		'background-color': 'black',
				// 		'width': `${block_size}px`,
				// 		'height': `${block_size}px`,
				// 		'left': `${i*block_size}px`,
				// 		'top': `${j*block_size}px`,
				// 		'opacity': '0.2',
				// 		'clipPath': 'polygon(0% 100%, 6.25% 93.75%, 93.75% 93.75%, 100% 100%)'
				// 	})
				// 	$f_white.css({
				// 		'display': 'block',
				// 		'position': 'relative',
				// 		'background-color': 'white',
				// 		'width': `${block_size}px`,
				// 		'height': `${block_size}px`,
				// 		'left': `${i*block_size}px`,
				// 		'top': `${j*block_size}px`,
				// 		'opacity': '0.2',
				// 		'clipPath': 'polygon(0% 0%, 6.25% 6.25%, 93.75% 6.25%, 100% 0%)'
				// 	})
				// 	$f_black2.css({
				// 		'display': 'block',
				// 		'position': 'relative',
				// 		'background-color': 'black',
				// 		'width': `${block_size}px`,
				// 		'height': `${block_size}px`,
				// 		'left': `${i*block_size}px`,
				// 		'top': `${j*block_size}px`,
				// 		'opacity': '0.1',
				// 		'clipPath': 'polygon(100% 0%, 93.75% 6.25%, 93.75% 93.75%, 100% 100%)'
				// 	})
				// 	$f_white2.css({
				// 		'display': 'block',
				// 		'position': 'relative',
				// 		'background-color': 'white',
				// 		'width': `${block_size}px`,
				// 		'height': `${block_size}px`,
				// 		'left': `${i*block_size}px`,
				// 		'top': `${j*block_size}px`,
				// 		'opacity': '0.1',
				// 		'clipPath': 'polygon(0% 0%, 6.25% 6.25%, 6.25% 93.75%, 0% 100%)'
				// 	})
				// 	$main.append($f_black)
				// 	$main.append($f_white)
				// 	$main.append($f_black2)
				// 	$main.append($f_white2)
				// }

			}}}


		}

		let x=0;
		let y=0;
		let z=0;
		img.onload = function(){
			drawBlocks(x,y,z,true)
		}
		this.onResize(function(){
			// $main.html('')
			drawBlocks(x,y,z)
		})
		$(window).keydown(function(e){
			if(e.key=='ArrowLeft'){
				e.preventDefault();
				x=x-1
				drawBlocks(x,y,z)
			}else if(e.key=='ArrowRight'){
				e.preventDefault();
				x=x+1
				drawBlocks(x,y,z)
			}else if(e.key=='ArrowDown'){
				e.preventDefault();
				// y=y+1
				z=1
				drawBlocks(x,y,z)
			}else if(e.key=='ArrowUp'){
				e.preventDefault();
				// y=y-1
				z=0
				drawBlocks(x,y,z)
			}
		})


	}
	static init(){
		
		// 既存のデータ読み込み

		// 既存のデータがない場合、Chunksを生成
		let chunks = new Chunks(new Map())
		chunks.chunkGen(0,0)

		// Chunksを描画・メインの関数
		this.draw(chunks);

	}
}

Main.init();