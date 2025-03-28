import DashboardTable from "@/components/DashboardTable";


export default function Home() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Curbside Dashboard</h1>

      {/* Table - client component fetching /api/table-data */}
      <DashboardTable />

      {/* APPLE MUSIC PLAYLIST */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>Apple Music Playlist</h2>
        <iframe
          allow="autoplay *; encrypted-media *;"
          height="450"
          style={{
            width: "100%",
            maxWidth: "660px",
            overflow: "hidden",
            background: "transparent",
          }}
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts 
          allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src="https://embed.music.apple.com/us/playlist/forrest-frank-essentials/pl.ec51bd4e66d041ec93d4595f97389702"
        ></iframe>
      </section>

      {/* SPOTIFY PLAYLIST */}
      <section>
        <h2>Spotify Playlist</h2>
        <iframe
          src="https://open.spotify.com/embed/playlist/7ETliMZuNyQHr5YbBBYfuX?utm_source=generator"
          width="100%"
          height="380"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      </section>
    </div>


  );
}
