// unit test for the gettAllWorkers function
// Same structure but fields are role, salary, and company

const { getAllWorkers } = require("../controllers/WorkerController");
const Worker = require("../models/Worker");

// Mock the worker model so as to not touch the DB

jest.mock("../models/Worker");

// same as company express helpers
const mockReq = (query) => ({ query });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("getAllWorkers", () => {
  let mockQuery;

  beforeEach(() => {
    jest.clearAllMocks();

    // mock the full query
    // mock the query object
    // mock the .populate() function

    mockQuery = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      then: (resolve) =>
        resolve([
          { _id: "1", name: "Brandon", role: "Developer", salary: 75000 },
          { _id: "2", name: "Alex", role: "Designer", salary: 68000 },
          { _id: "3", name: "Sam", role: "Manager", salary: 92000 },
          { _id: "4", name: "John", role: "Logistics", salary: 80000 },
        ]),
    };

    Worker.find = jest.fn().mockReturnValue(mockQuery);
  });

  // Test 1 ----- Select query

  test("applies the select query to return limited fields", async () => {
    const req = mockReq({ select: "name, role" });
    const res = mockRes();

    await getAllWorkers(req, res);

    expect(Worker.find).toHaveBeenCalled();
    expect(mockQuery.select).toHaveBeenCalledWith("name role");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // test 2 ---- pagination
  test("applies pagination with cporrect skip and limit", async () => {
    const req = mockReq({ page: "3", limit: "2" });
    const res = mockRes();

    await getAllWorkers(req, res);

    // the skip and limit are applied to the query
    expect(mockQuery.skip).toHaveBeenCalledWith(4);
    expect(mockQuery.limit).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // test 3 ---- sorting descending
  test("applies sort descending by salary", async () => {
    const req = mockReq({ sort: "-salary" });
    const res = mockRes();

    await getAllWorkers(req, res);

    expect(mockQuery.sort).toHaveBeenCalledWith("-salary");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // test 4 ---- sorting ascending
  test("applies sort ascending by salary", async () => {
    const req = mockReq({ sort: "salary" });
    const res = mockRes();

    await getAllWorkers(req, res);

    expect(mockQuery.sort).toHaveBeenCalledWith("salary");
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
