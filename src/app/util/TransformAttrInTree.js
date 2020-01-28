


const TransformAttrInTree = (name, obj) => {
  let keys = Object.keys(obj);

  let ret = {};
  for (let index = 0; index < keys.length; index++) {
    const _keys = keys[index].split('@');
    let q = ''
    for (let index2 = 0; index2 < _keys.length; index2++) {
      const k = _keys[index2];
      q += `['${k}']`
      eval(`ret${q} = ret${q} ? ret${q} : {}`)
      if(index2 == _keys.length - 1) {
        eval(`ret${q} = obj[keys[index]]`)
      }
    }
  }
  return ret;

}

export default TransformAttrInTree