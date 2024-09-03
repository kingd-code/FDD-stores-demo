
// function quantity(value1, value2){

//     let qty = document.getElementById(value2).value;
//     if(value1 == "plus"){
//         qty++;
//     }else{
//         qty--;
//     }
//     if(qty == -1){
//         qty = 0;
//     }
//     document.getElementById(value2).value = qty;
// }



var currentCart = sessionStorage.itemCart;
if(currentCart === undefined){
    var cart = [];
}else{
    var cart = JSON.parse(currentCart);
}
var currentIndex = sessionStorage.itemindex;
if(currentIndex === undefined){
    sessionStorage.itemindex = 0;
}
// alert(cart);
sessionStorage.itemCart = JSON.stringify(cart);
 //initialize cart as an array
function selQuantity(opt, e) {
    let qty = document.getElementById(e).value;
    if (opt == "plus"){
        qty++;
    }else{
        qty--;
    }
    if (qty == -1){
        qty = 0; 
    }
    document.getElementById(e).value = qty;
   
 // alert(qty)
}

function addToCart(chQty, chDisc, chPrice, myCheck) {
    var el = document.getElementById(myCheck);
    var des = document.getElementById(chDisc).value;
    if(el.checked == 1){
      alert(des + " has been added to cart");
    }else{ // User must check before he can add to cart
      alert("You must select item before you can add to cart");

     // edit(chQty, chDisc, chPrice, myCheck);
      return;
    }
  

    let itemindex = sessionStorage.itemindex;
    console.log(itemindex);
    let itemQty = document.getElementById(chQty).value;
    if (itemQty < 1) {
      //prevent invalid quantity value (0)
      alert("Please enter quantity");
      return;
    }
    let itemDisc = document.getElementById(chDisc).value;
    let itemPrice = document.getElementById(chPrice).value;
    //convet variables into object
    const cartitem = {
      description: itemDisc,
      quantity: itemQty,
      unitcost: itemPrice,
      totalcost: itemPrice * itemQty
    };
    //
    //confirm item is not already selected
    for (let i = 0; i < cart.length; i++) {
      var item = cart[i]["description"];
      //alert(item);
      if (itemDisc == item) {
        let resp = confirm(
          "you have selected this item before, do you want to select it again?"
        );

        if (!resp) {
          return;
        }
        alert("your new item will be added again");
        //return;
      }
    }
    //item is another selection, add it to cart
    cart[itemindex] = cartitem;//item added to cart here
    
    itemindex++; //this is the same as itemindex = itemindex + 1
    sessionStorage.itemindex = itemindex; //update session storage

    sessionStorage.itemCart = JSON.stringify(cart);

    // array.forEach(() => {})
    // alert(cart);
    // let msg = "This is your selection" + cartitem.description + " " + cartitem.totalcost;
    // document.write(msg)
  }

  function edit(chQty, chDisc) {
   let item = document.getElementById(chDisc).value;
    for (let a = 0; a < cart.length; a++){
      var cartitem = cart[a];
      var itemDisc = cartitem["description"];
      if(item = itemDisc){
        let answer = confirm("Do you want to remove " + itemDisc + "?");
        if(answer){
          removeItem();
          return;
        }
         answer = confirm("Do you want to change the quantity of the item");
         if(answer){
          editItem();
          return;
         }else{
          return;
         }
      }
     
       return;
var itemQty = cartitem["quantity"];
     // alert( "This is" + " Quantity is " + itemQty);
     let resp = confirm("Do you want to change the quantity of this item " + itemDisc);
   if (resp){
    let newQty = prompt("Current quantity is " + itemQty + " Enter new quantity");
    alert(newQty);
   }
    }
    
  }
  
  function modifyItem(discElement){
    const item = document.getElementById(discElement).value;
    alert (item + " you can only modify the quantity of this item ");
    for (let a = 0; a < cart.length; a++){
      var cartitem = cart[a];
       var itemDisc = cartitem["description"];
         if(item == itemDisc){
        //alert(item + " " + itemDisc + " " + a);
        var itemOldQty = cartitem["quantity"];
        var itemNewQty = prompt("Enter new quantity");
        var itemCost = cartitem["unitcost"];
        var newTotalCost = itemNewQty * itemCost;

        const cartitem = {
          description: itemDisc,
          quantity: itemNewQty,
          unitcost: itemCost,
          totalcost: newTotalCost
        };
        cart[a] = cartitem;
        sessionStorage.itemCart = JSON.stringify(cart);
         }

     // alert(item + " " + itemDisc);
      }
  }

  function modify(chkElement, qtyElement, discElement){
    var itemDisc = document.getElementById(discElement).value;
    // alert(itemDisc);
    var el = document.getElementById(chkElement);
    let item = document.getElementById(discElement).value;
    if(el.checked == 1){
      //alert("checked");
    }else{ // User must check before he can add to cart
      let answer = confirm("Click ok to remove. click cancel to modify");
      if(answer){
        removeItem(discElement);
        return;
      }
       modifyItem(discElement);
      return;
    }
  }

  function removeItem(discElement) {
    const item = document.getElementById(discElement).value;
    alert (item + " will be removed from your order");
    for (let a = 0; a < cart.length; a++){
      var cartitem = cart[a];
       var itemDisc = cartitem["description"];
         if(item == itemDisc){
        alert(item + " " + itemDisc + " " + a);
        const cartitem = {
          description: "",
          quantity: 0,
          unitcost: 0,
          totalcost: 0
        };
        cart[a] = cartitem;
        sessionStorage.itemCart = JSON.stringify(cart);
         }

     // alert(item + " " + itemDisc);
      }
  }

  function editItem() {
    alert("You can only change the quantity of this item")
  }

function checkout() {
    cart.forEach((eachItem) => {
      let description = eachItem["description"];
      let quantity = eachItem["quantity"];
      let unitcost = eachItem["unitcost"];
      let totalcost = eachItem["totalcost"];
      let selItem =
        description +
        " " +
        quantity +
        " " +
        unitcost +
        " " +
        totalcost +
        "<br> ";
      document.write(selItem);

      //alert(selItem);
    });
    location.href = "checkout.html";
  }