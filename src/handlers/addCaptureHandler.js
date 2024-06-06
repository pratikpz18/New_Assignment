const { handler } = require('pactum');

handler.addCaptureHandler('ISBN', (ctx) => {
    response = ctx.res.json
    let isbnArr = []
    for (book of response.books){
        isbnArr.push(book.isbn);
    }
    return isbnArr;
});

handler.addCaptureHandler('website', (ctx) => {
    response = ctx.res.json
    return response.website;
});
