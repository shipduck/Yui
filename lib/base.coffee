base =
  int2krw: (value) ->
    # http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
    text = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    text = text.substr(0, text.length - 3)
    return text

  zeroFill: (number, width) ->
    #http://stackoverflow.com/questions/1267283/how-can-i-create-a-zerofilled-value-using-javascript
    width -= number.toString().length
    if width > 0
      return new Array( width + (if /\./.test( number ) then 2 else 1) ).join( '0' ) + number
    return number.toString()

module.exports = base
