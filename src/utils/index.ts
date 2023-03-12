export function debounced(fn:any,delay:number){
    let timer:any 
    return (...args:any)=>{
        if(timer){
            clearTimeout(timer)
        }
      timer =  setTimeout(() => {
        fn.apply(this,args)
       }, delay);

    }
}



export function throttle(fn:any,wait:number){
    let timer:any = null;
    return function(...args:any){
        if(!timer){
            timer = setTimeout(function(){
                fn.apply(this,args);
                timer = null;
            },wait)
        }
    }
}
