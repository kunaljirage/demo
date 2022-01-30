const express = require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();
app.use(bodyparser.json());



app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/addExpense', function (req, res) {
  
    var sql = "INSERT INTO `expense`(`expense_type`, `item_name`, `price`, `Created`,`year`, `month`) VALUES ('"+req.body.expense.ExpenseType+"','"+req.body.expense.ItemName+"','"+req.body.expense.Price+"','"+ req.body.expense.date +"','"+ req.body.expense.date.slice(0,4) +"','"+ req.body.expense.date.slice(6,7) +"')";
    con.query(sql, function (err, result) {
     if (err){
         
            
            const msg = JSON.stringify({msg:"Fail To Add Expense"})
            res.send(msg);
          }
          else{  
            const msg = JSON.stringify({msg:"Expense Added Successfuly"})
              res.send(msg);
          }  
    });
  })

 app.post('/showExpense',function(req,res){
 //console.log(req.body.type);
 switch(req.body.type){
case 'all':
  var sql ="SELECT * FROM expense"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if(result){
      function myFunction(result) {
        var dd = String(result.Created.getDate()).padStart(2, '0');
          var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
          var yyyy = result.Created.getFullYear();
           var date =  dd +'-'+ mm + '-' + yyyy;
       // console.log({...result, Created:date})
        return {...result, Created:date};
        }
      const newArr =result.map(myFunction)
     
      res.send(newArr);
     }
  });
break;
 case 'getdate':
   
var sql ="SELECT DISTINCT(Created) FROM expense"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
 if(result){

  function myFunction(result) {
    var dd = String(result.Created.getDate()).padStart(2, '0');
      var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
      var yyyy = result.Created.getFullYear();
       var date =  dd +'-'+ mm + '-' + yyyy;
       return date;
    }
  const newArr =result.map(myFunction)
 const dates=JSON.stringify(newArr);
  res.send(dates);
 }
  });
break;
case 'sortByDate':
 // console.log(req.body.date)
 if(req.body.date)
 {
  var dd =req.body.date.slice(0,2);
  var mm = req.body.date.slice(3,5);
  var yyyy =req.body.date.slice(6,10);
   var date = yyyy +'-'+ mm + '-' +dd;
  var sql ="SELECT * FROM `expense` WHERE  DATE(`Created`)='"+date+"'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
 if(result){
  function myFunction(result) {
    var dd = String(result.Created.getDate()).padStart(2, '0');
      var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
      var yyyy = result.Created.getFullYear();
       var date =  dd +'-'+ mm + '-' + yyyy;
   // console.log({...result, Created:date})
    return {...result, Created:date};
    }
  const newArr =result.map(myFunction)
 
  res.send(newArr);
 }
 
 });
}
break;

case 'sortByYear':
  var sql ="SELECT * FROM `expense` WHERE  year='"+req.body.year+"'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
 if(result){
  function myFunction(result) {
    var dd = String(result.Created.getDate()).padStart(2, '0');
      var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
      var yyyy = result.Created.getFullYear();
       var date =  dd +'-'+ mm + '-' + yyyy;
   // console.log({...result, Created:date})
    return {...result, Created:date};
    }
  const newArr =result.map(myFunction)
 
  res.send(newArr);
 }
 });
break;
case 'sortByMonth':
//  console.log(req.body.month)
  var sql ="SELECT * FROM `expense` WHERE  month='"+req.body.month+"'";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
 if(result){
  function myFunction(result) {
    var dd = String(result.Created.getDate()).padStart(2, '0');
      var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
      var yyyy = result.Created.getFullYear();
       var date =  dd +'-'+ mm + '-' + yyyy;
   // console.log({...result, Created:date})
    return {...result, Created:date};
    }
  const newArr =result.map(myFunction)
 
  res.send(newArr);
 }
 });
