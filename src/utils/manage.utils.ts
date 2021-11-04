export const getData = (key:string)=>{

    let records:any[] = [];

    const local_records = localStorage.getItem(key);

    if (local_records) {
        records = JSON.parse(local_records);
    }else{
        localStorage.setItem(key,JSON.stringify(records));
    }


    return records;
}

export const setData = (key:string,state:any[])=>{
    if (Array.isArray(state)) {
        localStorage.setItem(key,JSON.stringify(state));
    }else {
        localStorage.setItem(key,JSON.stringify(state));
    }
}