import AppleMusic from "@/components/AppleMusic";
import DashboardTable from "@/components/DashboardTable";
import Spotify from "@/components/Spotify";


export default function Home() {
  return (
    <div style={{  alignContent: "center", padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center", fontSize: "30px",  }}>Curbside Dashboard</h1>
      <div style={{ maxWidth: "1000px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
          {/* Table - client component fetching /api/table-data */}
          <DashboardTable />
        </div>
        <div style={{display: "flex", flexDirection: "column", alignContent: "center", padding: "2rem"}}>
          <Spotify/>
          <AppleMusic/>
        </div>
      </div>
    </div>



  );
}
