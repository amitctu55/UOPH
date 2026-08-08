import dynamic from "next/dynamic";

const App = dynamic(() => import("../src/App"), { ssr: false });

export default function HospitalDashboardPage() {
  return <App />;
}

export function getServerSideProps() {
  return { props: {} };
}
