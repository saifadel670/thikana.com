function signUPApi(user)
{  
    $.ajax({
        method:"POST",
        url: 'user/account',
        async:false,
        data: user,
        success: successCallback = (response)=>{
            console.log(response)
           
        },
        error: errorCallback = (response) =>{
            console.log("error")
        }

    });

    //location.reload();
}


function getAllUser(){
    let USER = []
    $.ajax({
       type:'GET',
       url:'/user/account',
       async: false,
       success:  getUser  =(response) =>{        
        
                                 USER = JSON.parse(response)
                                                                
                                },
        error:failureCall => {
                console.log('failureCall');
            } 

    })
    return USER;
}

function sendRequest(data){
    $.ajax({
        type:'POST',
        url:'/notification/request/engineer',
        data: data,
        success:  successCallback =>{
           window.location.reload()
                },
         error:failureCall => {
                alert('failure request');
             } 
 
     })
}


$('#signInButtonOn').click(function(){
{
    $.ajax({
        method: "GET",
        url: "user/account/"+$("#inEmail").val(),
        success: responseFunction =(response) => {
            
            change(JSON.parse(response))
        },
        error: response => {
            console.log(response)
        }
    });
    //return logInuser;
}
})

$('#product-add').click(function(){
   var data = {
    
    name:  $('#product-name').val(),
    price: $('#product-price').val(),
    description: $('#product-description').val(),
    quantity:  $('#product-quantity').val(),
    image:  getFilePath($('#product-photo').val()),
    sellerId: getID($('#userID').text())
   }

   $.ajax({
    method:"POST",
    url: '/seller/product/add',
    async:false,
    data: data,
    success: successCallback = (response)=>{
        console.log(response)
        window.location.reload()
       
    },
    error: errorCallback = (response) =>{
        console.log("error")
    }

});
  
   
})

// $('#rejectBtn').click(function(){
//     var URL = '/message/user/request/delete/'+$('#rejectBtn').val()
//     $.ajax({
//         method:'DELETE',
//         url:URL,
//         data: $('#rejectBtn').val(),
//         success:  setproduct =>{
//                 window.location.reload()
//             },
//         error:failureCall => {
//             window.location.reload()
//             }
//     })
// })

function addProject(data){
    $.ajax({
        method:"POST",
        url: '/engineer/project/add',
        async:false,
        data: data,
        success: successCallback = (response)=>{
            console.log(response)
            window.location.reload()
           
        },
        error: errorCallback = (response) =>{
            alert("error to post project")
        }
    
    });
}

function updateUserInfo(data,id){
    $.ajax({
        method:"PUT",
        url: '/update/user/info/'+id,
        async:false,
        data: data,
        success: successCallback = (response)=>{
            console.log(response)
            window.location.reload()
           
        },
        error: errorCallback = (response) =>{
            alert("error")
        }
    
    });

}
function updateProduct(id,data,customerID,customerName)
{

    $.ajax({
        method:"PUT",
        url: '/product/purchase/'+id,
        async:false,
        data: data,
        success: successCallback = (response)=>{
                        var seller = JSON.parse(response)
                        var notifyData = {
                            receiver: seller.sellerId,
                            senderName: customerName,
                            sender: customerID,
                            type: 'sell message',
                            result: 'notify' ,
                            content:customerName+' buy'
                        }
                        console.log(data)
                        sendRequest(notifyData)
            // window.location.reload()
           
        },
        error: errorCallback = (response) =>{
            alert('system error')
        }
    
    });
}

function updateNOtification(data,id){
    $.ajax({
        method:"PUT",
        url: '/accepted/notification/'+id,
        async:false,
        data: data,
        success: successCallback = (response)=>{
            window.location.reload()
        },
        error: errorCallback = (response) =>{
            alert('system error')
        }
    
    });

}

function removeProject(projectID){
    $.ajax({
        method:'DELETE',
        url:'/project/remove/'+projectID,
        data: projectID,
        success:  setproduct =>{
               // window.location.reload()
            },
        error:failureCall => {
            window.location.reload()
            }
    })
}


function getNotification(id){
console.log("id: "+id)
    $.ajax({
        method: "GET",
        url: "/notification/receive/"+id,
        success: responseFunction =(response) => {
            
            showNotification(JSON.parse(response))
        },
        error: response => {
            console.log(response)
        }
    });

}

function removeMSG(msgID){
    $.ajax({
        method:'DELETE',
        url:'/message/user/request/delete/'+msgID,
        data: msgID,
        success:  setproduct =>{
                window.location.reload()
            },
        error:failureCall => {
            window.location.reload()
            }
    })

}