function prior(...items:any[]) {

    let value = items[0];

    items.map(item=>{
        if(item && !value){
            value = item
        }
    })
    
    if (value) {
        return value
    }
}

export default prior;