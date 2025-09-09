// Formato con fecha y hora (ej: "3 sept 2025, 4:06 p. m.")
export function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const formatPhone = (phone) => {
  if (!phone) return "Sin teléfono";

  // Eliminar espacios, guiones, etc.
  let clean = phone.replace(/\D/g, "");

  // Si no empieza con 57, asumir que es de Colombia
  if (!clean.startsWith("57")) {
    clean = "57" + clean;
  }

  // Dividir: +57 XXX XXX XXXX
  const country = clean.slice(0, 2); // 57
  const operator = clean.slice(2, 5); // 317
  const part1 = clean.slice(5, 8); // 666
  const part2 = clean.slice(8); // 2211

  return `+${country} ${operator} ${part1} ${part2}`;
};
