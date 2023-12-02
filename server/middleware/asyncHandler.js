const ASYNC_HANDLER = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default ASYNC_HANDLER;