break;
}


   })




   app.post('/barchart',function(req,res){

    switch (req.body.type) {
      case "all":
      var sql="SELECT `price`, `Created` FROM `expense` ORDER BY Created"
    con.query(sql, function (err, result, fields) {
    if (err) throw err;
 if(result){

  function myFunction(result) {
    var dd = String(result.Created.getDate()).padStart(2, '0');
      var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
      var yyyy = result.Created.getFullYear();
       var date =  dd +'-'+ mm + '-' + yyyy;
var price=result.price
       return {date:date,price:price};
    }
  const newArr =result.map(myFunction)

//console.log(newArr)
  res.send(newArr);
 }
   })
      
   break;
   case "month":
    var sql="SELECT `price`, `Created` FROM `expense` WHERE month='"+req.body.month+"' AND year='"+req.body.year+"' ORDER BY Created"
    con.query(sql, function (err, result, fields) {
    if (err) throw err;
 if(result){
// console.log(result);
  function myFunction(result) {
    var dd = String(result.Created.getDate()).padStart(2, '0');
      var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
      var yyyy = result.Created.getFullYear();
    
      let m=--mm
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
      mm=monthNames[m];
     var date =dd+'-'+mm + '-'+ yyyy;
       
var price=result.price
       return {date:date,price:price};
    }
  const newArr =result.map(myFunction)

//console.log(newArr)
  res.send(newArr);
 }
   })
    break;
    case "year":
      var sql="SELECT `price`, `Created` FROM `expense`ORDER BY Created"
      con.query(sql, function (err, result, fields) {
      if (err) throw err;
   if(result){
 // console.log(result);
    function myFunction(result) {
      var dd = String(result.Created.getDate()).padStart(2, '0');
        var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
        var yyyy = result.Created.getFullYear();
         var date =  yyyy;
  var price=result.price
         return {date:date,price:price};
      }
    const newArr =result.map(myFunction)
  
  //console.log(newArr)
    res.send(newArr);
   }
     })
      break;
      case "categoryMonth":
        var sql="SELECT `price`, `Created` FROM `expense` WHERE month='"+req.body.month+"' AND year='"+req.body.year+"' AND expense_type='"+req.body.category+"' ORDER BY Created "
        con.query(sql, function (err, result, fields) {
        if (err) throw err;
     if(result){
   // console.log(result);
      function myFunction(result) {
        var dd = String(result.Created.getDate()).padStart(2, '0');
          var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
          var yyyy = result.Created.getFullYear();
           var date = dd+'-'+mm + '-'+ yyyy;
    var price=result.price
           return {date:date,price:price};
        }
      const newArr =result.map(myFunction)
    
    //console.log(newArr)
      res.send(newArr);
     }
       })
        break;
        case "categoryYear":
          var sql="SELECT `price`, `Created` FROM `expense` WHERE   expense_type='"+req.body.category+"' ORDER BY Created "
          con.query(sql, function (err, result, fields) {
          if (err) throw err;
       if(result){
     // console.log(result);
        function myFunction(result) {
        var yyyy = result.Created.getFullYear();
          
      var price=result.price
             return {date:yyyy,price:price};
          }
        const newArr =result.map(myFunction)
      
      //console.log(newArr)
        res.send(newArr);
       }
         })
          break;
          case "oneWeek":
            var sql="SELECT * FROM expense WHERE Created >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY AND Created < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY"
            con.query(sql, function (err, result, fields) {
              if (err) throw err;
           if(result){
          
            function myFunction(result) {
              var dd = String(result.Created.getDate()).padStart(2, '0');
                var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
                var yyyy = result.Created.getFullYear();
                 var date =  dd +'-'+ mm + '-' + yyyy;
          var price=result.price
                 return {date:date,price:price};
              }
            const newArr =result.map(myFunction)
          
          //console.log(newArr)
            res.send(newArr);
           }
             })
            break;
            case "oneWeekCategory":
              var sql="SELECT * FROM expense WHERE Created >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY AND Created < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY AND expense_type='"+req.body.category+"' ORDER BY Created"
              con.query(sql, function (err, result, fields) {
                if (err) throw err;
             if(result){
            
              function myFunction(result) {
                var dd = String(result.Created.getDate()).padStart(2, '0');
                  var mm = String(result.Created.getMonth() + 1).padStart(2, '0'); 
                  var yyyy = result.Created.getFullYear();
                   var date =  dd +'-'+ mm + '-' + yyyy;
            var price=result.price
                   return {date:date,price:price};
                }
              const newArr =result.map(myFunction)
            
            //console.log(newArr)
              res.send(newArr);
             }
               })
              break;
   default:
     break;
 }



  })

