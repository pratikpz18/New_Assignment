const { handler } = require('pactum');

handler.addAssertHandler('number', (ctx) => {
    return typeof ctx.data === 'number';
});

handler.addAssertHandler('string', (ctx) => {
    return typeof ctx.data === 'string';
});

handler.addAssertHandler('boolean', (ctx) => {
    return typeof ctx.data === 'boolean';
});
