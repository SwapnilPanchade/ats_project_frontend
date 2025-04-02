import { useEffect, useState } from "react";
import { useWebSocket } from "../../hooks/useWebSocket";

export default function AnalysisModal({ cvId }: { cvId: number }) {
  const [analysis, setAnalysis] = useState<string[]>([]);
  const { connect, disconnect } = useWebSocket();

  useEffect(() => {
    const ws = connect(`ws://localhost:3000/ws/analysis/${cvId}`, {
      onMessage: (data) => {
        if (data.chunk) setAnalysis((prev) => [...prev, data.chunk]);
        if (data.status === "completed") disconnect();
      },
    });

    return () => disconnect();
  }, [cvId]);

  return (
    <div className="analysis-modal">
      {analysis.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
}
