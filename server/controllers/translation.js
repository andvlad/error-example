const translationService = require('../services/translation');

async function get(request, reply) {
  try {
    const data = await translationService.get(request.params.code);

    return data;
  } catch (err) {
    console.error(`Error while getting user`, err.message);
  }
}

module.exports = {
  get,
};
