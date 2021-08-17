let p1 =(params) => {
    return new Promise((resolve,reject)=>{
        console.log('P1开始执行');
        resolve('success');
    })
} 
let p2 =()=>{
    return new Promise((resolve,reject)=>{
        console.log('P2开始执行');
        reject('reject');
    })
} 

let a = async () => {
    console.log('这是asyncA')
    let result = await p1()
    console.log(result)//success
}
let b = async () => {
    console.log('这是asyncB')
    try {
        let result = await p2()
        console.log(result)//success
    } catch (error) {
        console.log('err',error)
    }
}

b()
a();