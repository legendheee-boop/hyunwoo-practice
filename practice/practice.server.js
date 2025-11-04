const http = require('http');
const { orders } = require('../orders.database.js');

const server = http.createServer((req, res) => {
    // URL 클래스로 우리한테 필요한 오브젝트를 생성 (URL의 모든 정보가 담긴 객체 생성)
    const parsedUrl = new URL(req.url, `http://localhost:3000`)

    // 오브젝트에서 필요한걸 꺼내쓰기. 그리고 변수에 담아놓자. -> 가독성 향상
    const pathName = parsedUrl.pathname
    const params = Object.fromEntries(parsedUrl.searchParams)
    const orderId = params.id
    const product =params.product
    
    // result는 switch 밖에서도 써야 하니까 꺼내두기
    let result;
    
    switch(pathName){
        case '/get-all-orders':
            result = getAllOrders()
            break
        case '/get-order':
            result = getOrder(orderId)
            break
        case '/get-product':
            result = getProduct(product)
            break
    }
res.writeHead(200, { 'Content-Type': 'application/json' })
res.end(JSON.stringify(result))   
});

server.listen(3000, () => {
  console.log('서버 실행 중 → http://localhost:3000');
});

function getAllOrders() {
    const allOrders = orders
    return allOrders
}


function getOrder(_id){ 
    const allOrders = getAllOrders()
    let reuslt;

    for(let i = 0; i < allOrders.length; i++){
        const order = allOrders[i]
        if(order.id == _id){
            reuslt = order
        }
    }

    return reuslt
}

function getProduct(_product){
    const allOrders = getAllOrders()
    let result;

    for(let i = 0; i < allOrders.length; i++){
        const _order = allOrders[i]
        if(_order.product == _product){
            result = _order
        }
    }

    return result
}

