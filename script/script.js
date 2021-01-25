function creatAccount() {    
    var name = $("#upName").val()
    var email = $("#upEmail").val()
    var password = $("#upPassword").val()
    var confirmPassword = $("#upConfirmPassword").val()
    if (password === confirmPassword) {
        var user = {
            name: name,
            email: email,
            password: password,
            userType: $("#upUserType").val(),
            phoneNumber:'N/A',
            description:'N/A',
            image: '/client/images/avatar.png',
            address: 'N/A'

        }        
        let allUSER = getAllUser();
        if (allUSER) {
            var flag = false;
            allUSER.forEach(element => {
                if (element.email === user.email) {
                    flag = true
                }

            });
            if (flag == false) {
                signUPApi(user);
            }


        }
        else {
            
            signUPApi(user);
        }
    }
    else{
        alert("sorry try again")
    }
}


function getID(id){
    var i = id.length-24
    var newId= ''
    for(var j=i; j<id.length;j++){
        newId +=id[j]
    }
    return newId

}

function change(response){
    password = $("#inPassword").val()
    userType = $("#inUserType").val()
    if (response.password === password && response.userType === userType){
        window.location.replace("/render/change/"+response._id);;
    }
    else{
        alert("login fail ")
    }
   

}
function getFilePath(filePath){
    var file = filePath.split('\\')
    var  index = file.length-1
    file = '/client/images/'+file[index]
    return file
}

$(".productADD").click(function() {
    console.log("clicked")
    var index = $(this).attr('id'); 
    var productID = document.getElementsByClassName("id")[index].innerHTML;
    var priceData = document.getElementsByClassName("price")[index].innerHTML;
    var productPrice = priceData.split(" ")[0];    
    var productName = document.getElementsByClassName("name")[index].innerHTML;
    var productStock = document.getElementsByClassName("quantity")[index].innerHTML;
    let cartProduct = {
        id:productID,
        name: productName,
        price: productPrice,
        orderQuantity:1,
        availableQuantity: productStock--
    }
    let cart =[]
   
    cart= JSON.parse(window.localStorage.getItem('cart'))
    //console.log(cart.length.toString)
    if(!cart){
        cart = [cartProduct]
    }
    else{
  
      
        var flag = false;
        cart.forEach(element => {
            
            console.log(element.id === cartProduct.id)
            if(element.id === cartProduct.id){
                element.orderQuantity++
                element.availableQuantity--
                flag = true
            }            
        });
        if(!flag){
            cart.push(cartProduct)
        }
        
        console.log(productPrice+" - "+productID +" - "+productName)
    }
    window.localStorage.setItem('cart',JSON.stringify(cart))
});

function buyProduct(){
  
    var y = $(this).attr('id')
    console.log(y)
    
}


$('#profileEdit').click(function(){
    if($('#newPassword').val() === $('#confirmPassword').val()  && $('#gridCheck').is(':checked')){
            var file = getFilePath($('#inputGroupFile01').val())            
            var id = getID($('#userID').text())
           
            data ={
                name:$('#fName').val()+' '+$('#lName').val(),
                password: $('#newPassword').val(),
                phoneNumber: $('#input-Phone-Number').val(),
                image: file,
                address: $('#inputAddress').val()+', '+ $('#inputCity').val()+', '
                        +$('#inputZip').val(),
                description: $('#inputDetails').val()
            }
        
            updateUserInfo(data,id)

    }
    else{
        alert('Your Information Incorrect')
    }


    
    
})


$('#project-add').click(function(){
    

    var data = {
     
     name:  $('#project-name').val(),
     cost: $('#project-cost').val(),
     description: $('#project-description').val(),
     material:  $('#project-material').val(),
     image:  getFilePath($('#project-photo').val()),
     engineerId: getID($('#userID').text()),
     engineerName: $('#user-name').text()
    }
    
    addProject(data)  
    
 })

 $('#allProduct').click(function(){
    document.getElementsByClassName("allProductView")[0].style.display = "block"
    document.getElementsByClassName("landingView")[0].style.display = "none"
    document.getElementsByClassName("allProjectView")[0].style.display = "none"
    document.getElementsByClassName("allEngineerView")[0].style.display = "none"
    document.getElementsByClassName("customerDashboardView")[0].style.display = "none"

 })

 $('#allProject').click(function(){
    document.getElementsByClassName("allProjectView")[0].style.display = "block"
    document.getElementsByClassName("landingView")[0].style.display = "none"
    document.getElementsByClassName("allProductView")[0].style.display = "none"
    document.getElementsByClassName("allEngineerView")[0].style.display = "none"
    document.getElementsByClassName("customerDashboardView")[0].style.display = "none"

})

$('#allEngineer').click(function(){
    document.getElementsByClassName("allEngineerView")[0].style.display = "block"
    document.getElementsByClassName("landingView")[0].style.display = "none"
    document.getElementsByClassName("allProductView")[0].style.display = "none"
    document.getElementsByClassName("allProjectView")[0].style.display = "none"
    document.getElementsByClassName("customerDashboardView")[0].style.display = "none"

})

$('#dashboard').click(function(){
    var id = $('#userID').text()
    if(id != 'nan'){
        document.getElementsByClassName("customerDashboardView")[0].style.display = "block"
    document.getElementsByClassName("landingView")[0].style.display = "none"
    document.getElementsByClassName("allProductView")[0].style.display = "none"
    document.getElementsByClassName("allProjectView")[0].style.display = "none"
    document.getElementsByClassName("allEngineerView")[0].style.display = "none"
    document.getElementsByClassName("contact")[0].style.display = "none"

    //cart table view
    cartTableView()

    }
    else{
        window.location.replace("/signInUp")
    }
    

})

