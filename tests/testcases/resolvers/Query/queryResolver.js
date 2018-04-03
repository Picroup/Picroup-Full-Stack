import {createQueryResolver} from "../../../../server/graphql/resolvers/Query";
import User from "../../../../server/usecases/mongoose/User";
import Medium from "../../../../server/usecases/mongoose/Medium";

const queryResolver = createQueryResolver({dependency: {
  User,
  Medium,
}});

export default queryResolver;