// 상수
const name ='hyunwoodo' // string
const age = 37 // number

// 변수
let condition = 10

// function(${})
function getName(_name){
  return `이름은 ${_name} 입니다.`
}

// object
// camel case
const jackInformation = {
  name :'jack',
  age : 37,
  condtion : 10
}

// array(배열)
const testArray = ['auto', 'care', 'market']

// 어디까지 돌지 결정가능(순수 for문)
for(let i = 0; i < 5; i++){
  // if문 
  if(testArray[i] == 'auto'){
    // console.log(`${i} 번째 인덱스의 값은 ${testArray[i]} 입니다.`)
  }

}

// 다돌아(array가 가진 method, reduce, map)
testArray.forEach((_value, _index)=>{
  if(_value == 'auto'){
    console.log(_index)
  }
})

// class(OOP, 객체지향)
class boonupang{
  taste = 'sweet'
  size = ''
  price = 0

  constructor(_size){
    if(_size == 'big'){
      this.price = 2000
    }
    else if(_size == 'small'){
      this.price = 1000
    }
    else{
      console.log('그런사이즈는 없어요.')
    }
  }

  getPrice =()=>{
    return this.price
  }

  getTaste =() =>{
    return this.taste
  }
}

class sourBoongupang extends boonupang{
  taste = 'sour'
}


const a = new boonupang('small')
console.log(a.getPrice())
console.log(a.getTaste())



const b = new sourBoongupang('small')
console.log(b.getPrice())
console.log(b.getTaste())