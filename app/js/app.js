(function () {
    if (!navigator.serviceWorker) return;
    navigator.serviceWorker.register('/sw.js')
        .then(function(){
            console.log('SW registred');
        }).catch(function(){
            console.log('SW failed');           
        });
})();