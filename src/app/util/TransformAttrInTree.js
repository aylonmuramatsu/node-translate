


const TransformAttrInTree = (name, obj) => {
  var item = {}
  let keys = Object.keys(obj);
  let teste = [];

  const AddToObject = (name,value) => {
    let [current] = name.split('@');
    let nextLevel = name.replace(`${current}@`,'');
    
    if(nextLevel.includes('@')){
      let childs = AddToObject(nextLevel, value );

      // console.log("A", current, nextLevel);
    }
    else{
      item = {
        // ...{...item[current]},
        [current]: { 
          ...item[current],
          [nextLevel]: value,
        }
      }

    }
  }

  keys.map((key, i)=> {
    AddToObject(key,obj[key], item);

  })

  return item;
}

export default TransformAttrInTree