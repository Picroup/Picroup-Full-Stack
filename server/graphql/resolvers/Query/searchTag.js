import {cursorQuery} from "../../../libraries/mongoose";
import {PAGE_LIMIT} from "../../../config";

export const createSearchTagResolver = ({dependency: {
  TagLink,
}}) => async (_, {tag, cursor}) => {
  const predicate = tag ? { tag: { $regex: `.*${tag}.*` } } : {};

  const {
    cursor: newCursor,
    items: links
  } = await cursorQuery({
    Model: TagLink,
    predicate,
    sortBy: 'supply',
    ascending: -1
  })({cursor, limit: PAGE_LIMIT});

  return {
    cursor: newCursor,
    items: links.map(link => link.tag)
  };
};