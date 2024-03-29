require('./promise');

// return a cancellable promise (the resolve/reject are ignored)
function cancellable(promise){
	var resolve, reject;
	var proxyPromise = new Promise(function(res, rej){
		resolve = res;
		reject = rej;
	});

	promise.then(
		function(value){
			if( !proxyPromise.cancelled ){
				resolve(value);
			}
		},
		function(value){
			if( !proxyPromise.cancelled ){
				reject(value);
			}
		}
	);

	proxyPromise.cancel = function(){
		this.cancelled = true;
	};

	return proxyPromise;
}

module.exports = cancellable;
Promise.cancellable = cancellable;