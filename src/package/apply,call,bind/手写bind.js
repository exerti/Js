/**
 * bind                           
 */


Function.prototype.bind = function(context) {
    
    if(typeof this !== 'function'){
        throw new Error('Function.prototype.bind-what is trying to bind a non-function');
    }
    var self = this;
    
    return function(){
        return self.apply(context, arguments);
    }

}