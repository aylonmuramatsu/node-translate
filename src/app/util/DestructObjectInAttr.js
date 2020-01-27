/* Responsavel por desconstruir o objeto e criar um dicionario com as referencias de onde o atributo veio */
const DestructObjectInAttr = (obj, name)=>{
  let dic = {}
  let keys = Object.keys(obj);
  keys.forEach((key, i) => {
    let _key = (name ? name + "@" :"") + key;
    if(typeof obj[key] == "object"){
      var t = DestructObjectInAttr(obj[key], _key);
      dic =  {...dic, ...t}
    } 
    else dic[_key] = obj[key];
  })
  return dic;
}

export default DestructObjectInAttr

