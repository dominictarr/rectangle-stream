function createTree (tree) {
  if('string' === typeof tree)
    return document.createTextNode(tree)

  var el = document.createElement(tree[0]), attrs = tree[1]

  for(var k in attrs)
    el.setAttribute(k, attrs[k])

  for(var i = 2; i < tree.length; i++)
    if(tree[i])
      el.appendChild(createTree(tree[i]))

  return el
}

//what about events???

function onMsg (msg, el, notify) {
  el = el || document.body
  if(msg.id)
    el = document.querySelector('#'+msg.id)

  if(msg.append)
    el.appendChild(createTree(msg.append))
  else if(msg.prepend)
    el.insertBefore(createTree(msg.append), el.firstChild)
  else if(msg.update) {
    var new_el = createTree(msg.update)
    el.setAttribute('id', el.id)
    el.parentElement.replaceChild(new_el, el)
  }
  else if(msg.content) {
    el.innerHTML = ''
    el.appendChild(createTree(msg.content))
  }
  else if(msg.listen) {
    var events = Array.isArray(msg.listen)
      ? msg.listen : msg.listen.split(',')
    events.forEach(function (event) {
      el.addEventListener(event, function (ev) {
        var msg = {}
        for(var k in ev)
          if(ev[k] && /^[a-z]/.test(k) && 'object' !== typeof ev[k])
            msg[k] = ev[k]
        notify(msg)
      })
    })
  }
  else
    console.error('no handler for:', msg)
}

if('undefined' !== typeof module)
  module.exports = onMsg
else
  window.onMsg = onMsg
