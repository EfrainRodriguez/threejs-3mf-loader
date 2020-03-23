
const load = (url, loader, callBack) => {
    loader.load(
        url,
        // onLoad callback
        function ( data ) {
            console.log('loaded!');
            callBack(data)
        },
        // onProgress callback
        function ( xhr ) {
            console.log('loading...');
        },
        // onError callback
        function ( err ) {
            console.error('Error');
        }
    );
}

const plot = {
    load
}

export default plot;