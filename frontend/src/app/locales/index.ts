import en from "./en";
import vi from "./vi";
import ru from "./ru";

export const dictionaries = { en, vi, ru } as const;
export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];