import Storage from "./modules/Storage.mjs";
import UI from "./modules/UI.mjs";
import DataHandler from "./modules/DataHandler.mjs";

const logo = document.querySelector(".logo")
const button=document.querySelector(".hero-btn")

function scrollToHeroSection() {
  const hero = document.querySelector(".hero");
  hero.scrollIntoView({ behavior: "smooth" });
}
function scrollToSection() {
    const section = document.querySelector(".section-phones");
    section.scrollIntoView({ behavior: "smooth" });
}

logo.addEventListener("click",scrollToHeroSection)
button.addEventListener("click",scrollToSection)

window.onload = function() {
  const ui = new UI()
  const products = new DataHandler()

  ui.configurationAPP();

  products.fetchData().then(products=>{
    ui.displayProducts(products),
    Storage.savePhones(products)
  }).then(()=>{
    ui.buttonsCollection()
    ui.cartSetup()
});
}

