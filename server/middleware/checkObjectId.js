import { isValidObjectId } from 'mongoose';

const checkObjectId = (request, response, next) => {
  if (!isValidObjectId(request.params.id)) {
    response.status(404);
    throw new Error(`Invalid ObjectId of:  ${request.params.id}`);
  }
  next();
};

export default checkObjectId;
