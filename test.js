async function Te(a,b){
	let x = await new Promise(function(resolve){
		if(true){
			resolve(a+b);
		}
	})
	
	return x;
	
}

Te(3,4).then(function(v){
	console.log(v);
})