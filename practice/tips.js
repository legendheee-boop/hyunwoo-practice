const http = require('http');
const port = 3001;

// ----------------------
// 📦 간단한 인메모리 데이터 저장소
// ----------------------
let orders = [
    { id: 101, name: '노트북', price: 1200000 },
    { id: 102, name: '마우스', price: 30000 }
];
let nextId = 103;

// ----------------------
// 🖥️ HTTP 서버 로직
// ----------------------
const server = http.createServer((req, res) => {
    // URL 경로와 메서드를 간결하게 추출
    const url = req.url;
    const method = req.method;

    // 응답 헤더 기본 설정 (JSON)
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 모든 라우트는 /orders 로 시작한다고 가정합니다.
    if (url === '/orders') {
        switch (method) {
            case 'GET': // 📚 READ: 모든 주문 조회
                console.log(`[READ] 모든 주문 조회 요청 (${method} ${url})`);
                res.writeHead(200);
                res.end(JSON.stringify(orders));
                break;

            case 'POST': // ➕ CREATE: 새 주문 생성 (간단화를 위해 임의 데이터 생성)
                const newOrder = {
                    id: nextId++,
                    name: `새 상품 ${nextId - 1}`, // 임의의 이름
                    price: Math.floor(Math.random() * 50000) + 10000 // 임의의 가격
                };
                orders.push(newOrder);
                console.log(`[CREATE] 새 주문 생성: ID ${newOrder.id}`);
                console.log('현재 주문:', orders);

                res.writeHead(201); // 201 Created
                res.end(JSON.stringify(newOrder));
                break;

            default:
                // GET, POST 외의 메서드는 허용하지 않음
                res.writeHead(405);
                res.end(JSON.stringify({ message: `Method ${method} Not Allowed for ${url}` }));
                break;
        }
    } 
    // PUT과 DELETE는 ID를 포함하는 경로를 사용한다고 가정합니다.
    else if (url.startsWith('/orders/')) {
        // 경로에서 ID를 추출 (예: /orders/101 -> 101)
        const parts = url.split('/');
        const id = parseInt(parts[2]);
        const orderIndex = orders.findIndex(o => o.id === id);

        if (orderIndex === -1 && (method === 'PUT' || method === 'DELETE')) {
            res.writeHead(404);
            res.end(JSON.stringify({ message: `Order ID ${id} not found.` }));
            return;
        }

        switch (method) {
            case 'PUT': // ✏️ UPDATE: 특정 주문 업데이트 (간단화를 위해 상태만 업데이트)
                orders[orderIndex].name = `업데이트된 상품 (ID: ${id})`;
                console.log(`[UPDATE] 주문 ID ${id} 업데이트됨.`);
                console.log('현재 주문:', orders);
                
                res.writeHead(200);
                res.end(JSON.stringify(orders[orderIndex]));
                break;

            case 'DELETE': // 🗑️ DELETE: 특정 주문 삭제
                const deletedOrder = orders.splice(orderIndex, 1);
                console.log(`[DELETE] 주문 ID ${id} 삭제됨.`);
                console.log('현재 주문:', orders);

                res.writeHead(204); // 204 No Content
                res.end();
                break;

            default:
                res.writeHead(405);
                res.end(JSON.stringify({ message: `Method ${method} Not Allowed for ${url}` }));
                break;
        }
    } else {
        // 404 Not Found
        res.writeHead(404);
        res.end(JSON.stringify({ message: '404 Not Found' }));
    }
});

server.listen(port, () => {
    console.log(`서버 실행 중 → http://localhost:${port}`);
    console.log(`사용 가능한 CRUD 경로:`);
    console.log(`- GET /orders: 전체 조회`);
    console.log(`- POST /orders: 생성`);
    console.log(`- PUT /orders/{id}: 업데이트 (예: /orders/101)`);
    console.log(`- DELETE /orders/{id}: 삭제 (예: /orders/102)`);
});