app.post("/tour",function(req,res){

  switch (req.body.type) {
    case "Add Tour":
      var date = new Date(); 
 date=date.getFullYear() + '-' + (date.getMonth() + 1)+'-' + date.getDate();
      var sql="INSERT INTO `tour_names` (`Created`, `name`) VALUES ('"+date+"','"+req.body.tourName+"')";
       con.query(sql, function (err, result) {
     if (err){
         
            console.log(err)
            const msg = JSON.stringify({msg:"Fail Add "})
            res.send(msg);
          }
          else{  
            const msg = JSON.stringify({msg:"Success"})
              res.send(msg);
          }  
    });
      break;
      case "showTour":
        var sql="SELECT * FROM `tour_names`"
         con.query(sql, function (err, result) {
       if (result){
         res.send(result)
       }
      });
        break;
        case "Add Member":
          var sql="INSERT INTO `tour_member`(`name`, `tour_id`) VALUES ('"+req.body.name+"','"+req.body.tour_id+"')";
           con.query(sql, function (err, result) {
         if (err){
             
              //  console.log(err)
                const msg = JSON.stringify({msg:"Fail To Add "})
                res.send(msg);
              }
              else{  
                const msg = JSON.stringify({msg:"Success"})
                  res.send(msg);
              }  
        });
          break;
          case "showMember":
            var sql="SELECT DISTINCT tour_member.id, tour_member.name,tour_member.price FROM tour_member INNER JOIN tour_names ON tour_member.tour_id = '"+req.body.tour_id+"'"
             con.query(sql, function (err, result) {
           if (result){
             res.send(result)
           }
          });
            break;
            case "addMemberExpense":
              var sql="INSERT INTO `tour_expense`(`tour_id`, `member_id`, `price`,`item_name`) VALUES ('"+req.body.tour_id+"','"+req.body.member_id+"','"+req.body.price+"','"+req.body.item_name+"')"
               con.query(sql, function (err, result) {
                if (err){
             
                  //  console.log(err)
                    const msg = JSON.stringify({msg:"Fail To Add "})
                    res.send(msg);
                  }
                  else{  
                    const msg = JSON.stringify({msg:"Success"})
                    kunal();
                      res.send(msg);
                  }  
            });
            function kunal(){
              var sql="SELECT`price` FROM `tour_member` WHERE id='"+req.body.member_id+"'"
               con.query(sql, function (err, result) {
                if (result){
             
                 var price=result[0].price
          
                price=Number(price)+Number(req.body.price)
                var sql="UPDATE `tour_member` SET `price`='"+price+"' WHERE id='"+req.body.member_id+"'"
                con.query(sql, function (err, result) {})
                  }
                 
            });
            }
              break;
              case "showMemberExpense":
                var sql="SELECT * FROM `tour_expense` WHERE member_id='"+req.body.id+"'";
                  con.query(sql, function (err, result) {
                    if (result){
                      res.send(result)
                    }
              });
                break;
                // case "showMembersExpense":
                //   var result1=[]
                //   var sql="SELECT tour_expense.price, tour_expense.member_id ,tour_member.name FROM tour_member INNER JOIN tour_expense ON tour_member.tour_id = tour_expense.tour_id AND tour_member.id=tour_expense.member_id";
                //     con.query(sql, function (err, result) {
                //       if (result){
                     
                //       }
                // });
            //     console.log(result1)
            //     var sql="SELECT id,name FROM tour_member WHERE tour_id=1";
            //     con.query(sql, function (err, result) {
            //       if (result){
            //      result2=result;
            //       }
            // });
            // console.log(result2)
            //       break;
    default:
      break;
  }
})












app.listen(5000)





//SELECT * FROM tour_member INNER JOIN tour_names ON tour_member.tour_id = tour_names.id