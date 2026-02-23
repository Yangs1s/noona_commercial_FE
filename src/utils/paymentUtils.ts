export const formatPhone = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 11);

export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const formatCardExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
};

export const formatCvc = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 3);
