export default function generateISBN(): string {
  const prefix = Math.random() < 0.8 ? "978" : "979";

  const group = String(Math.floor(Math.random() * 2));

  const body = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const digits = (prefix + group + body).split("").map(Number);
  const sum = digits.reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 1 : 3), 0);
  const checkDigit = (10 - (sum % 10)) % 10;

  return prefix + group + body + checkDigit;
}