$('.removeProject').click(function(){
    var index = $(this).attr('id'); 
    var projectID = document.getElementsByClassName("projectID")[index].innerHTML;

    removeProject(projectID)

})

$('#acceptBtn').click(function(){
    var ID = $('#rejectBtn').val()
    data = {
        type: 'followed',
        result: 'accepted',
        content: 'Hello...'
    }
    updateNOtification(data,ID)


})

function cartTableView(){
    var cart= JSON.parse(window.localStorage.getItem('cart'))
    $('#cartInfo').empty()
    $('#total').empty()
    if(cart){
    var sum =0
   
    for(var i=0; i<cart.length; i++){
    var tr = $('<tr></tr>')
    var th = $('<th scope="row">'+(i+1)+'</th>')
    let plusButton = $('<a class="btn text-primary  pr-3 pl-3" type="button" onclick="increaseOrderedProductQuantity('+i+')"><i class="fas fa-plus-circle" type="button"></i></a>')
    let minusButton = $('<a  class="btn text-primary pr-3 pl-3" type="button" onclick="decreaseOrderedProductQuantity('+i+')"><i class="fas fa-minus-circle"></i></a>')
    var productName = $('<td>').text(cart[i].name)
    var productQuantity = $('<td>').append(plusButton,cart[i].orderQuantity,minusButton)
    var productUnitPrice = $('<td>').text(cart[i].price)
    var productTotalPrice = $('<td>').text(cart[i].price*cart[i].orderQuantity)
    sum += (cart[i].orderQuantity*cart[i].price)
    $('#cartInfo').append( tr.append(th,productName,productQuantity,productUnitPrice,productTotalPrice))
    }
   
    $('#total').text("Total Payable amount: "+sum+" /- taka")

    }

}

function  increaseOrderedProductQuantity(i){
    var cart= JSON.parse(window.localStorage.getItem('cart'))
    let order = parseInt(cart[i].orderQuantity)
    let stock = parseInt(cart[i].availableQuantity)
    if( 0 < stock){
        order++
        stock--
        cart[i].orderQuantity = order
        cart[i].availableQuantity = stock
        window.localStorage.setItem('cart',JSON.stringify(cart))
        cartTableView()
        }
        else{
           alert("Sorry. stock over")
        }
    
       
}

function decreaseOrderedProductQuantity(i){
    var cart= JSON.parse(window.localStorage.getItem('cart'))
    let a = parseInt(cart[i].orderQuantity)
    let b = parseInt(cart[i].availableQuantity)
    if(  a>0){
        a--
        b++
    cart[i].orderQuantity = a
    cart[i].availableQuantity = b
    window.localStorage.setItem('cart',JSON.stringify(cart))
    }
    else{
      
        cart.splice(i,1)
        window.localStorage.setItem('cart',JSON.stringify(cart))
    }
    cartTableView()

}

$('#payment').click(function(){
    alert('Total amount will be deducted from you account')
    var customerID = getID($('#userID').text())
    var customerName = $('#user-name').text()
    var cart= JSON.parse(window.localStorage.getItem('cart'))
    for(var i=0; i<cart.length; i++){
        var data = {
            quantity:cart.availableQuantity
        }
        var id = cart[i].id
        updateProduct(id,data,customerID,customerName)
    }
    localStorage.removeItem('cart')
    cartTableView()
})



$('#logout').click(function(){
 
    var cart= JSON.parse(window.localStorage.getItem('cart'))
    if(cart){
        var result = confirm("Your added Item will be erase. Please Confirm your purchase")
        if(result){
            localStorage.removeItem('cart')
            window.location.replace('/signInUp')
        }
    }
    else{
        window.location.replace('/signInUp')
    }

})

$('.requestEngineer').click(function(){
    var index = $(this).attr('id'); 
    var msgInfo = document.getElementsByClassName("path")[index].innerHTML.split('/')

    data = {
        receiver:msgInfo[0] ,
        senderName: msgInfo[2],
        sender: msgInfo[1],
        type: 'request',
        result: 'sending' ,
        content:msgInfo[2]+" send you a plan request" 
    }
    sendRequest(data)
})

$('.projectRequest').click(function(){
    var index = $(this).attr('id'); 
    var prjectName = document.getElementsByClassName("prjectName")[index].innerHTML
    var receiver = document.getElementsByClassName("projectEngineerID")[index].innerHTML
    // here i am
    var senderName = document.getElementById("user-name").innerHTML
    var senderID = document.getElementById("userID").innerHTML
    

    data = {
        receiver:receiver ,
        senderName:senderName,
        sender: senderID,
        type: 'request',
        result: 'sending' ,
        content: senderName+" requested you to know about "+prjectName
    }
    sendRequest(data)
})

$('.sendClientMSg').click(function(){
    var index = $(this).attr('id');
    var senderName = document.getElementById("user-name").innerHTML
    var senderID = getID(document.getElementById("userID").innerHTML)
    var receiver = document.getElementsByClassName("receiverClient")[index].innerHTML
    var msg = document.getElementsByClassName("clientMSG")[index].value


    data = {
        receiver: receiver,
        senderName: senderName,
        sender: senderID,
        type: 'message',
        result: 'sending' ,
        content:msg 
    }
    sendRequest(data)

})

$('#rejectBtn').click(function(){
    var msgID = $('#rejectBtn').val()
    removeMSG(msgID)
})


$('.messageRow').click(function(){
    var msgID = $(this).attr('id');
    removeMSG(msgID)
    
})


