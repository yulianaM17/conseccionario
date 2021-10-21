const connection = require('../conexion/conexion');
const cnn = connection();//esta variable tiene todos los objetos con la que voy a conectar, interactuar con la base de datos
const { render } = require('ejs');
const bcryptjs=require('bcryptjs')
const session =require('express-session')
const controller = {};
controller.index = (req, res, next) => {//esta funcion conecta directamente con el login
    //txt = "conexion ok"
    //res.render({ txt }) /
    //console.log("conexion ok")
    res.render('login')
    res.send("error en controlador")

}
controller.consulprec=(req,res,next)=>{
    if(req.session.login){
   
   cnn.query('SELECT * FROM precio',(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('precio',{datos:resbd});
       }
   }) 
   
    }
    else{
        res.redirect('/');
    }
}
controller.insertarprec=async(req,res,next)=>{
const d=req.body.codigocredito;

const c=req.body.doccli;
const r=req.body.codlinea;

    
    
cnn.query('INSERT INTO creditos SET?',{codigocredito:c,doccli:c,codlinea:r},(err,resbd)=>{
    
    if(err){
        console.log("error")
         next(new Error(err));
     }
     else{
         //console.log(resbd);

         //res.render('index',{datos:respbd})
         res.redirect('precio');
     }
 
 
});


}
 controller.consultodos=(req,res,next)=>{
    if(req.session.login){
   
   cnn.query('SELECT * FROM vehiculos',(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('todos',{datos:resbd});
       }
   }) 
   
    }
    else{
        res.redirect('/');
    }
}
controller.insertartodos=async(req,res,next)=>{
const d=req.body.nomcli;

const c=req.body.nomlinea;
const r=req.body.estado;
const m=req.body.imagen;
 const n=req.body.codlinea;
    
cnn.query('INSERT INTO vehiculos SET?',{nomcli:d,nomlinea:c,estado:r,imagen:m,codlinea:n},(err,resbd)=>{
    
    if(err){
        console.log("error")
         next(new Error(err));
     }
     else{
         //console.log(resbd);

         //res.render('index',{datos:respbd})
         res.redirect('/');
     }
 
 
});


}
controller.consultagl=(req,res,next)=>{
    if(req.session.login){
   
   cnn.query('SELECT * FROM prectodo',(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('consultaprecios',{datos:resbd});
       }
   }) 
   
    }
    else{
        res.redirect('/');
    }
}
controller.consultageneral=(req,res,next)=>{
    if(req.session.login){
   
   cnn.query('SELECT * FROM creditos',(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('consultar',{datos:resbd});
       }
   }) 
   
    }
    else{
        res.redirect('/');
    }
}
controller.insertar=async(req,res,next)=>{
const d=req.body.codigocredito;

const c=req.body.doccli;
const r=req.body.codlinea;

             
cnn.query('INSERT INTO creditos SET?',{codigocredito:d,doccli:c,codlinea:r},(err,resbd)=>{
    
    if(err){
        console.log("error")
         next(new Error(err));
     }
     else{
         //console.log(resbd);

         //res.render('index',{datos:respbd})
         res.redirect('consultaprecios');
     }
 
 
});


}
controller.login=async(req,res,next)=>{
 const usu=await req.body.usuario;
 const cla=await req.body.login;
 cnn.query('SELECT * FROM usuarios WHERE nomusu=?',[usu],async(err,results)=>{
   /* if(results!=0){
        
    }*/
       
    if(err){
        next(new Error("Error de consulta login",err));
    } 


    if (results!=0){
           console.log("primer if")

        if(await(bcryptjs.compare(cla,results[0].clave))){
            console.log("Datos corectos segundo");
           //res.redirect('consultar');
            rol= results[0].rol;
            uss=results[0].nomusu;  //
            req.session.login=true;
           switch(rol){
               case 'vendedor':
                res.redirect('cliente');
                break;

               case 'Comprador':
                res.redirect('todosuno');
               break;
           }





        }
        else{
            console.log("Datos incorectos segundo  else");
            res.redirect('/');
        }
    }
   else{
    console.log("Datos incorrecto");
   }     
            
  

    //////////////////////////////////

    


    ////////////////////////////////////

//VISTA CLIENTE




 });


}
controller.cliente=(req,res,next)=>{
    console.log("en la vista de ususario");
    res.render('cliente');
}

controller.automoviles=(req,res,next)=>{
    console.log("en la vista de ususario");
    res.render('automoviles');
}
controller.camionetas=(req,res,next)=>{
    console.log("en la vista de ususario");
    res.render('camionetas');
}
controller.campers=(req,res,next)=>{
    console.log("en la vista de ususario");
    res.render('campers');
}
controller.todosuno=(req,res,next)=>{
    console.log("en la vista de ususario");
    res.render('todosuno');
}
controller.registrarve=(req,res,next)=>{
    console.log("en la vista de ususario");
    res.render('registrarve');
}
controller.todos=(req,res,next)=>{
    console.log("en la vista de ususario");
    res.render('todos');
}
controller.precio=(req,res,next)=>{
    console.log("en la vista de ususario");
    res.render('precio');
}
controller.actualizar=async(req,res,next)=>{
const docx=req.body.dd;
const usux=req.body.uu;
const clax=req.body.cc;
const rolx=req.body.rr;
const estx=req.body.ee;
const imgx=req.body.ii;
const password=await bcryptjs.hash(clax,8)

cnn.query('UPDATE usuarios SET nomusu="'+usux+'",clave="'+password+'",rol="'+rolx+'", estado="'+estx+'",imagen="'+imgx+'" WHERE doccli="'+docx+'"', async(err,respbb)=>{
  if(err){
      next(new Error(err));
  }
  else{
      console.log("Actualizado")
      res.redirect('consultar');
  }
})
}

controller.consultalinea=(req,res,next)=>{

    cnn.query('SELECT * FROM lineas',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
           // console.log(resbd)
            res.render('cuentasconsultar',{datos:resbd}); 
           
     }
 
    }) 
    
 }
 controller.consultacuentas=(req,res,next)=>{

    cnn.query('SELECT * FROM camionetas',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
           // console.log(resbd)
            res.render('todoscm',{datos:resbd}); 
           
     }
 
    }) 
    
 }

                  controller.actlineas=async(req,res,next)=>{
                const doclix=req.body.dd;
                const nommcliix=req.body.uu;
                const veex=req.body.cc;
                const rllx=req.body.rr;

                
                cnn.query('UPDATE lineas SET nomlinea="'+nommcliix+'",montomaxicredito="'+veex+'",plazomaxcred="'+rllx+'",codlinea="'+doclix+'"', async(err,respbb)=>{
                  if(err){
                      next(new Error(err));
                  }
                  else{
                      console.log("Actualizado")
                      res.redirect('cuentasconsultar');
                  }
                })
                }
 controller.consultatran=(req,res,next)=>{

    cnn.query('SELECT * FROM transacciones',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
           // console.log(resbd)
            res.render('registrarve',{datos:resbd}); 
           
     }
 
    }) 
    }

controller.insertartran=async(req,res,next)=>{

const u=req.body.doccli;
const r=req.body.saldo;
const c=req.body.tipcred;
const b=req.body.nomlinea;
const a=req.body.estado;
             
cnn.query('INSERT INTO transacciones SET?',{doccli:u,saldo:r,tipcred:c,nomlinea:b,estado:a},(err,resbd)=>{
    
    if(err){
         next(new Error(err));
     }
     else{
         //console.log(resbd);

         //res.render('index',{datos:respbd})
         res.redirect('todos');
     }
 
 
});
 
}


module.exports=controller;