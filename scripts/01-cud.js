const { MongoClient } = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;

// mongodb : //{서버IP}:{port}/{데이터베이스 이름}


// 클라이언트 생성
const url = "mongodb://192.168.1.139"
const client = new MongoClient(url, { useUnifiedTopology: true});
// 접속 테스트
function testConnect() {
    client.connect((err,client) => {
        // 콜백 함수
        if (err) {
            // 정상 접속
            console.error(err);
        } else {
            console.log(client)
        }
    })
}

// testConnect();

// insert, insertMany
function testInsertDocument(docs) {
    // doc 배열이면 -> insertmany
    // 객체면 -> insert
    if (Array.isArray(docs)) {
        // insertMany
        // db.collection.insert([{문서}, {문서}...])
        // SQL : INSERT INTO table VALUES(....), (...), (...)
        client.connect().then(client => {
            const db = client.db("mydb");
            db.collection("friends").insertMany(docs)
            .then(result => {
                    console.log(result.insertedCount, "개의 문서가 삽입");
            })
        }).catch(err => {
            console.error(err);
        })
    }
}
// testInsertDocument( { name : "전우치", job : "도시"});
testInsertDocument([
    {name: "고길동", gender: "남성", species: "인간", age : 50},
    {name: "둘리", gender: "남성", species: "공룡", age : 10000000},
    {name: "도우너", gender: "남성", species: "외계인", age : 15},
    {name: "또치", gender: "남성", species: "조류", age : 13},
    {name: "마이콜", gender: "남성", species: "인간", age : 13},
    {name: "도우너", gender: "남성", species: "인간", age : 25},
])

function testDeleteAll() {
    // db.collection.delete() : 전체 삭제
    // SQL : DELETE FROM table;
    // promise 방식
    client.connect().then(client => {
        const db = client.db("mydb")
        db.collection('friends').deleteMany({})
            then(result => {
                console.log(result.deltedCourt, "개의 문서가 삭제");
            });
    }).catch(err => {
        console.error(err);
    })
}
// testDeleteAll();