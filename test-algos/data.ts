
const getArray = (type: 'letter' | 'number' = 'number', total: number = 52): (string | number)[] => {
    const arr = [];

    if(type==='number'){
        for (let i = 0; i < total; i++) {
            arr.push(i+1);
        }
    }
    if(type==='letter'){
        for (let i = 65; i <= 90; i++) {
            arr.push(String.fromCharCode(i));    
        }
    }

    return arr;
}