function updateProps(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      props = vnode.data.liveProps || {};
  for (key in props) {
    cur = props[key];
    old = elm[key];
    if (old !== cur) elm[key] = cur;
  }
}

module.exports = {create: updateProps, update: updateProps};
