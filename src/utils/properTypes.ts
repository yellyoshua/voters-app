
type TypeExpectedType = "string" | "number" | "object" | "array" | "function";

export function resolveValueType<T>(arg: any, expectedType: TypeExpectedType) {
  if (!Boolean(arg)) {
    return null;
  }
  if (Array.isArray(arg) && expectedType === "array") {
    return arg as T[];
  }
  if (typeof arg === expectedType) {
    return arg as T;
  }
  return null;
}