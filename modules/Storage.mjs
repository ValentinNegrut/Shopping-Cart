// local storage
export default class Storage{

  static savePhones(phones){
    localStorage.setItem("phones", JSON.stringify(phones))
  }
  static getPhone(id){
    let phones=JSON.parse(localStorage.getItem('phones'))
    return phones.find(phone=>phone.id===id)
  }
  static saveCart(cart){
    localStorage.setItem("cart",JSON.stringify(cart))
  }
  static getCart(){
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  }
}