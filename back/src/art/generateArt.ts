import replaceColor from 'replace-color'

replaceColor({
    image: './couch.jpg',
    colors: {
        type: 'hex',
        targetColor: '#000000',
        replaceColor: '#FFFFFF'
    }
}, (err, jimpObject) => {
    if (err) return console.log(err)
    jimpObject.write('./couch_o.jpg', (err) => {
        if (err) return console.log(err)
    })
})