$(document).ready(function(){
    
    $('.btnact').on('click',function(){
  
    let btn=$('.btnact').index(this)
    let docli=$('.docli').eq(btn);
    let nommclii=$('.nommclii').eq(btn);
   let vee=$('.vee').eq(btn);
   let rll=$('.rll').eq(btn);
 


  let d=docli.val();
  let u=nommclii.val();
  let c=vee.val();
  let r=rll.val();
 


$.ajax({
type:"POST",
url:'/actlineas',
data:{
    dd:d,uu:u,cc:c,rr:r
}


});

});
});