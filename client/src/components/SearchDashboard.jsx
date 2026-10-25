import { useState } from "react";
import client from "../api/Client";

function SearchDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      // We use ?search= now, which hits our new backend logic
      const companyRes = await client.get(`/companies?search=${searchTerm}`);
      const workerRes = await client.get(`/workers?search=${searchTerm}`);

      setCompanies(companyRes.data.data);
      setWorkers(workerRes.data.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.h1}>TwoOfTheSame Portal</h1>
        <p style={styles.headerP}>
          Search for companies by name/industry, or workers by name/role.
        </p>
        <br />
        <p style={styles.headerP}>
          !! Use These!! Lead Designer, Restorer, Front End Developer, HR
          Specialist, QA Tester
        </p>
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Type anything... (e.g. 'Retail', 'Developer', 'Sarah')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      {loading && <p style={{ textAlign: "center" }}>Searching...</p>}

      {/* Results Section */}
      {hasSearched && !loading && (
        <div style={styles.results}>
          {/* Companies Column */}
          <div style={styles.column}>
            <h2 style={styles.h2}>Companies Found</h2>
            {companies.length === 0 ? (
              <p style={styles.noResults}>
                No companies found for "{searchTerm}".
              </p>
            ) : (
              companies.map((company) => (
                <div key={company._id} style={styles.card}>
                  <h3 style={styles.h3}>{company.name}</h3>
                  <p style={styles.p}>
                    <strong>Industry:</strong> {company.industry}
                  </p>
                  <p style={styles.p}>
                    <strong>Location:</strong> {company.location}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Workers Column */}
          <div style={styles.column}>
            <h2 style={styles.h2}>Workers Found</h2>
            {workers.length === 0 ? (
              <p style={styles.noResults}>
                No workers found for "{searchTerm}".
              </p>
            ) : (
              workers.map((worker) => (
                <div key={worker._id} style={styles.card}>
                  <h3 style={styles.h3}>{worker.name}</h3>
                  <p style={styles.p}>
                    <strong>Role:</strong> {worker.role}
                  </p>
                  <p style={styles.p}>
                    <strong>Email:</strong> {worker.email}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- CSS-in-JS Styles ---
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    backgroundColor: "#121212",
    color: "#ffffff",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  h1: {
    margin: "0 0 10px 0",
    fontSize: "2.5rem",
    color: "#ffffff",
  },
  headerP: {
    color: "#b3b3b3",
    margin: 0,
  },
  form: {
    display: "flex",
    gap: "10px",
    maxWidth: "600px",
    margin: "0 auto 40px auto",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    fontSize: "1rem",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  results: {
    display: "flex",
    gap: "30px",
  },
  column: {
    flex: 1,
  },
  h2: {
    borderBottom: "1px solid #333",
    paddingBottom: "10px",
    marginBottom: "20px",
    color: "#ffffff",
  },
  card: {
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "#1e1e1e",
  },
  h3: {
    marginTop: 0,
    color: "#fff",
  },
  p: {
    margin: "6px 0",
    color: "#b3b3b3",
  },
  noResults: {
    color: "#888",
    fontStyle: "italic",
  },
};

export default SearchDashboard;
