import { useLocation, useParams } from "react-router-dom";

function PageDetail() {
  const { slug } = useParams();
  const { state } = useLocation();
  const { title, content } = state || {};

  const displayTitle = title || "Default Title";
  const displayContent = content || "<p>This is the default content.</p>";

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-4">{displayTitle}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: displayContent }} />
    </div>
  );
}

export default PageDetail;