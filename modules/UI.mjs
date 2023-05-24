import Storage from "./Storage.mjs";

let phonesCart=[];
let buttonsDOM=[]

const alpha=document.querySelector(".alpha")


// m
const cartBtn=document.querySelector(".cart-button");
// m
const exitBtn=document.querySelector(".exit-button");
// m
const cleanBtn=document.querySelector(".clean-button");
const cartDOM=document.querySelector(".cart");
const cartOverlay=document.querySelector(".cart-background");
// m
const phoneCounting=document.querySelector(".phone-counting");
// m
const totalPrice=document.querySelector(".total-price");

const totalPrice2=document.querySelector(".total-price");
// m
const cartPhone=document.querySelector(".cart-item");
// m
const phonesDOM=document.querySelector(".phones-container");


export default class UI{
    displayProducts(phones){
        let result='';
        phones.forEach(phone=>{
            result+=`
            <div class="phone">
                <div class="img-container">
                    <img src=${phone.image} alt="phone" class="phone-img">
                    <button class="buttons" data-id=${phone.id}>
                        <i class="fas fa-shopping-cart">add to cart</i>
                    </button>
                </div>
                <div>
                    <h3>${phone.name}</h3>
                    <h4>$${phone.price}</h4>
                </div>
            </div>
            `
        })
        // am ramas aici
        phonesDOM.innerHTML=result
    }
    
    buttonsCollection(){
        const buttons=[...document.querySelectorAll(".buttons")]
        buttonsDOM= buttons
        buttons.forEach(button=>{
            let id=button.dataset.id           
            let selectedItem = phonesCart.find(phone => phone.id === id)
            if(selectedItem){
                button.disabled = true
                button.innerText = "Selected"
            }
            button.addEventListener('click',  (e)=>{// event=>  e  modificat peste tot
                e.target.innerText="Selected"
                e.target.disabled=true
                let cartItem={...Storage.getPhone(id), amount:1}

                phonesCart=[...phonesCart, cartItem]

                Storage.saveCart(phonesCart)

                this.addPhone(cartItem)

                this.displayValues(phonesCart)

                this.display();
            })
        })
    }
    addPhone(phone){
        const divElement = document.createElement('div')
        divElement.innerHTML = `
            <div class="cart-button">
                <img src=${phone.image} alt="phone">
                <span><i class="fas fa-window-close remove-item" data-id=${phone.id}></i></span>
            </div>
            
            <div class="name-price">
                <h4>${phone.name}</h4>
                <h5>$${phone.price}</h5>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id=${phone.id}></i>
                <p class="item-amount">${phone.amount}</p>
                <i class="fas fa-chevron-down" data-id=${phone.id}></i>
            </div>
        `;
        divElement.classList.add('cart-phone')
        cartPhone.appendChild(divElement)
    }
    displayValues(cart){
        let total = 0;
        let numberOfPhones = 0
        let priceXamaount=0
        
        cart.map(phone =>{
            priceXamaount=phone.price * phone.amount 
            total =priceXamaount + total
            numberOfPhones = phone.amount + numberOfPhones
            console.log(phone.price * phone.amount)
        })
        console.log(total, numberOfPhones, )  
        totalPrice.innerText = parseFloat(total.toFixed(2))
        
        phoneCounting.innerText = numberOfPhones
    }    
    display(){
        cartDOM.classList.add("cart-display")
    }
    configurationAPP(){
        phonesCart = Storage.getCart();
        this.displayValues(phonesCart);
        this.fillCart(phonesCart)
        cartBtn.addEventListener("click", this.display)
        exitBtn.addEventListener("click",this.hide)
    }
    fillCart(cart){
        cart.forEach(item => this.addPhone(item))
    }
    hide(){
        cartDOM.classList.remove("cart-display")
    }
    cartSetup(){
        cleanBtn.addEventListener("click",()=>{
            this.resetCart()
        })
        cartPhone.addEventListener("click",e=>{
            if(e.target.classList.contains("remove-item")){
                let removePhone=e.target;
                let id = removePhone.dataset.id;
                cartPhone.removeChild(removePhone.parentElement.parentElement.parentElement)
                this.removePhone(id);
            }
            else if(e.target.classList.contains("fa-chevron-up")){
                let incrementAmount=e.target
                let id = incrementAmount.dataset.id
                let tempItem=phonesCart.find(phone=>phone.id===id)
                tempItem.amount = tempItem.amount + 1
                Storage.saveCart(phonesCart);
                this.displayValues(phonesCart);
                incrementAmount.nextElementSibling.innerText=tempItem.amount
            }
            else if(e.target.classList.contains("fa-chevron-down")){
                let decrementAmount = e.target;
                let id  = decrementAmount.dataset.id;
                let tempItem=phonesCart.find(phone=>phone.id===id)
                tempItem.amount =tempItem.amount-1;
                
                if(tempItem.amount > 0){
                    Storage.saveCart(phonesCart);
                    this.displayValues(phonesCart);
                    decrementAmount.previousElementSibling.innerText=tempItem.amount;
                }
                else{
                    cartPhone.removeChild(decrementAmount.parentElement.parentElement)
                    this.removePhone(id)
                }
            }
        })
    }
    resetCart(){
        let cartPhones = phonesCart.map(phone=>phone.id)
        cartPhones.forEach(id => this.removePhone(id)) 
        while(cartPhone.children.length>0){
            cartPhone.removeChild(cartPhone.children[0])
        }
        this.hide();
    }
    getBtn(id){
        return buttonsDOM.find(button => button.dataset.id === id)
    }
    removePhone(id){
        phonesCart = phonesCart.filter(phone => phone.id !== id)
        this.displayValues(phonesCart);
        Storage.saveCart(phonesCart)
        let button = this.getBtn(id)
        button.disabled = false;
        button.innerHTML=`<i class="fas fa-shopping-cart"></i>add to cart`
    }
}