const http = require('http');
const { orders } = require('./orders.database.js');
// this is dev
const server = http.createServer((req, res) => {
    // URL 클래스로 우리한테 필요한 오브젝트를 생성
    const parsedUrl = new URL(req.url, `http://localhost:3000`)

    // 필요한걸 꺼내서쓰면됨. 그리고 변수에 담아놓자. -> 가독성 향상
    const pathName = parsedUrl.pathname
    const params = Object.fromEntries(parsedUrl.searchParams)
    const orderId = params.id
    const product =params.product

    let result;
    ㅁㄴㅇㄹㅁㄴㅇㄹㄴㅁㅇㄹ
    switch(pathName){
        case '/get-all-orders':
            result = getAllOrders()
            break
        case '/get-order':
            result = getOrder(orderId)
            break
        case '/get-product':
            getProduct(product).then((_resolve)=>{
                 res.end(JSON.stringify(_resolve));
            })
            break
    }

   
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

// query
async function getProduct(_product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const allOrders = getAllOrders();
                let result;
                for (let i = 0; i < allOrders.length; i++) {
                    const _order = allOrders[i];
                    if (_order.product === _product) {
                        result = _order;
                        break; // 찾으면 반복 종료
                    }
                }
                resolve(result); // 결과 반환
            } catch (err) {
                reject(err); // 에러 발생 시 reject
            }
        }, 1000);
    });
}

