import { useEffect, useState } from "react";

export function useRole() {
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setRole(data.role || ""));
  }, []);

  return role;
}
