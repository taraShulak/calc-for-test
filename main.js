const storage = document.getElementById('storage')
const transfer = document.getElementById('transfer')
const scalewayBox = document.querySelector('.scaleway')
const bunnyBox = document.querySelector('.bunny')

const bunnyInput = document.querySelectorAll('.bunny__input')
const scalewayInput = document.querySelectorAll('.scl__inp')
const tower = document.querySelectorAll('.tower')
const storageValueSpan = document.querySelector('.storage__value')
const transferValueSpan = document.querySelector('.transfer__value')

const vultrTower = document.querySelector('.vultr__tower')
const blackblazeTower = document.querySelector('.backblaze__tower')
const bunnyTower = document.querySelector('.bunny__tower')
const scalewayTower = document.querySelector('.scaleway__tower')
const vultrSpan = document.querySelector('.vultr__price')
const blackblazeSpan = document.querySelector('.blackblaze__price')
const bunnySpan = document.querySelector('.bunny__price')
const scalewaySpan = document.querySelector('.scaleway__price')

let storageValue
let transferValue
let blackblazePrice
let bunnyPrice
let scalewayPrice
let vultrPrice
const k = 6 // koeficient for pixels
const taxArr = [
  {
    title: 'blackblaze',
    min: 7,
    storagePrice: 0.005,
    transferPrice: 0.01, 
    price: 7
  }, 
  {
    title: 'bunny',
    max: 10,
    storagePrice: 0.01,
    transferPrice: 0.01,
    price: 0
  }, 
  {
    title: 'scaleway',
    free: 75,
    storagePrice: 0.03,
    transferPrice: 0.02,
    price: 0
  }, 
  {
    title: 'vultr',
    min: 5,
    storagePrice: 0.01,
    transferPrice: 0.01,
    price: 5
  }
]
  transferValue = Number(transfer.value)   
  transferValueSpan.textContent = transferValue
  storageValue = Number(storage.value)   
  storageValueSpan.textContent = storageValue
  vultr()   
  blackblaze()
  scaleway()
  bunny()
  findMin()

function roundPrice(val) {
  if(val % 1 < 0.01) {
    return Math.round(val)
  }
  return val;
}
function findMin(){
  const price = [blackblazePrice, bunnyPrice, scalewayPrice, vultrPrice]
  let min = price[3]
  let index = 3
  for(let i = 0; i < 3; i++) {
    if (min > price[i]) {
      min = price[i]
      index = i
    }
  }
  let i = 0;
  tower.forEach(item => {
    if( i == index) {
      item.style.backgroundColor = '#900'
    } else {
      item.style.backgroundColor = 'rgb(150, 150, 150)'
    }
    i++;
  })
}
  
function blackblaze() {
  blackblazePrice = (storageValue * taxArr[0].storagePrice + transferValue * taxArr[0].transferPrice).toFixed(2);
  blackblazePrice = roundPrice(+blackblazePrice);
  blackblazePrice = blackblazePrice < taxArr[0].min ? taxArr[0].min : blackblazePrice;
  blackblazeTower.style.width = `${blackblazePrice * k}px`;  
  blackblazeSpan.textContent = `${blackblazePrice} $`  ;
}

function bunny() {
  let storagePriceBunny;

  bunnyInput.forEach(item =>  {
    if(item.checked) {
      storagePriceBunny = Number(item.value) * taxArr[1].storagePrice
    }
  })
  
  bunnyPrice = (storageValue * storagePriceBunny + taxArr[1].transferPrice * transferValue).toFixed(2);
  bunnyPrice = +bunnyPrice > 10 ? 10 : roundPrice(bunnyPrice);
  
  bunnyTower.style.width = `${bunnyPrice * k}px`;  
  bunnySpan.textContent = `${bunnyPrice}$`;
}

function scaleway() {
  let storagePriceScaleway;

  scalewayInput.forEach(item =>  {
    if(item.checked) {
      storagePriceScaleway = Number(item.value) * taxArr[2].storagePrice
    }
  })
  
  let scalewayPriceStorage = storageValue <= 75 ? 0 : storageValue - 75;
  let scalewayPriceTransfer = transferValue <= 75 ? 0 : transferValue - 75;
  
  scalewayPrice = (storagePriceScaleway * scalewayPriceStorage + taxArr[2].transferPrice * scalewayPriceTransfer).toFixed(2);
  scalewayPrice = roundPrice(+scalewayPrice) 
  scalewayTower.style.width = `${scalewayPrice * k}px`;  
  scalewaySpan.textContent = `${scalewayPrice}$`;
}

function vultr() {
  vultrPrice = (storageValue * taxArr[3].storagePrice + transferValue * taxArr[3].transferPrice).toFixed(2);
  vultrPrice = vultrPrice < taxArr[3].min ? taxArr[3].min : roundPrice(vultrPrice);
  vultrTower.style.width = `${vultrPrice * k}px`;  
  vultrSpan.textContent = `${vultrPrice} $`  ;
}

storage.addEventListener('change', () => {
  storageValue = Number(storage.value)   
  storageValueSpan.textContent = storageValue
  vultr()   
  blackblaze()
  scaleway()
  bunny()
  findMin()
})

transfer.addEventListener('input', () => {
  transferValue = Number(transfer.value)   
  transferValueSpan.textContent = transferValue
  vultr()
  blackblaze()
  scaleway()
  bunny()
  findMin()
})

bunnyBox.addEventListener('click', () => {
  bunny()
  findMin()
})

scalewayBox.addEventListener('click', ()=> {
  scaleway()
  findMin()  
})



