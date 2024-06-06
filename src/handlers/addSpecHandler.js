const { handler } = require('pactum');
const { sampleSpec } = require('../constants/constants.js');
require('../handlers/addAHandler.js');

for (handler_name of sampleSpec.BSTACKDEMO_GET_SPEC) {
    handler.addSpecHandler(handler_name, (ctx) => {
        const { spec, data } = ctx;
        spec.get(data)
    });
}

for (handler_name of sampleSpec.BSTACKDEMO_POST_SPEC) {
    handler.addSpecHandler(handler_name, (ctx) => {
        const { spec, data } = ctx;
        spec.post(data)
    });
}

for (handler_name of sampleSpec.DEMOQA_GET_SPEC) {
    handler.addSpecHandler(handler_name, (ctx) => {
        const { spec, data } = ctx;
        spec.get(data)
    });
}
