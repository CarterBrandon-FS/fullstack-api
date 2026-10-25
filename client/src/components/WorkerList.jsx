import { useEffect, useState } from "react";
import client from "../api/Client";

function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // set limit to 10 to get all our workers
    client
      .get("/workers?limit=10")
      .then((response) => {
        setWorkers(response.data.data);
        setLoading(false);
      })
      // lets catch the errors
      .catch((error) => {
        console.error("Error fetching workers:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading workers....</p>;

  return (
    <div>
      <h2>Workers</h2>
      {workers.map((worker) => (
        <div key={worker._id} className="card">
          <h3>{worker.name}</h3>
          <p>
            <strong>Role:</strong> {worker.role}
          </p>
          <p>
            <strong>Email:</strong> {worker.email}
          </p>
          {worker.company && (
            <p>
              <strong>Company:</strong> {worker.company.name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default WorkerList;
