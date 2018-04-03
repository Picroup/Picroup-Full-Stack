import '../usecases/dependency/index';
import mongoose, {Schema} from 'mongoose'
import {cursorQuery} from "../../server/libraries/mongoose";
import {expectContains} from "../libaries/jest";
import MongoTestService from "../usecases/mongdbserver/MongoTestService";

let mongoTestService;

let Model = mongoose.model('Model', new Schema({ name: String, createdAt: Number }));

const importData = async () => {
  await Model.insertMany([
    { createdAt: 0 },
    { createdAt: 1 },
    { createdAt: 2 },
  ])
};

beforeAll(async () => {
  mongoTestService = new MongoTestService({onStart: importData});
  await mongoTestService.start();
});

afterAll(async () => {
  await mongoTestService.stop()
});

describe("Cursor Query", () => {

  it('should test cursorQuery basic', async () => {

    const cursorModels = await cursorQuery({
      Model,
      predicate: {},
      sortBy: 'createdAt',
      ascending: 1
    })({cursor: null});

    expect(cursorModels.cursor).toEqual(null);
    expect(cursorModels.items).toEqual(expectContains([
      { createdAt: 0 },
      { createdAt: 1 },
      { createdAt: 2 },
    ]));

  });

  it('should test cursorQuery ascending', async () => {

    const query = cursorQuery({
      Model,
      predicate: {},
      sortBy: 'createdAt',
      ascending: 1,
    });

    const limit = 1;

    const cursorItems0 = await query({cursor: null, limit});
    const cursorItems1 = await query({cursor: 0, limit});
    const cursorItems2 = await query({cursor: 1, limit});

    expect(cursorItems0.cursor).toEqual(0);
    expect(cursorItems0.items).toEqual(expectContains([
      {createdAt: 0}
    ]));

    expect(cursorItems1.cursor).toEqual(1);
    expect(cursorItems1.items).toEqual(expectContains([
      {createdAt: 1}
    ]));

    expect(cursorItems2.cursor).toEqual(null);
    expect(cursorItems2.items).toEqual(expectContains([
      {createdAt: 2}
    ]));
  });

  it('should test cursorQuery descending', async () => {

    const query = cursorQuery({
      Model,
      predicate: {},
      sortBy: 'createdAt',
      ascending: -1,
    });

    const limit = 1;

    const cursorItems0 = await query({cursor: null, limit});
    const cursorItems1 = await query({cursor: 2, limit});
    const cursorItems2 = await query({cursor: 1, limit});

    expect(cursorItems0.cursor).toEqual(2);
    expect(cursorItems0.items).toEqual(expectContains([
      {createdAt: 2}
    ]));

    expect(cursorItems1.cursor).toEqual(1);
    expect(cursorItems1.items).toEqual(expectContains([
      {createdAt: 1}
    ]));

    expect(cursorItems2.cursor).toEqual(null);
    expect(cursorItems2.items).toEqual(expectContains([
      {createdAt: 0}
    ]));
  });

});