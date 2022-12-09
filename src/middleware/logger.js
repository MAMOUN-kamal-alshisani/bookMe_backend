
function logger(req,res,next){
        console.log('method: ' +req.method,'path: ' + req.path, 'date:' + new Date());
        next()
        }
        module.exports = logger