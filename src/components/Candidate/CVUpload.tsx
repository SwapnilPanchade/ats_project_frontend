// import { useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import axios from "axios";

// export default function CVUpload() {
//   const { user } = useAuth();
//   const [file, setFile] = useState<File | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file || !user) return;

//     const formData = new FormData();
//     formData.append("cv", file);
//     formData.append("orgId", user.org_id?.toString() || "");

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/cv`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       // Handle success
//     } catch (error) {
//       // Handle error
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//       />
//       <button type="submit">Upload CV</button>
//     </form>
//   );
// }
