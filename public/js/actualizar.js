$(document).ready(function(){
    alert("Haz cambiado de rol de comprador a vendedor")
    $('.btnact').on('click',function(){
    //alert("click")
    let btn=$('.btnact').index(this)
    let doc=$('.doc').eq(btn);
    let usu=$('.usu').eq(btn);
   let cla=$('.cla').eq(btn);
  let rol=$('.rol').eq(btn);
  let est=$('.est').eq(btn);
  let img=$('.img').eq(btn);


  let d=doc.val();
  let u=usu.val();
  let c=cla.val();
  let r=rol.val();
  let e=est.val();
  let i=img.val();
  

$.ajax({
type:"POST",
url:'/actualizar',
data:{
    dd:d,uu:u,cc:c,rr:r,ee:e,ii:i
}


});

});
});