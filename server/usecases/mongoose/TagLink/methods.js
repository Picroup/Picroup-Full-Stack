import schema from './schema';
import TagLink from "./index";

schema.statics.increaseSupplies = async ({tags}) => {
  for (const tag of tags) {
    await TagLink.findOneAndUpdate({tag}, { $inc: { supply: 1 } }, {upsert: true})
  }
};

export default schema;