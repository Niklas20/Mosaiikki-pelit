export type Language = "fi" | "en";

export interface Translations {
    [key: string]: {
        [language in Language]: string;
    };
}