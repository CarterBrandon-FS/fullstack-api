import { useEffect, useState } from "react";
import Client from "../api/Client";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // limit=10 makes sure we get all our companies
    Client.get("/companies?limit=10")
      // .then is a promise that will resolve when the request is done
      .then((response) => {
        setCompanies(response.data.data);
        setLoading(false);
      })
      // .catch is a promise that will reject when the request fails and not hang
      .catch((err) => {
        // <-- 2. Catch the error and set the template
        setError("Could not load companies. Is the server running?");
        setLoading(false);
      });
  }, []);

  // the loading comanpies templete
  if (loading) return <p>Loading companies....</p>;

  // the error loading templete
  if (error) return <p style={{ color: "#e31b1bff" }}>{error}</p>;

  // the success loading template
  return (
    <div>
      <h2>Companies</h2>
      {companies.map((company) => (
        <div key={company._id} className="card">
          <h3>{company.name}</h3>
          <p>
            <strong>Industry:</strong> {company.industry}
          </p>
          <p>
            <strong>Location:</strong> {company.location}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CompanyList;
