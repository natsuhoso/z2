

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

let sumpleChunk = new Map()
for(let i=0; i<32; i++){
	sumpleChunk.set(i, map[i%16].concat(map[i%16]))
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
	scope(w_block_count, h_block_count, block_x, block_y){
		let chunks = this.data;
		let chunk_x = block_x>=0 ? block_x/32|0 : (block_x/32|0) - 1;
		let chunk_y = block_y>=0 ? block_y/32|0 : (block_y/32|0) - 1;
		for(let i=chunk_x-1; i<=chunk_x+1; i++){
		for(let j=chunk_y-1; j<=chunk_y+1; j++){
			this.chunkGen(i,j)
		}}
		let area = new Map();
		let center_x = 16;
		let center_y = 16;
		for(let i=0; i<w_block_count; i++){
			let x = block_x + i-center_x
			let chunk_i = x>=0 ? x/32|0 : (x/32|0)-1
		for(let j=0; j<h_block_count; j++){
			let y = block_y + j-center_y
			let chunk_j = y>=0 ? y/32|0 : (y/32|0)-1

			let chunk = chunks.get(c(chunk_i,chunk_j))
			// console.log(i,j)
			// console.log(chunk_i,chunk_j)
			// console.log(x,mod(y,32))
			// console.log(chunk.get(mod(y,32)))
			let block = chunk.get(mod(y,32))[mod(x,32)]//////////////////////////////////////////
			area.set(c(i,j), block)
		}}
		return area;
	}
	chunkGen(x,y){
		let chunks = this.data;
		if(chunks.has(`${x},${y}`)){
			return 0;
		}
		if(x==0 && y==0){
			chunks.set(`${x},${y}`, sumpleChunk)
		}else{
			chunks.set(`${x},${y}`, sumpleChunk)
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

		let filter_black = new Image();
		let filter_white = new Image();
		filter_black.src = 'img/filter_black.png'
		filter_white.src = 'img/filter_white.png'
		let img = new Image();
		img.src = 'img/test.png';

		function drawBlocks(x,y){
			let vw = $body.width()
			let vh = $body.height()
			
			let w_block_count = 33
			let block_size = vw/(w_block_count-1)|0
			// let h_block_count = (vh/block_size|0) + 1
			let h_block_count = 32

			let area = chunks.scope(w_block_count, h_block_count, x, y)

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


			let $filter_black = $(filter_black);
			let $filter_white = $(filter_white);
			let $def_block = $(img);
			for(let i=0; i<w_block_count; i++){for(let j=0; j<h_block_count; j++){
				let $block = $def_block.clone(true)
				// let block_id = map[j%16][i%16] /////////////////////////////////////////////////////////////////////////////
				let block_id = area.get(c(i,j))////////////////////////////////////////////////////////////////////////
				let img_y = parseInt( block_id[0] )
				let img_x = parseInt( block_id.slice(1) )

				let inset_top = block_size * img_y
				let inset_right = tmp_w - block_size * (img_x+1)
				let inset_bottom = tmp_h - block_size * (img_y+1)
				let inset_left = block_size * img_x

				$block.css({
					'width': `${tmp_w}px`,
					'left': `${i * block_size - block_size * img_x}px`,
					'top': `${j * block_size - block_size * img_y}px`,
					'clipPath': `inset(${inset_top}px ${inset_right}px ${inset_bottom}px ${inset_left}px)`,
					// 'opacity': '0.5'
				})

				// $block.click(function(){
				// 	console.log(i)
				// 	console.log(j)
				// })

				$main.append($block)


				// if(img_x==0){
				// 	let $f_black = $filter_black.clone(true)
				// 	let $f_white = $filter_white.clone(true)
				// 	let $f_black2 = $filter_black.clone(true)
				// 	let $f_white2 = $filter_white.clone(true)
				// 	$f_black.css({
				// 		'width': `${block_size}px`,
				// 		'left': `${i*block_size}px`,
				// 		'top': `${j*block_size}px`,
				// 		'opacity': '0.2',
				// 		'clipPath': 'polygon(0% 100%, 6.25% 93.75%, 93.75% 93.75%, 100% 100%)'
				// 	})
				// 	$f_white.css({
				// 		'width': `${block_size}px`,
				// 		'left': `${i*block_size}px`,
				// 		'top': `${j*block_size}px`,
				// 		'opacity': '0.2',
				// 		'clipPath': 'polygon(0% 0%, 6.25% 6.25%, 93.75% 6.25%, 100% 0%)'
				// 	})
				// 	$f_black2.css({
				// 		'width': `${block_size}px`,
				// 		'left': `${i*block_size}px`,
				// 		'top': `${j*block_size}px`,
				// 		'opacity': '0.1',
				// 		'clipPath': 'polygon(100% 0%, 93.75% 6.25%, 93.75% 93.75%, 100% 100%)'
				// 	})
				// 	$f_white2.css({
				// 		'width': `${block_size}px`,
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

			}}


		}

		let x=0;
		let y=0;
		img.onload = function(){
			drawBlocks(x,y)
		}
		this.onResize(function(){
			$main.html('')
			drawBlocks(x,y)
		})
		$(window).keydown(function(e){
			if(e.key=='ArrowLeft'){
				e.preventDefault();
				$main.html('')
				x=x-1
				drawBlocks(x,y)
			}else if(e.key=='ArrowRight'){
				e.preventDefault();
				$main.html('')
				x=x+1
				drawBlocks(x,y)
			}else if(e.key=='ArrowDown'){
				e.preventDefault();
				$main.html('')
				y=y+1
				drawBlocks(x,y)
			}else if(e.key=='ArrowUp'){
				e.preventDefault();
				$main.html('')
				y=y-1
				drawBlocks(x,y)
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