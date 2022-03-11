

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

class Block{
	constructor(id, coordinate){
		this.id = id;
		this.co = coordinate;
	}
}


class Map{
	constructor(mapdata){
		this.data = mapdata;
	}
	scope(){
		return map;
	}
	mapGen(){
		return 0;
	}
}

class Main{
	static onResize(func){
		let resizetimer = null;
		$(window).resize( ()=> { clearTimeout(resizetimer); resizetimer=setTimeout( ()=>{
			func();
		},100)})
	}
	static draw(){


		let $body = $('body')
		let $main = $('#main')
		$main.html('')

		let filter_black = new Image();
		let filter_white = new Image();
		filter_black.src = 'img/filter_black.png'
		filter_white.src = 'img/filter_white.png'
		let img = new Image();
		img.src = 'img/test.png';

		function drawBlocks(){
			let vw = $body.width()
			let vh = $body.height()
			
			let w_block_count = 31
			let block_size = vw/(w_block_count-1)|0
			let v_block_count = (vh/block_size|0) + 1

			let left_margin = (w_block_count * block_size - vw) / 2
			let top_margin = (v_block_count * block_size - vh) / 2
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
			for(let i=0; i<w_block_count; i++){for(let j=0; j<v_block_count; j++){
				let $block = $def_block.clone(true)
				let block_id = map[j%16][i%16] /////////////////////////////////////////////////////////////////////////////
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


				if(img_x==0){
					let $f_black = $filter_black.clone(true)
					let $f_white = $filter_white.clone(true)
					let $f_black2 = $filter_black.clone(true)
					let $f_white2 = $filter_white.clone(true)
					$f_black.css({
						'width': `${block_size}px`,
						'left': `${i*block_size}px`,
						'top': `${j*block_size}px`,
						'opacity': '0.2',
						'clipPath': 'polygon(0% 100%, 6.25% 93.75%, 93.75% 93.75%, 100% 100%)'
					})
					$f_white.css({
						'width': `${block_size}px`,
						'left': `${i*block_size}px`,
						'top': `${j*block_size}px`,
						'opacity': '0.2',
						'clipPath': 'polygon(0% 0%, 6.25% 6.25%, 93.75% 6.25%, 100% 0%)'
					})
					$f_black2.css({
						'width': `${block_size}px`,
						'left': `${i*block_size}px`,
						'top': `${j*block_size}px`,
						'opacity': '0.1',
						'clipPath': 'polygon(100% 0%, 93.75% 6.25%, 93.75% 93.75%, 100% 100%)'
					})
					$f_white2.css({
						'width': `${block_size}px`,
						'left': `${i*block_size}px`,
						'top': `${j*block_size}px`,
						'opacity': '0.1',
						'clipPath': 'polygon(0% 0%, 6.25% 6.25%, 6.25% 93.75%, 0% 100%)'
					})
					$main.append($f_black)
					$main.append($f_white)
					$main.append($f_black2)
					$main.append($f_white2)
				}

			}}


		}

		img.onload = drawBlocks
		this.onResize(function(){
			$main.html('')
			drawBlocks()
		})


	}
	static init(){

		this.draw();

	}
}

Main.init();